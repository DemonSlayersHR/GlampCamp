import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SingleCampsite from './src/screens/campsite/SingleCampsite.js';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>
    //     Randy will build this out for us! 🎉 !!!
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
    // <SingleCampsite campsite={campsite}/>
    <SingleCampsite />

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
