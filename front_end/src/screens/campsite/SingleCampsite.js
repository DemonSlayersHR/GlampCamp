import React from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';

const SingleCampsite = () => {
// const SingleCampsite = ({campsite}) => {

  // console.log('campsite', campsite);

  const campsiteImage = {
    uri: require('../../../assets/campsite.jpeg')
  };

  return (
      <ScrollView style={{padding: 40, flex: 1}}>
        <View style={{justifyContent: "center", alignItems: "center"}} >
          <Image source={campsiteImage.uri} />
          <Text style={{fontSize: 20, padding:5, fontWeight: "bold", textAlign: "left", marginLeft:50, marginRight:37}}>
          3 Tents with a Campfire & Mountain Views
          </Text>
          <Text style={{textDecorationLine: "underline", textAlign: "center"}}>
            Yosemite National Park, Yosemite, CA
          </Text>
          <Text>
            Price: $150 night, Rating: 4.0 stars
          </Text>
          <Button
        title="Reserve"
        onPress={() => Alert.alert('Simple Button pressed')}
      />

        </View>
      </ScrollView>

  );
}

export default SingleCampsite;