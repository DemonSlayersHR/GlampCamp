import React, {useState, useEffect} from 'react';import {Text, StyleSheet, TouchableOpacity, Platform, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker'

export default function AddPhotoCloudinary ({photosArray, setPhotosArray}) {

  useEffect(() => {
    async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied!')
        }
      }
    }
  })

  const cloudinaryUpload = (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'gmuceony')
    data.append('cloud_name', 'deb1jjsn0')
    fetch('https://api.cloudinary.com/v1_1/deb1jjsn0/image/upload', {
      method: 'post',
      body: data
    }).then(res => res.json())
      .then(data => {setPhotosArray([...photosArray, data.secure_url])})
      .catch(err => {Alert.alert('An Error Occured While Uploading'); console.log(err)})

  }

  const pickImage = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,3],
      quality: 0.2,
    })
    if (!_photo.canceled) {
      const uri = _photo.assets[0].uri;
      const type = _photo.assets[0].type;
      const name = _photo.assets[0].fileName || new Date().toISOString();
      const source = {
        uri,
        type,
        name,
      }
      cloudinaryUpload(source)
    }
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={pickImage}>
      <Text style={styles.btnText}> Upload Photo </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 9,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eee',
    // backgroundColor: '#FFADAD'
  },
  btnText: {
    // fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});