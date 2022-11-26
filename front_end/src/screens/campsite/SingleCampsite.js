import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import Calendar from './Calendar.js';

const SingleCampsite = ({}) => {

  let campsite = {
    "camp_id": 1,
    "camp_name": "Camp Expensive",
    "host": "test1",
    "price": "200",
    "star_rating": null,
    "location": "Mountain View",
    "description": "Cozy AF",
    "dates": [
        {
            "date_id": "date_id",
            "client": null,
            "date": "2022-12-23",
            "reserved": false
        },
        {
            "date_id": "date_id",
            "client": null,
            "date": "2022-12-24",
            "reserved": false
        },
        {
            "date_id": "date_id",
            "client": null,
            "date": "2022-12-25",
            "reserved": false
        }
    ],
    "photos": [
        {
            "photo_id": 1,
            "photo_url": "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg"
        },
        {
            "photo_id": 8,
            "photo_url": "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1652453103/campground-photos/shgam6kwlyuu7cvblkth.jpg"
        }
    ],
    "reviews": null,
    "reservations": [
        {
            "reserve_id": 2,
            "client_id": 3,
            "confirmed": false
        }
    ]
  }

  const [availabilityButtonClicked, setAvailabilityButtonClicked] = useState(false);

  const image = {
    uri: campsite.photos[0]?.photo_url
  }

  const showCalendar = () => {
    setAvailabilityButtonClicked(!availabilityButtonClicked);
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
          {campsite.price} night, {Math.round(campsite.star_rating)} stars
        </Text>
        <Button
          color="#5B8E7D"
          title="Show Availability"
          onPress={showCalendar}
        />
        {availabilityButtonClicked && <Calendar campsite={campsite}/>}
      </View>
    </ScrollView>
  );
}

export default SingleCampsite;