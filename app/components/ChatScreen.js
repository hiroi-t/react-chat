import React from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View, AsyncStorage} from 'react-native';
import MyProfile from "./MyProfile";
import {connect} from 'react-redux';
import ChatMessage from "./ChatMessage";
import ChatMessageModel from "../models/ChatMessageModel";
import InputChatMessageContainer from "./InputChatMessageContainer";
import DateUtils from "../utils/DateUtils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

class ChatScreen extends React.Component {
    componentWillMount(){
        this.props.init();
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    AOSHIMA CHAT
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <MyProfile/>
                    <InputChatMessageContainer/>
                </View>
                <Button
                    title='投稿'
                    style={styles.instructions}
                    onPress={() => this.props.submit(this.props.inputChatMessage, this.props.userName, this.props.image)}
                />
                <FlatList
                    data={this.props.chatMessages}
                    keyExtractor={_keyExtractor}
                    renderItem={({item, index}) =>
                        <ChatMessage
                            image={item.imageUrl}
                            userName={item.userName}
                            time={item.time}
                            message={item.message}
                            canDelete={item.userName === this.props.userName}
                            index={index}
                            deleteFunc={this.props.deleteMessage}
                        />

                    }
                />

            </View>
        );
    }
}

const mapStateToProps = state => ({
    userName: state.user.name,
    image: state.user.imageUrl,
    chatMessages: state.message.chatMessages,
    inputChatMessage: state.input.inputChatMessage,
});

const mapDispatchToProps = dispatch => ({
    deleteMessage: (number) => onDelete(number, dispatch),
    init: () => onInit(dispatch),
    submit: (text, userName, imageUrl) => onSubmit(new ChatMessageModel(userName, imageUrl, DateUtils.getYMDHMS(new Date()), text), dispatch)
});

_keyExtractor = (item, index) => index;

function onDelete(number, dispatch){
    let messagePromise = getMessages();
    messagePromise.then((messages) => {
        console.log("MESSAGES", messages.length);
        console.log("NUMBER", number);
        messages.splice(number, 1);
        console.log("MESSAGES_AFTER", messages.length);
        var setMessages = setValue(messages);
        setMessages.then((value) => {
            dispatch({type: 'MESSAGE_UPDATE', payload: messages});
        }, (error) => {
            console.log("ERROR", error);
        });
    }, (error) => {
        console.log("ERROR", error);
    });
}

function onInit(dispatch){
    var messages = getMessages();
    messages.then((chatMessages) => {
        dispatch({type: 'MESSAGE_UPDATE', payload: chatMessages});
    }, (error) => {
        console.log("ERROR", error);
    });
}

function onSubmit(chatMessage, dispatch) {
    var user = getMessages();
    user.then((chatMessages) => {
        if(chatMessages === null){
            chatMessages = [];
        }
        chatMessages.unshift(chatMessage);
        var setUser = setValue(chatMessages);
        setUser.then((value) => {
            dispatch({type: 'MESSAGE_UPDATE', payload: chatMessages});
        }, (error) => {
            console.log("ERROR", error);
        });
    }, (error) => {
        console.log("ERROR", error);
    });
}

async function setValue(messages) {
    try {
        await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
        console.log("ERROR", error);
    }
}

async function getMessages() {
    var messages = await AsyncStorage.getItem("chatMessages");
    return JSON.parse(messages);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
