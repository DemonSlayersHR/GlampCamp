import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import SingleCampsite from './src/screens/campsite/SingleCampsite.js';
import Campsites from './src/screens/homepage/Homepage.js';
import Profile from './src/screens/profile/Profile.js';
import Host from './src/screens/profile/Host.js'
// import Calendar from './src/screens/campsite/Calendar.js';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>
    //     Randy will build this out for us! 🎉 !!!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
    // <SingleCampsite campsite={campsite}/>
    // <Campsites />
    // <Profile />
    <Host />
    // <SingleCampsite />
    // <Calendar />
  );
}