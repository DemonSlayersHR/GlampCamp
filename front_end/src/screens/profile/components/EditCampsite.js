import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import AddPhotosCloudinary from './AddPhotosCloudinary.js';
import { URL } from '../../../../config.js';

export default function EditCampsite({
  campsite,
  setShowOptions,
  setEditViewVisible,
  getHostCampsites,
}) {
  const [campsiteName, setCampsiteName] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const [photosArray, setPhotosArray] = useState([]);

  function editCampsite() {
    axios
      .put(`http://${URL}:3000/campsites`, {
        camp_id: campsite.camp_id,
        camp_name: campsiteName,
        price: price,
        location: location,
        description: description,
      })
      .then(() => {
        if (photosArray) {
          axios.put(`http://${URL}:3000/campsites/photos`, {
            photo_id: campsite.photos[0].photo_id,
            photo_url: photosArray[photosArray.length - 1],
          });
        }
      })
      .then(() => {
        setCampsiteName(null);
        setLocation(null);
        setDescription(null);
        setPrice(null);
        setPhotosArray([]);
        getHostCampsites();
        setShowOptions(false);
        setEditViewVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View>
      <TextInput
        placeholder='campsite name'
        value={campsiteName}
        style={styles.input}
        onChangeText={(text) => setCampsiteName(text)}
      />
      <TextInput
        placeholder='description'
        value={description}
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder='location'
        value={location}
        style={styles.input}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        placeholder='price'
        value={price}
        style={styles.input}
        onChangeText={(text) => setPrice(text)}
      />

      {photosArray.length > 0 ? (
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: photosArray[photosArray.length - 1] }}
            resizeMode={'cover'}
            style={styles.photo}
          />
        </View>
      ) : null}

      <View style={styles.btns}>
        <AddPhotosCloudinary
          photosArray={photosArray}
          setPhotosArray={setPhotosArray}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            editCampsite();
          }}>
          <Text style={styles.btnText}> Edit Campsite </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    // backgroundColor: '#FFADAD',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    // fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
