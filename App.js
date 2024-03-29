import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/HomeScreen'
import Detail from './screens/DetailScreen'
import Search from './screens/SearchScreen'
import Team from './screens/TeamScreen'
import Settings from './screens/SettingsScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainHeader() {
  return (
    <Image
      style={{ width: 125, height: 45 }}
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

function TeamStack() {
  return (
    <Stack.Navigator screenOptions={options.navigation}>
      <Stack.Screen name='TeamStack' component={Team} options={{title: 'Team'}} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={options.navigation}>
      <Stack.Screen name='SettingsStack' component={Settings} options={{title: 'Settings'}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: "#FF4F4F"
          },
          headerStyle: {
            backgroundColor: "#FF4F4F",
          },
          tabBarLabelStyle: 
          {
            color: 'white'
          }
        }}
      >
        <Tab.Screen name='Home' component={HomeStack} options={{headerTitle: (props) => <MainHeader {...props} />, tabBarIcon: () => (<Image style={styles.icon} source={require('./assets/footer/home.png')}></Image>)}}></Tab.Screen>
        <Tab.Screen name='Search' component={SearchStack} options={{headerTitle: (props) => <MainHeader {...props} />, tabBarIcon: () => (<Image style={styles.icon} source={require('./assets/footer/search.png')}></Image>)}}></Tab.Screen>
        <Tab.Screen name='Team' component={TeamStack} options={{headerTitle: (props) => <MainHeader {...props} />, tabBarIcon: () => (<Image style={styles.icon} source={require('./assets/footer/team.png')}></Image>)}}></Tab.Screen>
        <Tab.Screen name='Settings' component={SettingsStack} options={{headerTitle: (props) => <MainHeader {...props} />, tabBarIcon: () => (<Image style={styles.icon} source={require('./assets/footer/settings.png')}></Image>)}}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
})

const options = {
  navigation: {
    headerStyle: {
      backgroundColor: "#FF4F4F",
    },
    headerTintColor: "#ffffff"
  }
}