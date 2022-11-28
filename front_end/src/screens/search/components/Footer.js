import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Footer({ navigation, location, setLocation }) {
  const [selected, setSelected] = useState('Explore');

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setLocation(null)}>
        <Text style={styles.clearAll}>Clear all</Text>
      </Pressable>
      <Pressable
        style={styles.searchBtn}
        onPress={() => navigation.navigate('homepage', { location: location })}>
        <Icon
          name='search'
          size={18}
          style={{ marginRight: 10, color: '#fff' }}
        />
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    borderTopWidth: 1,
    borderColor: '#ebebea',
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 5,
    paddingTop: 10,
  },
  clearAll: {
    marginLeft: 20,
    textDecorationLine: 'underline',
    fontWeight: 'semibold',
    fontSize: 15,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e80050',
    borderRadius: 12,
    padding: 10,
    height: 40,
    width: 110,
    marginRight: 20,
  },
});
