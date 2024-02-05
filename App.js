import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/HomeScreen'
import Detail from './screens/DetailScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeStack' component={Home} options={{title: 'Home'}} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={HomeStack} options={{title: 'Pokedex'}}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}