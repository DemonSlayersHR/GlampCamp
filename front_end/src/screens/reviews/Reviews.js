import React, {useEffect, useState} from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import axios from 'axios';
import ImageUploader from './ImageUploader.js';
import StarRating from './StarRating.js';

const Reviews = () => {

  // messaging:  user_type: 'client'
  const [campsites, setCampsites] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [review, onChangeReview] = useState('');
  const [reviewPressed, setReviewPressed] = useState(false);
  const [hadVisited, setHadVisited] = useState(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get('http://192.168.1.3:3000/campsites')
      .then((results) => {
        console.log('results from axios get request to get campsites', results.data);
        setCampsites(results.data);

      })
      .catch((error) => {
        console.log('error - cannot get campsites', error);
      })
  }, []);

  // https://bobbyhadz.com/blog/javascript-check-if-date-is-before-today
  const isBeforeToday = (date) => {
    const newDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return newDate <= today;
  }

  let campsite = campsites[5];
  if (campsite) {
    const image = {
      uri: campsite?.photos[0].photo_url
    }
    console.log('campsite', campsite);
    let dates = campsite.dates;
    for (let i = 0; i < dates.length; i++) {
      if (isBeforeToday(dates[i].date)) {
        setHadVisited(true);
        break;
      }
    }
  }

  const leaveAReview = () => {
    setReviewPressed(!reviewPressed)
  }

  const submitReview = () => {
    console.log('star rating', rating);
    console.log('review', review);
    // axios.post reviews
    setReviewPressed(!reviewPressed);
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
    },
    buttonText: {
      fontSize: 20,
      textAlign: 'center',
    }
  });

  return (
    <>
      {/* {!reviewPressed && hadVisited && <View style={styles.buttonRow}> */}

      {!reviewPressed && <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={leaveAReview}> Leave a Review </Text>
        </TouchableOpacity>
      </View>}
      {/* {reviewPressed && hadVisited && */}

      {reviewPressed &&
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
              Dates Visited: {campsite.dates[0].date}
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