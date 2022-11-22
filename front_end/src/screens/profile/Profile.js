import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';

export default function Profile({user_id}) {

  user_id = user_id || 1

  const [starCount, setStarCount] = useState(0)
  const [userData, setUserData] = useState('')

  console.log(userData)
  useEffect(() => {
    axios.get(`http://192.168.86.36:3000/user/?user_id=${user_id}`)
      .then((response) => {setUserData(response.data)})
  }, [user_id])

  return (
    <View style={styles.container}>
      <View>
        <Text>Hi, {userData.user_name || 'Sean'}</Text>
        <Text>joined in {userData.createdAt || 'November 2022'}</Text>
        <Button title='Edit Profile' onPress={()=>{}}/>
      </View>
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
