import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Image} from 'react-native';
import axios from 'axios';
import AddPhotosCloudinary from './AddPhotosCloudinary.js'
import {URL} from '../../../../config.js';

export default function AddCampsite ({host_id, getHostCampsites}) {

  host_id = host_id || 1

  const [campsiteName, setCampsiteName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photosArray, setPhotosArray] = useState([])

  function postCampsite () {
    axios.post(`http://${URL}:3000/campsites`, {
      camp_name: campsiteName,
      host_id: host_id,
      price: price,
      location: location,
      description: description
    })
      .then((res) => {
        axios.post(`http://${URL}:3000/campsites/photos` , {
          camp_id: res.data.camp_id,
          photos: photosArray
        })
      })
      .catch((err)=>{console.log(err)})
      .then(() => {
        getHostCampsites()
        setCampsiteName('')
        setLocation('')
        setDescription('')
        setPrice('')
        setPhotosArray([])
      })
      .catch((err) => {console.log(err)});
  }

  return (
    <View>
      <TextInput placeholder='campsite name' value={campsiteName} style={styles.input} onChangeText={text => setCampsiteName(text)} />
      <TextInput placeholder='location' value={location} style={styles.input} onChangeText={text => setLocation(text)} />
      <TextInput placeholder='description' value={description} style={styles.input} onChangeText={text => setDescription(text)} />
      <TextInput placeholder='price' value={price} style={styles.input} onChangeText={text => setPrice(text)} />

      <View style={styles.photoContainer}>
        {photosArray.map((img, index) => (
          <Image key={index} source={{uri: img}} resizeMode={'cover'} style={styles.photo}/>
        ))}
      </View>


      <View style={styles.btns}>
        <AddPhotosCloudinary photosArray={photosArray} setPhotosArray={setPhotosArray} />
        <TouchableOpacity style={styles.btn} onPress={postCampsite}>
          <Text style={styles.btnText}> Add Campsite </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 5,
    paddingLeft: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  btn: {
    padding: 9,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eee',
    // backgroundColor: '#FFADAD'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    // fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  photoContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  photo: {
    marginRight: 15,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});