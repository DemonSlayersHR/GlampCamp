import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login_signup/components/Login.js';
import Register from './src/screens/login_signup/components/Register.js';
import { UserContext } from './src/context/UserContext.js';
import Host from './src/screens/profile/Host.js';
import Homepage from './src/screens/homepage/Homepage.js';
import Reviews from './src/screens/reviews/Reviews.js';
import StarRating from './src/screens/reviews/StarRating.js';
import Search from './src/screens/search/Search';
import Messaging from './src/screens/messaging/Messaging.js';
import SingleCampsite from './src/screens/campsite/SingleCampsite.js';

import { useState } from 'react';
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='homepage'
            component={Homepage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='register'
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='user'
            component={Host}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='search'
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='campsite'
            component={SingleCampsite}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Campsites Visited/Plans to Visit'
            component={Reviews}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='messaging'
            component={Messaging}
            option={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
