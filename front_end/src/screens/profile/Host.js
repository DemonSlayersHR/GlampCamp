import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import HostCampsite from './components/HostCampsite.js'

export default function Host({user_id}) {


  user_id = user_id || 1

  const [starCount, setStarCount] = useState(0)
  const [hostCampsites, setHostCampsites] = useState([])

  useEffect(() => {
    axios.get(`http://192.168.86.36:3000/campsites/?user_id=${user_id}`)
    .then((response) => {setHostCampsites(response.data)})
  }, [user_id])

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>HOST A CAMPSITE</Text>
        {hostCampsites.map((campsite, index)=>(
          <HostCampsite campsite={campsite} key={index}/>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
  }
});
