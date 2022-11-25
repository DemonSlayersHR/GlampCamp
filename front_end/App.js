
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login_signup/Login.js';
import Register from './src/screens/login_signup/Register.js';
import Host from './src/screens/profile/Host.js'
import Homepage from './src/screens/homepage/Homepage.js';
import Search from './src/screens/search/Search'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='homepage' component={Homepage}></Stack.Screen>
        <Stack.Screen name='search' component={Search}></Stack.Screen>
        <Stack.Screen
          name='host'
          component={Host}></Stack.Screen>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
