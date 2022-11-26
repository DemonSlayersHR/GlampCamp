import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Search from './components/Search';
import Filter from './components/Filter';
import Nav from '../../shared/nav/Nav.js';
import Feed from './components/Feed';
import { URL } from '../../../config.js';

export default function Homepage({ navigation }) {
  const [campsites, setCampsites] = useState([]);
  const [filter, setFilter] = useState('Discover');

  useEffect(() => {
    axios.get(`http://${URL}:3000/campsites`)
      .then((results) => {setCampsites(results.data);})
      .catch((error) => {console.log('error', error);});
  }, [filter]);

  return (
    <View style={styles.container}>
      <Search navigation={navigation}/>
      <Filter setFilter={setFilter} filter={filter}/>
      <Feed campsites={campsites} navigation={navigation}/>
      <Nav navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 45
  },
});
