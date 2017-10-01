import React from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

const InputUserContainer = ({ onTextChange, inputUserName }) => (
    <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, margin: 4}}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder = "ユーザー名"
        onChangeText={onTextChange}
        value={inputUserName}
    />
);

const mapStateToProps = state => ({
    inputUserName: state.input.inputUserName,

});

const mapDispatchToProps = dispatch => ({
    onTextChange: (text) => dispatch({ type: 'INPUT_USER_NAME', payload: text}),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputUserContainer);
