import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';
import { ChatNavigator } from '../navigators/ChatNavigator';
import ChatMessageModel from "../models/ChatMessageModel";

// Start with two routes: The Main screen, with the Login screen on top.

const newAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
    newAction
);

function nav(state = initialNavState, action) {
  let nextState;
    console.log("***STATE***", state);
    console.log("***ACTION***", action);
  switch (action.type) {
      case 'CHAT':
          nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'Chat' }),
              state
          );
          break;
      case 'LOGIN_SUCCEED' :
          nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({
                      routeName: 'ChatMain',
                  }),
              ],
          }))
          break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initailInput = {
    inputUserName: "",
    inputPassword: "",
    inputChatMessage: "",
    notInput: "true",
    loginSucceed: "false",
    invalidUser: "false"};

function input(state = initailInput, action) {

    switch (action.type) {
        case 'INPUT_USER_NAME':
            return {...state, inputUserName: action.payload};
        case 'INPUT_PASSWORD':
            return {...state, inputPassword: action.payload};
        case 'INPUT_CHAT_MESSAGE':
            return {...state, inputChatMessage: action.payload};
        case 'MESSAGE_UPDATE':
            return {...state, inputChatMessage: ""};
        case 'NOT_INPUT':
            return {...state, notInput: true, invalidUser: false, loginSucceed: false};
        case 'LOGIN_SUCCEED':
            return {...state, notInput: false, invalidUser: false, loginSucceed: true};
        case 'INVALID_USER':
            return {...state, notInput: false, invalidUser: true};
        default:
            return state;
    }
}

const initialUser = {name: "pika", imageUrl: "https://i.ytimg.com/vi/-KbsWrwnQGE/hqdefault.jpg"};

function user(state = initialUser, action){
    switch (action.type) {
        case 'LOGIN_SUCCEED':
            return {...state, name: action.payload[0].name, imageUrl: action.payload[0].imageUrl};
        default:
            return state;
    }
}

const initMessage = new ChatMessageModel(
    "管理人",
    "https://scdn.line-apps.com/stf/linenews-issue-15/item-602784/wide/fd436e12.jpg",
    "00/00/00 00:00:00",
    "こんにちは！何か話しかけてみましょう！");
const initialMessageArray = {chatMessages: [initMessage]};

function message(state = initialMessageArray, action){
    switch (action.type){
        case 'MESSAGE_UPDATE':
            return {...state, chatMessages: action.payload};
        default:
            return state;
    }
}

const initialAdmin = {
    inputUserName: "",
    inputPassword: "",
    inputUrl: "",
    users: [],
    userLengthError: false,
    passwordLengthError: false,
    urlLengthError: false,
};

function admin(state = initialAdmin, action){
    console.log("ADMIN", admin);
    console.log("ACTION_PAYLOAD", action.payload);
    switch (action.type){
        case 'ADMIN_INIT':
            return {...state, users: action.payload};
        case 'ADMIN_CHANGE_USERNAME':
            return {...state, inputUserName: action.payload};
        case 'ADMIN_CHANGE_PASSWORD':
            return {...state, inputPassword: action.payload};
        case 'ADMIN_CHANGE_URL':
            return {...state, inputUrl: action.payload};
        case 'ADMIN_USER_UPDATE':
            return {
                ...state,
                inputUserName: "",
                inputPassword: "",
                inputUrl: "",
                users: action.payload,
                userLengthError: false,
                passwordLengthError: false,
                urlLengthError: false
            };
        case 'ADMIN_USER_FALSE':
            console.log("VALID_USER", action.payload.validUser);
            return {
                ...state,
                userLengthError: !action.payload.validUser,
                passwordLengthError: !action.payload.validPassword,
                urlLengthError: !action.payload.validUrl
            };
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    nav,
    input,
    user,
    message,
    admin,
});

export default AppReducer;
