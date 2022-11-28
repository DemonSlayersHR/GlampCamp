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

  const [dates, setDates] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 100 }}>
        {/* overview */}
        <Overview campsite={campsite} navigation={navigation}/>
        {/* calendar */}
        <Calendar
          setAvailabilityButtonClicked={setAvailabilityButtonClicked}
          campsite={campsite}
          dates={dates}
          setDates={setDates}
        />
        {/* reviews */}
        <View style={styles.paddedDivider}>
          <View style={styles.divider}></View>
          <TouchableOpacity style={{ paddingTop: 10 }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              ★ {parseInt(campsite.star_rating).toFixed(1) || 3}{' '}•{' '}
              {campsite.reviews?.length || 0} Reviews
            </Text>
          </TouchableOpacity>
        {campsite?.reviews && (
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
          <HostInfo navigation={navigation} campsite={campsite}/>
        </View>
      </ScrollView>

      {/* footer */}
      <Footer campsite={campsite} dates={dates}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
  },
  reviewsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  paddedDivider: {
    paddingLeft:20,
    paddingRight:20,
    paddingBottom: 10,
  },
  divider: {
    paddingTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .3)',
  },
});
