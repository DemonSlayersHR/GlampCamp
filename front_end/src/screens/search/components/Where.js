import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Where({setSelected}) {

  return (
      <View style={[styles.searchContainer, styles.shadow]}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Where to?
        </Text>
        <View style={styles.input}>
        <Icon name="search" size={18} style={{marginTop: 8}}/>
        <TextInput style={{width: '80%', marginLeft: 10}} placeholder="Search destinations" placeholderTextColor='#6e6e6e'/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 25,
    height: 295,
    padding: 20
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2.5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    height: "22%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row'
  },

});
