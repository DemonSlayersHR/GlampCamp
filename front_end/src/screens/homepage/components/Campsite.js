import { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import { ImageSlider } from "react-native-image-slider-banner";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Campsite ({ campsite, navigation }) {
  const [images, setImages] = useState([])

  useEffect(() => {
    if (images.length < campsite.photos.length) {
      campsite.photos.forEach(photo => setImages(prev => [...prev, {img: photo.photo_url}]))
    }
  }, [])

  console.log(campsite)

  return (
    <View style={styles.container}>
      <View style={{borderRadius:20, marginBottom:10}}>
        <ImageSlider
            data={images}
            autoPlay={false}
            onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
            caroselImageStyle={{ resizeMode: 'cover', width: 348}}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize:16, fontWeight: 'semibold', marginBottom:2}}>
          {campsite.camp_name}
        </Text>
        <Text style={{fontSize: 13}}>
          ★ 5.0
        </Text>
      </View>

      <Text style={{marginBottom:2, color:'gray'}}>{campsite.location}</Text>
      <Text><Text style={{fontWeight: 'bold', marginBottom:2}}>${campsite.price}</Text> a night</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // lineHeight: 20
  },

});