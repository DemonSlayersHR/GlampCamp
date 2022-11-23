import { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Campsite ({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={[styles.top, styles.shadow]}>
      </View>
      <View style={styles.campsitesContainer}>
        <Text>
          hi there
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 5,
    alignItems: 'center',
  },
  top: {
    borderColor: 'rgba(158, 150, 150, .09)',
    borderTopWidth: 1,
    width: '100%',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  campsitesContainer: {
    padding: 16,
    width: '100%',
    height: '90%',
  }

});