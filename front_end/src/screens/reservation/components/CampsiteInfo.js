import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

export default function CampsiteInfo({ campsite }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={{ uri: campsite.photos[0].photo_url }}
        style={styles.image}
      />
      <View
        style={{
          marginLeft: 25,
          width: '55%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{ color: 'gray', fontSize: 14 }}>Entire campsite</Text>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {campsite.camp_name}
          </Text>
        </View>
        <View>
          <Text>
            ★ {parseInt(campsite.star_rating).toFixed(1) || 0} (
            {campsite.reviews?.length || 0}) • Superhost
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 130,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 18,
  },
});
