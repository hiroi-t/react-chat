/**
 * Created by hiroi on 2017/09/20.
 */
import TestScreen from "../components/TestScreen";
import LoginScreen from "../components/LoginScreen";
import AdminScreen2 from "../components/AdminScreen2";
export const MainStack = enhance(StackNavigator)({
    Home: {
        key: 'home',
        screen: TestScreen,
        navigationOptions: {
            headerTitle: 'Home'
        }
    },
    Detail: {
        screen: LoginScreen,
        navigationOptions: {
            headerTitle: 'Detail'
        }
    },
    MoreDetail: {
        screen: AdminScreen2,
        navigationOptions: {
            headerTitle: 'More Detail'
        }
    }
}, {
    navigationOptions: {
        headerTitleStyle: {
            color: 'white'
        },
        headerStyle: {
            backgroundColor: '#1b59d0',
            paddingTop: 20,
            height: 72,
        },
        headerTintColor: 'white',
        gesturesEnabled: false
    }
})

export const MainTab = TabNavigator({
    MainStack: {
        screen: LoginScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
        }
    },
    PendingAgents: {
        screen: TestScreen,
        navigationOptions: {
            tabBarLabel: 'Pending Agents'
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true
    }
})

export const MainDrawer = DrawerNavigator({
    MainTab: {
        screen: MainTab
    }
}, {
    drawerPosition: 'left',
    contentComponent: SideMenu
})

export const TestNavigator = StackNavigator({
    Login: {
        screen: LoginScreen,
    },
    MainDrawer: {
        screen: MainDrawer,
    }
}, {
    headerMode: 'none'
});

const TestWithNavigationState = ({ dispatch, nav }) => (
    <TestNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

TestWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(TestWithNavigationState);

