import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import axios from 'axios';

export default function HostCampsite ({campsite}) {

  const [showOptions, setShowOptions] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TouchableOpacity style={styles.list} onClick onPress={() => {setShowOptions(!showOptions)}}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.listItemTextHead}>{campsite.camp_name}</Text>
            <Text>{campsite.description}</Text>
            <Text>{campsite.location}</Text>
            <Text>{campsite.price}</Text>
          </View>
          <View>
            <Image source={{uri: campsite.photos[0].photo_url}} resizeMode={'cover'} style={{width: 100, height: 100}} />
          </View>
        </View>
      </TouchableOpacity>
      {showOptions ?
      <View style={styles.list}>
        <View style={styles.listOption}>
          <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}><Text>Edit</Text></TouchableOpacity>
          <TouchableOpacity><Text>Delete</Text></TouchableOpacity>
        </View>
      </View>
      : null}
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
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
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
  listOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
