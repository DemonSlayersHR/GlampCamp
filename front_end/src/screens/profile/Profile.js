import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function Profile() {
  const [data, setData] = useState('')


  useEffect(() => {
    axios.get('http://192.168.86.36:3000/campsites')
      .then((data) => {console.log('hello')})
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        {data}
      </Text>
    </View>
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
