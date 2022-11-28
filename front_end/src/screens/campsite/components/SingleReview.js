import React from 'react';
import axios from 'axios';
import { Button, Image, Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function SingleReview ({review}) {

return (
  <>
  <View style={styles.boxSimple}>
    <View style={{flexDirection: 'row'}}>
      <Text>{review.reviewer} • {review.star_rating} ★'s</Text>
    </View>
    <View style={{paddingTop:10}}>
      <Text>
        {review.review}
      </Text>
    </View>
  </View>
  </>
);
}

const styles = StyleSheet.create({
  boxSimple: {
      backgroundColor: '#fff',
      width: 200,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: 'rgba(158, 150, 150, .7)',
      padding: 10,
      marginRight: 20,
      marginTop: 10,
      minHeight: 150
  },
})