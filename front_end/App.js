import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SingleCampsite from './src/screens/campsite/SingleCampsite.js';
import Campsites from './src/screens/homepage/Homepage.js';
import Login from './src/screens/login_signup/Login.js';
import Register from './src/screens/login_signup/Register.js';
// import Calendar from './src/screens/campsite/Calendar.js';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Campsites from './src/screens/homepage/Homepage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='login'
            component={Login}
            options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name='register'
            component={Register}
            options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <ScrollView>
        <View style={styles.container}>
          <Campsites />
          <StatusBar style='auto' />
        </View>
      </ScrollView>
    </>
    // <View style={styles.container}>
    //   <Text>
    //     Randy will build this out for us! 🎉 !!!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
    // <SingleCampsite campsite={campsite}/>
    // <SingleCampsite />
    // <Calendar />
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
