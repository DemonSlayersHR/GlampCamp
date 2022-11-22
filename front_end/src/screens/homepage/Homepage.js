import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';

const Campsites = () => {
  const [campsites, setCampsites] = useState([]);

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
    console.log('you clicked the reserve button');
  };

  return (
    <View>
      {campsites.map((campsite, index) => {
        return <SingleCampsite key={index} campsite={campsite}/>
      })}
    </View>
  );
};

export default Campsites;