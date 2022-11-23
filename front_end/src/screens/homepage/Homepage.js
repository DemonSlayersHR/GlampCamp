import { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Search from './components/Search';
import Filter from './components/Filter'
import Nav from '../../shared/nav/Nav.js';
import Campsite from './components/Campsite';

export default function Homepage ({ navigation }) {
  const [campsites, setCampsites] = useState([]);
  const [filter, setFilter] = useState('Discover');

  const navigate = () => {
    navigation.navigate('login');
  };

  useEffect(() => {
    axios.get('http://192.168.1.19:3000/campsites')
      .then((results) => {
        console.log('results from successful axios request', results.data);
        setCampsites(results.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [filter]);

  console.log('campsites', campsites)


  return (
    <View style={styles.container}>
      <Search/>
      <Filter setFilter={setFilter} filter={filter}/>
      <Campsite/>
      <Nav/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

