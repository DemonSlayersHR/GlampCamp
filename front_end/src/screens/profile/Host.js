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
  const [hostInfo, setHostInfo] = useState({})

  const [displayAddCampsite, setDisplayAddCampsite] = useState(false)
  const [displayHostCampsites, setDisplayHostCampsites] = useState(true)

  useEffect(() => {
    getHostCampsites()
    getHostInfo()
  }, [user_id])

  function getHostCampsites () {
    axios.get(`http://192.168.86.36:3000/campsites/?host_id=${user_id}`)
    .then((response) => {setHostCampsites(response.data)})
    .catch((err) => {console.log(err)})
  }

  function getHostInfo () {
    axios.get(`http://192.168.86.36:3000/user/?user_id=${user_id}`)
    .then((response) => {setHostInfo(response.data)})
    .catch((err) => {console.log(err)})
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userWelcome}>
        <View style={styles.userInfo}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Hi, {hostInfo.first_name}!</Text>
            <Text>{hostInfo.location}</Text>
          </View>
          <View style={styles.profilePictureContainer}>
              {hostInfo.user_photo ?
                <Image source={{uri: hostInfo.user_photo}} resizeMode={'cover'} style={styles.profilePicture} />
              : null}
          </View>
        </View>
      </View>

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
  greeting: {
    paddingTop: 10,
    paddingLeft: 10
  },
  greetingText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userWelcome: {
    // borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 15,
  },
  profilePicture: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  profilePictureContainer: {
    paddingRight: 15
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDown: {
    padding: 15,
    // borderBottomWidth: 1,
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
