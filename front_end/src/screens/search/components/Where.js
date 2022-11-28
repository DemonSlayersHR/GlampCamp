import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLEAPI } from '../../../../config.js';
import { useState } from 'react';

export default function Where({ setSelected, setLocation }) {
  return (
    <View style={[styles.searchContainer, styles.shadow]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Where to?</Text>

      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        query={{
          key: GOOGLEAPI,
          language: 'en',
        }}
        onPress={(data, details) => {
          setLocation(data.description);
          setSelected('When');
        }}
        onFail={(error) => console.error(error)}
        styles={{
          textInputContainer: {
            borderColor: 'gray',
            width: '100%',
            height: '22%',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
          },
          textInput: {
            color: '#5d5d5d',
            backgroundColor: 'transparent',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 25,
    height: 295,
    padding: 20,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2.5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    height: '22%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
});
