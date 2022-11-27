import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Calendar from './components/Calendar.js';
import Overview from './components/Overview';
import SingleReview from './SingleReview.js';

export default function SingleCampsite ({route, navigation}){

  const { campsite } = route.params

  console.log('campsite', campsite);
  const [availabilityButtonClicked, setAvailabilityButtonClicked] = useState(false);
  const [reviewsClicked, setReviewsClicked] = useState(false);

  const image = {
    uri: campsite.photos[0]?.photo_url
  }

  const showCalendar = () => {
    setAvailabilityButtonClicked(!availabilityButtonClicked);
  }

  const showReviews = () => {
    setReviewsClicked(!reviewsClicked);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Overview campsite={campsite}/>
        <Text style={{textAlign:"center", paddingBottom:20}}>
          Price: {Number(campsite.price) || 100}/night
        </Text>

        {availabilityButtonClicked && <Calendar setAvailabilityButtonClicked={setAvailabilityButtonClicked} campsite={campsite}/>}
        {!availabilityButtonClicked &&
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={showCalendar} >
            <Text style={styles.btnText}>Show Availability</Text>
          </TouchableOpacity>
        </View>
        }

        {!reviewsClicked &&
        <TouchableOpacity style={{paddingTop:20, textAlign:"center"}}>
          <Text onPress={showReviews}>
            Average Rating: {Math.round(campsite?.star_rating) || 3} ⭐️'s, {campsite.reviews?.length || 0} Reviews
          </Text>
        </TouchableOpacity>}
          {campsite?.reviews && reviewsClicked &&
            <ScrollView horizontal={true} style={styles.reviewsContainer}>
              {campsite.reviews.map((review, index) => {
                return < SingleReview key={index} review={review}/>
              })}
            </ScrollView>
          }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    flexDirection: 'row',
    paddingTop:10
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
