import React from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View} from 'react-native';
import {NavigationActions} from 'react-navigation';

const AdminErrorMessageContainer = ({userLengthError, passwordLengthError, urlLengthError}) => (
    <View>
        <Text style={{color:"red"}}>
            {userError(userLengthError)}
            {passwordError(passwordLengthError)}
            {urlError(urlLengthError)}
        </Text>
    </View>
)

function userError(hasError) {
    return hasError ? "ユーザーは2文字〜20文字以内にしてください\n" : "";
}

function passwordError(hasError) {
    return hasError ? "パスワードは4文字〜20文字以内にしてください\n" : "";
}

function urlError(hasError) {
    return hasError ? "URLは8文字〜250文字以内にしてください\n" : "";
}

const mapStateToProps = state => ({
    userLengthError: state.admin.userLengthError,
    passwordLengthError: state.admin.passwordLengthError,
    urlLengthError: state.admin.urlLengthError
});

export default connect(mapStateToProps)(AdminErrorMessageContainer);
