import { Button, Image, Text, View, ScrollView, StyleSheet } from 'react-native';
import Campsite from './Campsite'

export default function Feed ({ campsites, navigation, location }) {

  return (
    <View style={styles.container}>
      <View style={[styles.top, styles.shadow]}>
      </View>
      <ScrollView style={styles.campsitesContainer}>
        {
          campsites.filter(campsite => {
            if (location) {
              return campsite.location.toLowerCase().includes(location.split(',')[0].toLowerCase())
            } else {
              return campsite
            }
          }).map((campsite, i) =>
            <View key={i} style={{height: 400, padding: 5}}>
              <Campsite campsite={campsite} navigation={navigation}/>
            </View>
            )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 5,
    alignItems: 'center',
  },
  top: {
    borderColor: 'rgba(158, 150, 150, .09)',
    borderTopWidth: 1,
    width: '100%',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  campsitesContainer: {
    padding: 16,
    width: '100%',
    height: '100%',
    marginBottom: 80
  },
});