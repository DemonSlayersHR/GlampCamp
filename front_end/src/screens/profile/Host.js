import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

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
        {hostCampsites.map((campsite, index)=>{
          return (
            <View key={index}>
              <View>
                <Text>{campsite.camp_name}</Text>
                <Text>{campsite.description}</Text>
                <Text>{campsite.location}</Text>
                <Text>{campsite.price}</Text>
              </View>
              <View>
                <Image source={{uri: campsite.photos[0].photo_url}} resizeMode={'cover'} style={{width: 400, height: 400}} />
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
