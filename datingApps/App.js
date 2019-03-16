import React, { Component } from 'react'
import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { Root, Icon, View, Text } from 'native-base';
import { Provider, connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import FirstView from './src/screen/view/FirstView'
import RegisterView from './src/screen/view/RegisterView'
import LoginView from './src/screen/view/LoginView'
import ProfileView from './src/screen/view/ProfileView'
import DatingView from './src/screen/view/DatingView'
import AccountView from './src/screen/view/AccountView'
import MessageView from './src/screen/view/MessageView'
import SettingsView from './src/screen/view/SettingsView'
import InfoView from './src/screen/view/InfoView'
import store from './src/publics/redux/store'
import LocationView from './src/screen/view/LocationView'
import SplashScreen from './src/screen/view/SplashScreen'
import PhoneNumberSettings from './src/screen/view/PhoneNumberSettings'
import ProfileMatchView from './src/screen/view/ProfileMatchView'
import LocationSettings from './src/screen/view/LocationSettings'

class IconWithBadge extends Component {
    render() {
        const { name, badgeCount = 0, color, size } = this.props
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={name} size={size} color={color} />
                {badgeCount > 0 && (
                    <View
                        style={{

                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {badgeCount}
                        </Text>
                    </View>
                )
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        images: state.images
    }
}
connect(mapStateToProps)(IconWithBadge)


const HomeIconWithBadge = props => {
    return <IconWithBadge {...props} />
}

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons
    let iconName
    if (routeName === 'Account') {
        iconName = `md-person${focused ? '' : ''}`
    } else if (routeName === 'Dating') {
        iconName = `ios-heart${focused ? '' : ''}`
    } else if (routeName === 'Message') {
        iconName = `ios-chatbubbles${focused ? '' : ''}`
        IconComponent = HomeIconWithBadge
    }
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={26} color={tintColor} />
}

const TabScreen = createMaterialTopTabNavigator(
    {
        Account: {
            screen: AccountView,
        },
        Dating: {
            screen: DatingView,
        },
        Message: {
            screen: MessageView,
        },
    },
    {
        initialRouteName: 'Dating',
        tabBarPosition: 'top',
        swipeEnabled: false,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#E91E63',
            inactiveTintColor: '#e0e0e0',
            showIcon: true,
            showLabel: false,
            style: {
                backgroundColor: '#FFFFFF',
            },
            indicatorStyle: {
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: 2,
            },
        },
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
    }
)



const AppNavigator = createStackNavigator({

    FirstView: { screen: FirstView },
    RegisterView: { screen: RegisterView },
    LoginView: { screen: LoginView },
    ProfileView: { screen: ProfileView },
},
    {
        initialRouteName: 'FirstView',
    }
)

const AppSplash = createStackNavigator({
    SplashScreen: { screen: SplashScreen }
})

const AppTab = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            header: null
        },
    },
    SettingsView: { screen: SettingsView },
    InfoView: { screen: InfoView },
    LocationView: { screen: LocationView },
    PhoneNumberSettingsView: { screen: PhoneNumberSettings },
    ProfileMatchView: { screen: ProfileMatchView },
    LocationSettings: { screen: LocationSettings },
})

const switchNavigator = createSwitchNavigator({
    AppSplash: { screen: SplashScreen },
    AppNavigator: { screen: AppNavigator },
    TabScreen: { screen: AppTab },
})

const AppContainer = createAppContainer(switchNavigator)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer />
                </Root>
            </Provider>
        )
    }
}