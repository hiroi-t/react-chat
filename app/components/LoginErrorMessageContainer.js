import React from 'react';
import { connect } from 'react-redux';
import {Text, TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';

const ErrorMessageContainer = ({ invalidUser, notInput }) => (
    <Text>
        {message(invalidUser, notInput)}
    </Text>
);

function message(invalidUser, notInput){
    if(notInput) return "ユーザー、パスワードを入力してください";
    if(invalidUser) return "ユーザーかパスワードがおかしいよ";
    return "ユーザー、パスワードを入力してください";
}
const mapStateToProps = state => ({
    invalidUser: state.input.invalidUser,
    notInput: state.input.notInput,
});

export default connect(mapStateToProps)(ErrorMessageContainer);
