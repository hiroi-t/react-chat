import React, { Component } from 'react';
import {View, AsyncStorage, Text, Button, TextInput, FlatList, Image, StyleSheet} from 'react-native';
import User from "../models/User";

export default class UserAdminView extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: "",
            inputName: "",
            inputPassword: "",
            inputImageUrl: ""
        }
    }

    componentWillMount(){
        this.getValue();
    }

    async getValue(){
        var wk = [];
        try {
            await AsyncStorage.getAllKeys(
                (err, keys) => {
                    AsyncStorage.multiGet(keys, (err, stores) => {
                        stores.filter((result, i, store) => {
                            return (store[i][0].indexOf("user@") > -1);
                        }).map((result, i, store) => {
                            wk.push(JSON.parse(store[i][1]));
                            this.setState({users: wk});
                        });
                    });
                });
        } catch (error) {
            // Error retrieving data
        }
    }

    async setValue(){
        let user = new User(this.state.inputName, this.state.inputPassword, this.state.inputImageUrl);
        try {
            await AsyncStorage.setItem(`user@${user.name}`, JSON.stringify(user));
            this.clearInput();
        } catch (error) {
            // Error saving data
        }
    }

    async clearInput(){
        this.setState({inputName: ""});
        this.setState({inputPassword: ""});
        this.setState({inputImageUrl: ""});
    }

    async removeAll(){
        try {
            await AsyncStorage.clear();
            this.setState({users: ""});
        } catch (error) {
            // Error saving data
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#e8e8e8'}}>
                <Text style = {{marginTop: 40, marginBottom: 20, fontSize: 20, color:'black'}}>Administration</Text>

                <TextInput
                    style={styles.defaultInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder = "User"
                    onChangeText={(text) => this.setState({inputName: text})}
                    value={this.state.inputName}
                />

                <TextInput
                    style={styles.defaultInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholder = "Password"
                    onChangeText={(text) => this.setState({inputPassword: text})}
                    value={this.state.inputPassword}
                />

                <TextInput
                    style={styles.defaultInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    dataDetectorTypes="link"
                    placeholder = "URL"
                    onChangeText={(text) => this.setState({inputImageUrl: text})}
                    value={this.state.inputImageUrl}
                />

                <Button
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 4}}
                    onPress={
                        () => {
                            this.setValue();
                            this.getValue();
                            this.clearInput();
                        }
                    }
                    title="Register"
                />

                <Text style = {{marginTop: 20, marginBottom: 10, fontSize: 20}}>Users</Text>

                <FlatList
                    data={this.state.users}
                    renderItem={({item}) =>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Image
                                style={{width: 48, height: 48, marginBottom: 2}}
                                source={{uri: item.imageUrl}}/>
                            <Text style={{marginTop: 12, marginLeft: 8, fontSize: 16}}>{item.name}</Text>
                        </View>
                    }
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    defaultInput: {
        backgroundColor: 'white',
        height: 40,
        margin: 8,
    },
    red: {
        color: 'red',
    },
});
