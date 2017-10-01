import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

export default class Main extends Component {
    store = createStore(AppReducer);

    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});