import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = ({ signUpForm, setSignUpForm }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      setSignUpForm({ ...signUpForm, user_photo: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.PhotoUploadProfile}>
      {!signUpForm.user_photo ? (
        <Button
          style={styles.PhotoUploadProfile}
          title='Pick a profile photo'
          onPress={pickImage}
        />
      ) : (
        <Text>Looks Lovely!</Text>
      )}
      {image && (
        <Image
          source={{ uri: signUpForm.user_photo }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  PhotoUploadProfile: {
    display: 'flex',
    width: '50%',
    height: 52,
    // backgroundColor: '#5B8E7D',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ImageUploader;
