import React, {useEffect, useState} from 'react';
import { Image, Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';

export default function Footer ({campsite, dates}){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  function Dates(){
    if (dates.length>1){
      let start = `${months[dates[0].split('-')[1]-1]} ${dates[0].split('-')[2]}`
      let end = `${months[dates[1].split('-')[1]-1]} ${dates[1].split('-')[2]}`

      if (start.split(' ')[0] === end.split(' ')[0]){
        return `${start.split(' ')[0]} ${start.split(' ')[1]} - ${end.split(' ')[1]}`
      } else {
        return `${start} - ${end}`
      }
    } else {
      return 'Select dates'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.footerItems}>
        <View>
          <Text style={{fontWeight: '600'}}>${campsite.price} <Text style={{color: 'gray'}}>/night</Text></Text>
          <Text style={{fontSize: 13, textDecorationLine: 'underline'}}>{Dates()}</Text>
        </View>
        <Pressable>
          <View style={styles.reserveBtn}>
            <Text style={{color: 'white', fontWeight: '600'}}>Reserve</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: '100%',
    borderTopWidth: .8,
    borderColor: 'rgba(158, 150, 150, .3)',
    backgroundColor: 'white',
  },
  footerItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    padding: 20
  },
  reserveBtn: {
    backgroundColor: '#e80050',
    borderRadius: 20,
    padding: 8,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});