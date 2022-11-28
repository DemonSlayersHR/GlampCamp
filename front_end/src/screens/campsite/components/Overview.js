import React, {useEffect, useState} from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Overview ({campsite, navigation}){

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: campsite.photos[0].photo_url}}/>

      <View style={styles.nav}>
        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable style={styles.iconContainer} onPress={() => navigation.navigate('homepage')}>
            <MaterialIcons name="arrow-back-ios"/>
          </Pressable>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconContainer}>
              <Ionicons name="ios-share-outline" size={18}/>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="ios-heart-outline" size={18}/>
          </View>
          </View>
        </View>
      </View>

      <View style={styles.overviewContainer}>
        <View style={styles.infoBox}>
          <Text style={{fontSize: 30, fontWeight: '700', marginBottom: 8}}>{campsite.camp_name}</Text>
          <Text style={{marginBottom: 5}}>
            <Text style={{fontSize:11}}>★</Text> {campsite.star_rating? parseInt(campsite.star_rating).toFixed(1) : 0 } • {campsite.reviews?.length || 0} Reviews • Superhost •

          </Text>
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
    position: 'relative'
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
  },
  nav: {
    position: 'absolute',
    top: 35,
    left: 25,
    width: '100%'
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 200,
    marginRight: 10
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

