import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import HostCampsite from './components/HostCampsite.js';
import AddCampsite from './components/AddCampsite.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Host({user_id}) {


  user_id = user_id || 1

  const [starCount, setStarCount] = useState(0)
  const [hostCampsites, setHostCampsites] = useState([])

  const [displayAddCampsite, setDisplayAddCampsite] = useState(false)
  const [displayHostCampsites, setDisplayHostCampsites] = useState(true)


  useEffect(() => {
    getHostCampsites()
  }, [user_id])

  function getHostCampsites () {
    axios.get(`http://192.168.86.36:3000/campsites/?host_id=${user_id}`)
    .then((response) => {setHostCampsites(response.data)})
    .catch((err) => {console.log(err)})
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.dropDown}>
          <TouchableOpacity style={styles.dropDownText}>
            <Text style={styles.title}>Upcoming Reservations</Text>
            <Icon name='angle-down' size={30}/>
          </TouchableOpacity>
        </View>

        <View style={styles.dropDown}>
          <TouchableOpacity style={styles.dropDownText} onPress={() => {setDisplayAddCampsite(!displayAddCampsite)}}>
            <Text style={styles.title}>Add Campsites</Text>
            {displayAddCampsite ? <Icon name='angle-up' size={30}/> : <Icon name='angle-down' size={30} />}
          </TouchableOpacity>
        </View>

        {displayAddCampsite ? <AddCampsite getHostCampsites={getHostCampsites} setHostCampsites={setHostCampsites}/> : null}

        <View style={styles.dropDown}>
          <TouchableOpacity style={styles.dropDownText} onPress={() => {setDisplayHostCampsites(!displayHostCampsites)}}>
            <Text style={styles.title}>Your Campsites</Text>
            {displayHostCampsites ? <Icon name='angle-up' size={30}/> : <Icon name='angle-down' size={30} />}
          </TouchableOpacity>
        </View>

        {displayHostCampsites ? hostCampsites.map((campsite, index)=>(
          <HostCampsite campsite={campsite} key={index} getHostCampsites={getHostCampsites}/>
        )) : null}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dropDownText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
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
