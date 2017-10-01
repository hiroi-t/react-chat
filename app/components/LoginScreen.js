import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import InputUserContainer from "./InputUserContainer";
import InputPasswordContainer from "./InputPasswordContainer";
import LoginButton from "./LoginButton";
import LoginErrorMessageContainer from "./LoginErrorMessageContainer";

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
    <View style={styles.container}>
        <Text style = {{marginTop: 40, marginBottom: 20, fontSize: 20}}>Let's Chat!!</Text>
        <LoginErrorMessageContainer/>
        <InputUserContainer/>
        <InputPasswordContainer/>
        <LoginButton/>

    </View>
);


export default TestScreen;
