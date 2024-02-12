import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/HomeScreen'
import Detail from './screens/DetailScreen'
import Search from './screens/SearchScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainHeader() {
  return (
    <Image
      style={{ width: 125, height: 45, left: 100 }}
      source={require('./assets/pokemon_logo_white.png')}
    />
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={options.navigation}>
      <Stack.Screen name='HomeStack' component={Home} options={{title: 'Home'}} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={options.navigation}>
      <Stack.Screen name='SearchStack' component={Search} options={{title: 'Search'}} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#FF4F4F"
          },
          headerStyle: {
            backgroundColor: "#FF4F4F"
          }
        }}
      >
        <Tab.Screen name='Home' component={HomeStack} options={{headerTitle: (props) => <MainHeader {...props} />}}></Tab.Screen>
        <Tab.Screen name='Search' component={SearchStack} options={{headerTitle: (props) => <MainHeader {...props} />}}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const options = {
  navigation: {
    headerStyle: {
      backgroundColor: "#FF4F4F",
    },
    headerTintColor: "#ffffff"
  }
}