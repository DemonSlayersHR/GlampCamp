import React, {useEffect, useState} from 'react';
import { Image, Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';

export default function HostInfo ({campsite}){

  return (
    <View style={styles.container}>
      <Text style={{fontSize:18, fontWeight:'600'}}>Hosted by NAME</Text>
      <View style={styles.viewBtn}><Text>Contact Host</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  viewBtn: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});