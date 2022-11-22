import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

const SingleCampsite = ({campsite}) => {

  console.log('campsite', campsite);

  const image = {
    uri: campsite.photos[1]?.photo_url
  }

  console.log('image', image)

  return (
      <FlatList style={{padding: 69, flex: 1}}>
        <View style={{justifyContent: "center", alignItems: "center"}} >
          {campsite.photos[1] && <Image source={image} />}
          <Text style={{fontSize: 20, padding:5, fontWeight: "bold", textAlign: "left", marginLeft:50,  marginRight:37}}>
            {campsite.camp_name} - {campsite.description}
          </Text>
          <Text style={{textDecorationLine: "underline", textAlign: "center"}}>
            {campsite.location}
          </Text>
          <Text>
            {campsite.price} night, {campsite.star_rating} stars
          </Text>
          <Button
            title="Reserve"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </FlatList>

  );
}

export default SingleCampsite;