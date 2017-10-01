import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InputUserContainer from "./InputUserContainer";
import InputPasswordContainer from "./InputPasswordContainer";
import LoginButton from "./LoginButton";
import ChatNavigator from "../navigators/ChatNavigator";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const TestScreen = ({ navigation }) => (
    <ChatNavigator />
);


export default TestScreen;
