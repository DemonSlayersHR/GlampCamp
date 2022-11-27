import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Overview ({campsite}){

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: campsite.photos[0].photo_url}}/>
      <View style={styles.overviewContainer}>
        <View style={styles.infoBox}>
          <Text style={{fontSize: 28, fontWeight: '700'}}>{campsite.camp_name}</Text>
          {campsite.star_rating && <Text>{Math.round(campsite.star_rating)}.0</Text>}
          <Text>{campsite.location}</Text>

          {/* divider */}
          <View style={styles.divider}></View>

          <Text><Text style={{fontWeight:'600'}}>This is a rare find.</Text> <Text style={{textTransform: 'capitalize'}}>{campsite.host}</Text>'s place on GlampCamp is usually fully booked.</Text>

          {/* divider */}
          <View style={styles.divider}></View>

          <Text style={{fontSize:18, fontWeight:'600'}}>
            <Text>Campsite hosted by <Text style={{textTransform: 'capitalize'}}>{campsite.host}</Text></Text>
          </Text>
          <Text>2 guests • 1 bed • 1 bath</Text>

          {/* divider */}
          <View style={styles.divider}></View>

          <Features
            name="desk" feature="Dedicated workspace"
            featureInfo="A common area with wifi that's well-suited for working."/>
          <Features
          name="door" feature="Self check-in"
          featureInfo="Check yourself in with the lockbox."/>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -10}}>
            <View style={styles.featureIcons}>
              <Icon name="calendar" size={28}/>
            </View>
            <View style={styles.featureInfo}>
                <Text style={{fontWeight: '600', marginBottom:4}}>Free cancellation before Jan 6.</Text>
            </View>
          </View>

          {/* divider */}
          <View style={styles.divider}></View>

          <Text style={{fontSize: 12, marginBottom: 10}}>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</Text>
          <Text style={{fontSize: 12, textDecorationLine: 'underline', fontWeight: '600'}}>Learn more.</Text>

          {/* divider */}
          <View style={styles.divider}></View>

          <Text style={{fontSize: 20, fontWeight: '600', marginBottom:10}}>Where you'll be</Text>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}

function Features({name, feature, featureInfo}){
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18, height: 55}}>
      <View style={styles.featureIcons}>
        <Icon name={name} size={28}/>
      </View>
      <View style={styles.featureInfo}>
          <Text style={{fontWeight: '600', marginBottom:4}}>{feature}</Text>
          <Text style={{color: 'gray', marginBottom:4}}>{featureInfo}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
  },
  overviewContainer: {
    padding: 20
  },
  infoBox: {
  },
  divider:{
    paddingTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .3)'
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  featureIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    height: '100%'
  },
  featureInfo: {
    height: '100%',
    marginLeft: 8
  }
});

