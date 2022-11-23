import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Filter ({ filter, setFilter }) {
  return (
    <View style={{height: '8%', marginTop: 30}}>
      <View style={styles.container}>
        <Category iconName="auto-awesome" title="Discover" filter={filter} setFilter={setFilter}/>
        <Category iconName="location-pin" title="Near you" filter={filter} setFilter={setFilter}/>
        <Category iconName="attach-money" title="By price" filter={filter} setFilter={setFilter}/>
        <Category iconName="star-rate" title="By rating" filter={filter} setFilter={setFilter}/>
      </View>
    </View>
  );
};

function Category({iconName, title, filter, setFilter}){
  return (
  <Pressable style={styles.category} onPress={() => setFilter(title)}>
    {
      title === filter ?
      <>
      <Icon name={iconName} size={25} color="black"/>
      <Text style={{fontWeight: "semibold", color: 'black'}}>{title}</Text>
      </>
      :
      <>
      <Icon name={iconName} size={25} color="#6e6e6e"/>
      <Text style={{fontWeight: "semibold", color: '#6e6e6e'}}>{title}</Text>
      </>
    }
  </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  category: {
    flex: 1,
    alignItems: 'center',
  },
});

