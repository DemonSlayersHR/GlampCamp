import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Calendar from './components/Calendar.js';
import Overview from './components/Overview';

export default function SingleCampsite ({route, navigation}){

  const { campsite } = route.params

  const [availabilityButtonClicked, setAvailabilityButtonClicked] = useState(false);

  const image = {
    uri: campsite.photos[0]?.photo_url
  }

  const showCalendar = () => {
    setAvailabilityButtonClicked(!availabilityButtonClicked);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Overview campsite={campsite}/>
      </ScrollView>
      {/* <View style={{justifyContent: "center", alignItems: "center"}} >
        <Image source={image} style={{width: 400, height: 400}} />
        <Text style={{fontSize: 20, padding:5, fontWeight: "bold", textAlign: "left", marginLeft:50,  marginRight:37}}>
          {campsite.camp_name} - {campsite.description}
        </Text>
        <Text style={{textDecorationLine: "underline", textAlign: "center"}}>
          {campsite.location}
        </Text>
        <Text>
          {campsite.price} night, {Math.round(campsite.star_rating)} stars
        </Text>
        <Button
          color="#5B8E7D"
          title="Show Availability"
          onPress={showCalendar}
        />
        {availabilityButtonClicked && <Calendar campsite={campsite}/>}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

});