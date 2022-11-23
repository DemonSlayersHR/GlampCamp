// import React, {useEffect, useState} from 'react';
// import { Button, Image, Text, View, ScrollView } from 'react-native';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';

//   Page that lists the campsites that a user has visited/plans to visit
//   Allows user to leave a star rating (out of 5) with a written review
//   Allows camper to add photos of campsites
//   Shortcut for chatting with hosts


// const UserProfile = () => {

//   const [campsites, setCampsites] = useState([]);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     axios.get('/campsites')
//       .then((results) => {
//         console.log('results from axios get request to get campsites', results.data);
//         setCampsites(results.data);
//       })
//       .catch((error) => {
//         console.log('error - cannot get campsites', error);
//       })
//   })

//   // from cloudinary website, configure your sdk:
//   var cl = new cloudinary.Cloudinary({cloud_name: "dgjzqkjh0", secure: true});

//   // photo uploader from fec/mvp
//   const photoWidget = cloudinary.createUploadWidget(
//     {
//       cloudName: 'dgjzqkjh0',
//       uploadPreset: 'user profile'
//     },
//     (error, result) => {
//       if (error) {
//         console.log('error uploading photo', error);
//       }
//       if (!error && result && result.event === 'success') {
//         setPhoto(result.info.url);
//       }
//     }
//   );

// };

// export default UserProfile;


// Example from Expo ImagePicker docs:

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}