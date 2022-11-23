import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';

const Homepage = ({ navigation }) => {
  const [campsites, setCampsites] = useState([]);

  const navigate = () => {
    navigation.navigate('login');
  };
  useEffect(() => {
    axios
      .get('http://192.168.86.36:3000/campsites')
      .then((results) => {
        console.log('results from successful axios request', results.data);
        setCampsites(results.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const handleReserve = () => {
    //check if logged in logic
    //if not logged in then call navigate back to login
    //else do the other thing
    console.log('you clicked the reserve button');
  };

  return (
    <View>
      {campsites.map((campsite, index) => {
        return <SingleCampsite key={index} campsite={campsite} />;
      })}
    </View>
  );
};

export default Homepage;
