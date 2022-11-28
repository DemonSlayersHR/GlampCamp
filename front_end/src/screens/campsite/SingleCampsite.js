import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Calendar from './components/Calendar';
import Overview from './components/Overview';
import Footer from './components/Footer';
import HostInfo from './components/HostInfo'
import SingleReview from './components/SingleReview.js';

export default function SingleCampsite({
  route,
  navigation,
  setAvailabilityButtonClicked,
}) {
  const { campsite } = route.params;

  const [reviewsClicked, setReviewsClicked] = useState(false);

  const showReviews = () => {
    setReviewsClicked(!reviewsClicked);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        {/* overview */}
        <Overview campsite={campsite} navigation={navigation} />
        {/* calendar */}
        <Calendar
          setAvailabilityButtonClicked={setAvailabilityButtonClicked}
          campsite={campsite}
        />
        {/* reviews */}
        <View style={styles.paddedDivider}>
          <View style={styles.divider}></View>
          {!reviewsClicked && (
          <TouchableOpacity style={{ paddingTop: 20, textAlign: 'center' }}>
            <Text onPress={showReviews}>
              Average Rating: {Math.round(campsite?.star_rating) || 3} ⭐️'s,{' '}
              {campsite.reviews?.length || 0} Reviews
            </Text>
          </TouchableOpacity>
        )}
        {campsite?.reviews && reviewsClicked && (
          <ScrollView horizontal={true} style={styles.reviewsContainer}>
            {campsite.reviews.map((review, index) => {
              return <SingleReview key={index} review={review} />;
            })}
          </ScrollView>
        )}
        </View>


        {/* host */}
        <View style={styles.paddedDivider}>
          <View style={styles.divider}></View>
          <HostInfo/>
        </View>
      </ScrollView>
      <Footer campsite={campsite} />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
  },
  reviewsContainer: {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
  },
  paddedDivider: {
    padding:20
  },
  divider: {
    paddingTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .3)',
  },
});
