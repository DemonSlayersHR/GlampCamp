import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login_signup/components/Login.js';
import Register from './src/screens/login_signup/components/Register.js';
// import Calendar from './src/screens/campsite/Calendar.js';

import Host from './src/screens/profile/Host.js';
import Homepage from './src/screens/homepage/Homepage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='homepage' component={Homepage}></Stack.Screen>
        <Stack.Screen name='register' component={Register}></Stack.Screen>
        <Stack.Screen name='host' component={Host}></Stack.Screen>
        <Stack.Screen name='login' component={Login}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
