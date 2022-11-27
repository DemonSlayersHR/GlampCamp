import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Calendar from './components/Calendar.js';
import Overview from './components/Overview';
import SingleReview from './SingleReview.js';

export default function SingleCampsite ({route, navigation}){

  const { campsite } = route.params

  console.log('campsite', campsite);
  // we want camp_id to do a get request to get the reviews for the campsite
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
        <Text>
          {campsite.price} night, {Math.round(campsite.star_rating)} stars
        </Text>

        {availabilityButtonClicked && <Calendar campsite={campsite}/>}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={showCalendar} >
            <Text style={styles.btnText}>Show Availability</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>

        </TouchableOpacity>
          {campsite?.reviews &&
            <ScrollView horizontal={true} style={styles.reviewsContainer}>
              {campsite.reviews.map((review) => {
                return < SingleReview review={review}/>
              })}
            </ScrollView>
          }


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50
  },
  btnContainer: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    // backgroundColor: "#5B8E7D",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  btnText: {
    fontWeight: 'bold'
  }
});
