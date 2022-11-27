import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = () => {

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
      setImage(result.assets[0].uri);
    }
  };
  const styles = StyleSheet.create({
    button: {
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#F4A259',
      backgroundColor: '#F4A259'
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 20,
      textAlign: 'center',
    }
  });

  // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}

  return (
    <View style={styles.buttonRow}>
      {!image &&
      <>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={pickImage}> Upload Photo </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Chat with Host</Text>
        </TouchableOpacity>
      </>}
      {image && <Image source={{ uri: image }} style={{ width: 390, height: 450 }} />}
    </View>


  );
}

export default ImageUploader;