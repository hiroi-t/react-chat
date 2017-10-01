import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import ChatScreen from "../components/ChatScreen";
import ChatNavigator from "./ChatNavigator";
import TestScreen from "../components/TestScreen";
import AdminScreen from "../components/AdminScreen";

export const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Chat: { screen: ChatScreen},
    Admin: { screen: AdminScreen},
    ChatMain: { screen: ChatNavigator},
    Test: { screen: TestScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
