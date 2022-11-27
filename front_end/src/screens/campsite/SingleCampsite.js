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

export default function SingleCampsite({ route, navigation }) {
  const { campsite } = route.params;

  const [availabilityButtonClicked, setAvailabilityButtonClicked] =
    useState(false);

  const showCalendar = () => {
    setAvailabilityButtonClicked(!availabilityButtonClicked);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
        <Overview campsite={campsite} navigation={navigation} />
        {/* <Text>
          {campsite.price} night, {Math.round(campsite.star_rating)} stars
        </Text> */}

        {availabilityButtonClicked && <Calendar campsite={campsite} />}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={showCalendar}>
            <Text style={styles.btnText}>Show Availability</Text>
          </TouchableOpacity>
        </View>

        {campsite?.reviews && (
          <ScrollView horizontal={true} style={styles.reviewsContainer}>
            {campsite.reviews.map((review) => {
              return <SingleReview review={review} />;
            })}
          </ScrollView>
        )}
      </ScrollView>
      <Footer campsite={campsite} />
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
    // backgroundColor: "#5B8E7D",
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
});
