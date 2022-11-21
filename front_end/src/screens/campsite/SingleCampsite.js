import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import Calendar from './Calendar.js';

const SingleCampsite = ({campsite}) => {

  const [availabilityButtonClicked, setAvailabilityButtonClicked] = useState(false);

  const image = {
    uri: campsite.photos[1]?.photo_url
  }

  const showCalendar = () => {
    setAvailabilityButtonClicked(true);
  }

  return (
    <ScrollView style={{padding: 69, flex: 1}}>
      <View style={{justifyContent: "center", alignItems: "center"}} >
        <Image source={image} style={{width: 400, height: 400}} />
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
          title="Show Availability"
          onPress={showCalendar}
        />
        {availabilityButtonClicked && <Calendar />}
      </View>
    </ScrollView>
  );
}

export default SingleCampsite;