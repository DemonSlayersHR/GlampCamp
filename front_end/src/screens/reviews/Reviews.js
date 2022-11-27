import React, {useEffect, useState} from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import axios from 'axios';
import ImageUploader from './ImageUploader.js';
import StarRating from './StarRating.js';
import {URL} from '../../../config.js';

const Reviews = () => {

  // messaging:  user_type: 'client'
  const [campsites, setCampsites] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [review, onChangeReview] = useState('');
  const [reviewPressed, setReviewPressed] = useState(false);
  const [hadVisited, setHadVisited] = useState(false);
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState('');

  useEffect(() => {
    // my url...you're probably gonna have to change it
    axios.get(`http://${URL}:3000/campsites`)
      .then((results) => {
        // console.log('results from axios get request to get campsites', results.data);
        setCampsites(results.data);
      })
      .catch((error) => {
        console.log('error - cannot get campsites', error);
      })
  }, []);

  useEffect(() => {
    let campsite = campsites[5];
    const image = {
      uri: campsite?.photos[0].photo_url
    }
    let dates = campsite?.dates;
    if (dates) {
      for (let i = 0; i < dates.length; i++) {
        if (isBeforeToday(dates[i].date)) {
          setHadVisited(true);
          setDate(dates[i].date);
          break;
        }
      }
    }
  })

  // Check to see if user has visited this campsite before
  const isBeforeToday = (date) => {
    const newDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return newDate <= today;
  }

  const leaveAReview = () => {
    setReviewPressed(!reviewPressed)
  }

  const submitReview = () => {
    setReviewPressed(!reviewPressed);
    // my url...you're probably gonna have to change it
    axios.post(`http://${URL}:3000/campsites/reviews`, {
      camp_id: 1,
      client_id: 2,
      star_rating: rating,
      review: review
    })
      .then((result) => {
        console.log('result from successful axios post request to add a review', result)
      })
  }

  const styles = StyleSheet.create({
    FormView: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TextInput: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      width: '90%',
      borderWidth: 1,
      borderColor: '#fff',
      height: 52,
      borderRadius: 10,
      color: '#000',
      paddingLeft: 5,
      marginTop: 15,
    },
    button: {
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#F4A259',
      backgroundColor: '#F4A259'
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop:30
    },
    buttonText: {
      fontSize: 20,
      textAlign: 'center',
    }
  });

  return (
    <>
      {!reviewPressed && hadVisited &&
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={leaveAReview}> Leave a Review </Text>
        </TouchableOpacity>
      </View>
      }
      {reviewPressed && hadVisited &&
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:25}}>
            Leave a Rating
          </Text>
          <StarRating setRating={setRating}/>
          <Text style={{paddingTop:20, fontSize:25}}>
            Leave a Review
          </Text>
          <View style={styles.FormView}>
            <TextInput
              onChangeText={onChangeReview}
              value={review}
              placeholder={'leave a review'}
              placeholderTextColor={'#d3d3d3'}
              style={styles.TextInput}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={submitReview}> Submit Review </Text>
          </TouchableOpacity>
        </View>
      }
      <View>
        <ScrollView>
          <View style={styles.TextInput} >
            <Text>
              Camp Pristine: Mountain View, CA
            </Text>
            {hadVisited &&
            <Text>
              Date Last Visited: {date}
            </Text>}
          </View>
          <Image source={require('../../../assets/glampsite.jpeg')} style={{marginBottom:20, width:390, height:275}} />
          <ImageUploader />
        </ScrollView>
      </View>
    </>
  );
};

export default Reviews;