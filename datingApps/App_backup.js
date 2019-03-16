import React, { Component } from 'react'

import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import { Root } from 'native-base'
import { Provider } from 'react-redux'

import FirstView from './src/screen/view/FirstView'
import RegisterView from './src/screen/view/RegisterView'
import LoginView from './src/screen/view/LoginView'
import DatingView from './src/screen/view/DatingView'
import AccountView from './src/screen/view/AccountView'
import MessageView from './src/screen/view/MessageView'

const TabScreen = createMaterialTopTabNavigator(
  {
    DatingView: { screen: DatingView },
    AccountView: { screen: AccountView },
    MessageView: { screen: MessageView },
  }
)


const RootStack = createStackNavigator(
  {
    FirstView: { screen: FirstView },
    RegisterView: { screen: RegisterView },
    LoginView: { screen: LoginView },
    TabScreen: { screen: TabScreen },
  },
  {
    initialRouteName: 'DatingView',
    headerMode: 'screen',
  }
)

const AppContainer = createAppContainer(RootStack)

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    )
  }
}
