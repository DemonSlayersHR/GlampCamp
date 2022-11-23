import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SingleCampsite from './src/screens/campsite/SingleCampsite.js';

import Login from './src/screens/login_signup/Login.js';
import Register from './src/screens/login_signup/Register.js';
// import Calendar from './src/screens/campsite/Calendar.js';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Homepage from './src/screens/homepage/Homepage.js';
import Messaging from './src/screens/messaging/Messaging.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* comment out below */}
      {/* <Stack.Navigator>
        <Stack.Screen name='messaging' component={Messaging} /> */}
      {/* comment out above */}
      <Stack.Screen
        name='login'
        component={Login}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name='register'
        component={Register}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='homepage' component={Homepage}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
