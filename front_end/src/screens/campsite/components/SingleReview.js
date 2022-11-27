import React from 'react';
import axios from 'axios';
import { Button, Image, Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function SingleReview ({review}) {

console.log('review', review);

return (
  <>
  <View style={styles.boxSimple}>
    <View>
      <Text>{review.reviewer}</Text>
      <Text> {review.star_rating} ★'s</Text>
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
      borderColor: '#000',
      paddingTop: 10,
      margin: 20,
  },
})