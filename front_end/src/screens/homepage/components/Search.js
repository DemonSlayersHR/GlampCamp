import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Search ({ navigation }) {
  // const navigate = () => {
  //   navigation.navigate('login');
  // };

  return (
    <View style={styles.container}>
        <View style={[styles.inputContainer, styles.shadow]}>
            <View style={styles.inputItems}>
              <Icon name="search" size={20}/>
              <View style={{marginLeft: 15}}>
                <Text style={{fontSize: 15, fontWeight: 'semibold'}}>Where to?</Text>
                <Text style={{color:'#717171', fontSize: 13}}>Anywhere • Any week • Add guests</Text>
              </View>
              <Icon name="options-outline" size={20} style={styles.optionsIcon}/>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: '8%',
  },
  inputContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    fontSize: 18,
    height: 52,
    width: 340,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2.5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  inputItems:{
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsIcon:{
    marginLeft: 35,
    padding: 2,
    borderRadius: 20,
    border: 1,
    borderColor: 'black'
  }
});

