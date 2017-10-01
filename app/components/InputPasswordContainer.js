import React from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

const InputPasswordContainer = ({ onTextChange, inputPassword }) => (
    <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, margin: 4}}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder = "パスワード"
        secureTextEntry={true}
        onChangeText={onTextChange}
        value={inputPassword}
    />
);

const mapStateToProps = state => ({
    inputPassword: state.input.inputPassword,
});

const mapDispatchToProps = dispatch => ({
    onTextChange: (text) => dispatch({ type: 'INPUT_PASSWORD', payload: text}),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputPasswordContainer);
