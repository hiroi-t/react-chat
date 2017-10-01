import React from 'react';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import ChatScreen from "../components/ChatScreen";
import LoginScreen from "../components/LoginScreen";
import AdminScreen from "../components/AdminScreen";

export const ChatNavigator = TabNavigator(
    {
        Chat: {
            screen: ChatScreen,
        },
        Admin: {
            screen: AdminScreen,
        },
        Logout: {
            screen: LoginScreen,
            navigationOptions: {
                tabBarVisible: false,
            },
        },
    }, {
        tabBarOptions: {
            tabBarPosition: 'top',
            activeTintColor: '#e91e63',
            initialRouteName: 'Admin'
        },
    }
);

// const ChatNavigatorWithState = ({ dispatch, nav }) => (
//     <ChatNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
// );

export default ChatNavigator;

// const mapStateToProps = state => ({
//     nav: state.nav,
// });
//
// export default connect(mapStateToProps)(ChatNavigator);