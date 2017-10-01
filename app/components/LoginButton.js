import React from 'react';
import { connect } from 'react-redux';
import { Button, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

const LoginButton = ({ inputUserName, inputPassword, error, loginSucceed, login, invalidUser }) => (
    <Button
        onPress={() => login(inputUserName, inputPassword)}
        title={message(error, loginSucceed, invalidUser)}
    />
);

const mapStateToProps = state => ({
    inputUserName: state.input.inputUserName,
    inputPassword: state.input.inputPassword,
    error: state.input.error,
    loginSucceed: state.input.loginSucceed,
    invalidUser: state.input.invalidUser,
});

const mapDispatchToProps = dispatch => ({
    login: (inputUserName, inputPassword) => tryLogin(dispatch, inputUserName, inputPassword)
});

function tryLogin(dispatch, inputUserName, inputPassword) {
    if(inputUserName === "" || inputPassword === ""){
        dispatch({type: 'NOT_INPUT'});
    }
    var userPromise = getUsers(inputUserName);
    userPromise.then((users) => {
        var user = users.filter(
            (user) => user.password === inputPassword && user.name === inputUserName);
        console.log("****FOUND_USER****", user);
        if(user.length > 0){
            dispatch({type: 'LOGIN_SUCCEED', payload: user});
        } else {
            dispatch({type: 'INVALID_USER'});
        }
    }, (error) => {
        console.log("ERROR", error);
        dispatch({type: 'INVALID_USER'});
    });
}

function message(error, loginSucceed, invalidUser){
    return "Log In";
}

async function getUsers(){
    var user = await AsyncStorage.getItem("users");
    return JSON.parse(user);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);