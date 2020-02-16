import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessageScreen from './screens/MessageScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChatScreen from './screens/ChatScreen'

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDCXV9YHDapzAuTtq-Vefn-fVQLhPL9KoA",
  authDomain: "oneml-6ec7b.firebaseapp.com",
  databaseURL: "https://oneml-6ec7b.firebaseio.com",
  projectId: "oneml-6ec7b",
  storageBucket: "oneml-6ec7b.appspot.com",
  messagingSenderId: "1096860920209",
  appId: "1:1096860920209:web:6d2e4c4845f07fa8c31230"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const ChatStack = createStackNavigator({
  Profile: ProfileScreen,
  Chat: ChatScreen,
})

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={23} color={tintColor} />
          }
        },

        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={23} color={tintColor} />
          }
        },

        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle" size={23} color={tintColor} />
          }
        },

        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={23} color={tintColor} />
          }
        },

        Profile: {
          screen: ChatStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={23} color={tintColor} />
          }
        }
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal")
            } else {
              defaultHandler()
            }
          }
        },

        tabBarOptions: {
          activeTintColor: '#161F3D',
          inactiveTintColor: '#BBBBC4',
          showLabel: false
        },
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

const SwtichNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  App: AppContainer,
  Auth: AuthStack,
},
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(SwtichNavigator);

