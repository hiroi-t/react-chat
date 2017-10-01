import React from 'react';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';

const InputChatMessageContainer = ({ onTextChange, inputChatMessage }) => (
    <TextInput
        style={{height: 48, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 8, marginLeft: 8}}
        multiline={true}
        numberOfLines={3}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={onTextChange}
        value={inputChatMessage}
    />
);

const mapStateToProps = state => ({
    inputChatMessage: state.input.inputChatMessage,
});

const mapDispatchToProps = dispatch => ({
    onTextChange: (text) => dispatch({ type: 'INPUT_CHAT_MESSAGE', payload: text}),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputChatMessageContainer);
