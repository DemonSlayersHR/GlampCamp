import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Campsite({ campsite, navigation }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length < campsite.photos.length) {
      campsite.photos.forEach((photo) =>
        setImages((prev) => [...prev, { img: photo.photo_url }])
      );
    }
  }, []);

  const navigateSingleCampsite = () => {
    navigation.navigate('campsite', { campsite: campsite });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('campsite', { campsite: campsite })}>
      <View style={{ borderRadius: 20, marginBottom: 10 }}>
        <ImageSlider
          data={images}
          autoPlay={false}
          closeIconColor='#fff'
          caroselImageStyle={{ resizeMode: 'cover', width: 348 }}
          preview={false}
          onClick={() =>
            navigation.navigate('campsite', { campsite: campsite })
          }
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{ fontSize: 16, fontWeight: 'semibold', marginBottom: 2 }}
          onPress={navigateSingleCampsite}>
          {campsite.camp_name}
        </Text>
        <Text style={{ fontSize: 13 }}>
          ★{' '}
          {campsite.star_rating ? parseInt(campsite.star_rating).toFixed(1) : 0}
        </Text>
      </View>

      <Text style={{ marginBottom: 2, color: 'gray' }}>
        {campsite.location}
      </Text>
      <Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>
          ${campsite.price}
        </Text>{' '}
        a night
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // lineHeight: 20
  },
});
