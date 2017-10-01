import React from 'react';
import {connect} from 'react-redux';
import {Button, AsyncStorage, View, Text, TextInput, FlatList, Image, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import User from "../models/User";
import DateUtils from "../utils/DateUtils";
import AdminUser from "./AdminUser";
import AdminErrorMessageContainer from "./AdminErrorMessageContainer";

class AdminScreen extends React.Component {
    componentWillMount() {
        this.props.init();
    }

    render() {
        return (

            <View style={styles.container}>
                <AdminErrorMessageContainer/>
                <Text style={{fontSize: 24}}>
                    Register
                </Text>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16
                }}>
                    <TextInput
                        style={{height: 40, width: "80%", borderColor: 'gray', borderWidth: 1, margin: 4}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="ユーザー名"
                        onChangeText={this.props.onChangeUserName}
                        value={this.props.inputUserName}
                    />
                    <TextInput
                        style={{height: 40, width: "80%", borderColor: 'gray', borderWidth: 1, margin: 4}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="パスワード"
                        secureTextEntry={true}
                        onChangeText={this.props.onChangePassword}
                        value={this.props.inputPassword}
                    />
                    <TextInput
                        style={{height: 40, width: "80%", borderColor: 'gray', borderWidth: 1, margin: 4}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="画像URL"
                        onChangeText={this.props.onChangeUrl}
                        value={this.props.inputUrl}
                    />
                    <Button title="Register" onPress={() =>
                        this.props.register(
                            this.props.inputUserName,
                            this.props.inputPassword,
                            this.props.inputUrl)
                    }/>
                </View>

                <Text style={{marginTop: 20, marginBottom: 10, fontSize: 20}}>Users</Text>
                {console.log("USERS_BEFORE_FLATLIST", this.props.users)}
                <FlatList
                    data={this.props.users}
                    keyExtractor={_keyExtractor}
                    renderItem={({item, index}) =>
                        <AdminUser
                            user={item}
                            index={index}
                            deleteFunc={this.props.delete}
                        />
                    }
                />
            </View>
        );
    }
}

_keyExtractor = (item, index) => index;

const mapStateToProps = state => ({
    inputUserName: state.admin.inputUserName,
    inputPassword: state.admin.inputPassword,
    inputUrl: state.admin.inputUrl,
    users: state.admin.users,
});

const mapDispatchToProps = dispatch => ({
    onChangeUserName: (text) => dispatch({type: 'ADMIN_CHANGE_USERNAME', payload: text}),
    onChangePassword: (text) => dispatch({type: 'ADMIN_CHANGE_PASSWORD', payload: text}),
    onChangeUrl: (text) => dispatch({type: 'ADMIN_CHANGE_URL', payload: text}),
    delete: (index) => onDelete(index, dispatch),
    register: (userName, password, url) => onRegister(dispatch, userName, password, url),
    init: () => onInit(dispatch),
});

function onInit(dispatch) {
    let usersPromise = getUsers();
    console.log("USERS:", usersPromise);
    usersPromise.then((users) => {
        console.log("DISPATCH_ADMIN_INIT", users);
        dispatch({type: 'ADMIN_INIT', payload: users});
    }, (error) => {
        console.log("ERROR", error);
    });
}

function onRegister(dispatch, userName, password, url) {
    console.log("REGISTER");
    var usersPromise = getUsers();
    usersPromise.then((users) => {
        if (users === null) {
            users = [];
        }
        var user = new User(userName, password, url, DateUtils.getYMD(new Date()));
        var validUser = sizeCheck(userName, 2, 20);
        var validPassword = sizeCheck(password, 4, 20);
        var validUrl = sizeCheck(url, 8, 250);

        if (validUser && validPassword && validUrl) {
            users.unshift(user);
            var setUserPromise = setValue(users);
            setUserPromise.then((value) => {
                dispatch({type: 'ADMIN_USER_UPDATE', payload: users});
            }, (error) => {
                console.log("ERROR", error);
            });
        } else {
            dispatch({
                type: 'ADMIN_USER_FALSE',
                payload: {
                    validUser: validUser,
                    validPassword: validPassword,
                    validUrl: validUrl,
                }
            });
        }
    }, (error) => {
        console.log("ERROR", error);
    });
}

function sizeCheck(text, min, max){
    if(text.length >= min && max >= text.length){
        return true;
    }
    return false;
}

function onDelete(number, dispatch) {
    let userPromise = getUsers();
    userPromise.then((users) => {
        console.log("ON_DELETE_USERS", users);
        users.splice(number, 1);
        console.log("ON_DELETED_USERS", users);
        var setUserPromise = setValue(users);
        setUserPromise.then((value) => {
            dispatch({type: 'ADMIN_USER_UPDATE', payload: users});
        }, (error) => {
            console.log("ERROR", error);
        });
    }, (error) => {
        console.log("ERROR", error);
    });
}

async function setValue(users) {
    try {
        await AsyncStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
        console.log("ERROR", error);
    }
}

async function getUsers() {
    var users = await AsyncStorage.getItem("users");
    console.log("GET_USERS", users);
    return JSON.parse(users);
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        flexDirection: 'column',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen)