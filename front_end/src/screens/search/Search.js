import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Where from './components/Where'
import When from './components/When'
import Who from './components/Who'
import Footer from './components/Footer'

export default function Search({navigation}) {
  const [selected, setSelected] = useState('Where')
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  if (selected === 'Where') {
    return (
      <>
      <Back navigation={navigation}/>
      <View style={styles.container}>
        <Where setSelected={setSelected}/>
        <Extra title="When" subTitle="Add dates" setSelected={setSelected}/>
        <Extra title="Who" subTitle="Add guests" setSelected={setSelected}/>
      </View>
        <Footer/>
      </>
    )
  }

  if (selected === 'When') {
    return (
      <>
      <Back navigation={navigation}/>
      <View style={styles.container}>
        <Extra title="Where" subTitle="I'm flexible" setSelected={setSelected}/>
        <When setSelected={setSelected}/>
      </View>
      </>
    )
  }

  if (selected === 'Who') {
    return (
      <>
      <Back navigation={navigation}/>
      <View style={styles.container}>
        <Extra title="Where" subTitle="I'm flexible" setSelected={setSelected}/>
        <Extra title="When" subTitle="Add guests" setSelected={setSelected}/>
        <Who
          adults={adults} setAdults={setAdults}
          children={children} setChildren={setChildren}
          infants={infants} setInfants={setInfants}
          pets={pets} setPets={setPets}
          />
      </View>
        <Footer/>
      </>
    )
  }
}

function Back({navigation}){
  return (
    <Icon
    name='chevron-left'
    style={{marginTop:50, marginLeft:10, borderRadius:20}}
    size={20}
    onPress={() => navigation.navigate('homepage')}
    />
  )
}

function Extra({title, subTitle, setSelected}){
  return (
    <Pressable style={[styles.extraContainer, styles.shadowExtra]} onPress={() => setSelected(title)}>
      <Text style={{fontSize: 13, color: 'gray'}}>
        {title}
      </Text>
      <Text style={{fontSize: 13, fontWeight: 'semibold'}}>
        {subTitle}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'f7f7f7',
  },
  extraContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 20,
    height: 53,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2.5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  shadowExtra: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
