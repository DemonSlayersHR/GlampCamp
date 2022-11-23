import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function AddCampsite ({host_id, getHostCampsites}) {

  host_id = host_id || 1

  const [campsiteName, setCampsiteName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photosArray, setPhotosArray] = useState([])

  function postCampsite () {
    axios.post(`http://192.168.86.36:3000/campsites`, {
      camp_name: campsiteName,
      host_id: host_id,
      price: price,
      location: location,
      description: description
    })
      .then((res) => {
        axios.post(`http://192.168.86.36:3000/campsites/photos` , {
          camp_id: res.data.camp_id,
          photos: photosArray || ['https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg']
        })
      })
      .catch((err)=>{console.log(err)})
      .then(getHostCampsites)
      .catch((err) => {console.log(err)});
  }

  return (
    <View>
      <TextInput placeholder='campsite name' style={styles.input} onChangeText={text => setCampsiteName(text)} />
      <TextInput placeholder='location' style={styles.input} onChangeText={text => setLocation(text)} />
      <TextInput placeholder='description' style={styles.input} onChangeText={text => setDescription(text)} />
      <TextInput placeholder='price' style={styles.input} onChangeText={text => setPrice(text)} />

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}> Upload Photo </Text>
        </TouchableOpacity>
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
    borderRadius: 100,
    borderColor: '#eee',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
  }
});