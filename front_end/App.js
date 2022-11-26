import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login_signup/Login.js';
import Register from './src/screens/login_signup/Register.js';
import Host from './src/screens/profile/Host.js'
import Homepage from './src/screens/homepage/Homepage.js';
import Search from './src/screens/search/Search'
import Messaging from './src/screens/messaging/Messaging.js';
import SingleCampsite from './src/screens/campsite/SingleCampsite';
import { UserContext } from './src/contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='campsite' component={SingleCampsite} options={{ headerShown: false }}/>
          <Stack.Screen name='homepage' component={Homepage} options={{ headerShown: false }}/>
          <Stack.Screen name='search' component={Search} options={{ headerShown: false }}/>
          <Stack.Screen name='host' component={Host}/>
          <Stack.Screen name='login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='register' component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer >
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

