import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import axios from 'axios';
import EditCampsite from './EditCampsite.js';

export default function HostCampsite ({campsite, getHostCampsites}) {

  const [showOptions, setShowOptions] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editViewVisible, setEditViewVisible] = useState(false)

  function deleteCampsite () {
    axios.delete(`http://192.168.86.36:3000/campsites?camp_id=${campsite.camp_id}`)
      .then(getHostCampsites)
      .catch((err)=>{console.log(err)})
  }

  return (
    <>
      <TouchableOpacity style={styles.list} onClick onPress={() => {setShowOptions(!showOptions); setEditViewVisible(false)}}>
        <View style={styles.listItem}>
          <View>
            {campsite.photos ?
              <Image source={{uri: campsite.photos[0].photo_url}} resizeMode={'cover'} style={styles.photo} />
            : <Image source={{uri: 'https://i.postimg.cc/gjFHrzW3/image-4.png'}} resizeMode={'cover'} style={styles.photo} />}
          </View>
          <View style={styles.campDetails}>
            <Text style={styles.listItemTextHead}>{campsite.camp_name}</Text>
            <Text>{campsite.description}</Text>
            <Text>Location: {campsite.location}</Text>
            <Text>Price: ${campsite.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {showOptions ?
      <View style={styles.list}>
        <View style={styles.listOption}>
          <TouchableOpacity onPress={()=>{setEditViewVisible(!editViewVisible)}}><Text>Edit</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}><Text>Availability</Text></TouchableOpacity>
          <TouchableOpacity onPress={deleteCampsite}><Text>Delete</Text></TouchableOpacity>
        </View>
      </View>
      : null}
      {editViewVisible ? <EditCampsite setEditViewVisible={setEditViewVisible} setShowOptions={setShowOptions} getHostCampsites={getHostCampsites} camp_id={campsite.camp_id} /> : null }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle} >Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'stretch',
    alignItems: 'center',
  },
  listOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  campDetails: {
    paddingLeft: 15
  },
  listItemTextHead: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
