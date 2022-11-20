import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Nav from '../../shared/nav/Nav';

export default function App() {

  return (
    <>
    <View style={styles.container}>
      <Text>hi there</Text>
    </View>
    {/* nav bar */}
    <Nav/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: 100,
    padding: 20
  }
});
