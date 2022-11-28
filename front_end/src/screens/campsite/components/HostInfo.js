import { useEffect, useState, useContext } from 'react';
import { Image, Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { UserContext } from '../../../context/UserContext';

export default function HostInfo ({campsite, navigation}){
  const {user, setUser} = useContext(UserContext)

  return (
    <View style={styles.container}>
      <Text style={{fontSize:18, fontWeight:'600'}}>Hosted by NAME</Text>
      <Pressable style={styles.viewBtn} onPress={() => navigation.navigate('messaging', {user: user.userInfo, campsite: campsite, user_type: 'client'})}>
        <Text>Contact Host</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  viewBtn: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});