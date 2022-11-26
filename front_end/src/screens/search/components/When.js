import { StyleSheet, Text, View, Pressable, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function When({setSelected}) {
  const [toggle, setToggle] = useState('Choose')

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 20}}>
          When's your trip?
        </Text>
        <Toggle toggle={toggle} setToggle={setToggle}/>
        { toggle === 'Choose'? <Calendar/> : <Flexible/> }
      </View>
      <Footer setSelected={setSelected}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 25,
    height: '88%',
    borderRadius: 20,
  },
});

function Toggle({toggle, setToggle}) {
  return (
    <View style={toggleStyles.container}>
      <View style={toggleStyles.toggleContainer}>
        <Pressable
          style={toggle === 'Choose' ? [toggleStyles.toggled, toggleStyles.shadow] : toggleStyles.untoggled}
          onPress={() => setToggle('Choose')}>
          <Text style={{fontWeight: 'semibold'}}>Choose dates</Text>
        </Pressable>
        <Pressable
          style={toggle === 'Flexible' ? [toggleStyles.toggled, toggleStyles.shadow] : toggleStyles.untoggled}
          onPress={() => setToggle('Flexible')}>
          <Text style={{fontWeight: 'semibold'}}>I'm flexible</Text>
        </Pressable>
      </View>
    </View>
  )
}

const toggleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    width: 320,
    height: 40,
    borderRadius: 20,
    paddingLeft:5,
    paddingRight:5,
  },
  toggled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 20,
    width: 150
  },
  untoggled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    padding: 7,
    borderRadius: 20,
    width: 150
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})

function Calendar(){
  return (
    <View style={calendarStyles.container}>
      <ScrollView>
      <Text>
        Insert calendar stuff here
      </Text>
      </ScrollView>
    </View>
  )
}

const calendarStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '75%',
    borderBottomWidth: .5,
    borderColor: 'rgba(0, 0, 0, .1)'

  }
})

function Flexible(){
  const [label, setLabel] = useState('Weekend')

  return (
    <View style={flexibleStyles.container}>
      <View style={flexibleStyles.bordered}>
        <Text style={flexibleStyles.title}>Stay for a week</Text>
        <View style={{flexDirection: 'row'}}>
          <FlexibleLabel title="Weekend" label={label} setLabel={setLabel}/>
          <FlexibleLabel title="Week" label={label} setLabel={setLabel}/>
          <FlexibleLabel title="Month" label={label} setLabel={setLabel}/>
        </View>
      </View>

      <View style={flexibleStyles.bordered}>
        <Text style={flexibleStyles.title}>Go anytime</Text>
        <View style={{flexDirection: 'row'}}>
          <FlexibleCalendar month="December" year="2022"/>
          <FlexibleCalendar month="January" year="2023"/>
          <FlexibleCalendar month="February" year="2023"/>
        </View>
      </View>
    </View>
  )
}

function FlexibleLabel({title, label, setLabel}){
  return (
    <Pressable
      style={title===label ? flexibleStyles.clickedLabelContainer : flexibleStyles.labelContainer}
      onPress={() => setLabel(title)}>
      <Text>
        {title}
      </Text>
    </Pressable>
  )
}

function FlexibleCalendar({month, year}){
  return (
    <Pressable style={flexibleStyles.calendarContainer}>
      <Icon name="ios-calendar-outline" size={30} style={{marginBottom: 5, color: 'gray'}}/>
      <Text style={{color: 'gray'}}>{month}</Text>
      <Text style={{color: 'gray'}}>{year}</Text>
    </Pressable>
  )

}

const flexibleStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '75%',
    borderBottomWidth: .5,
    borderColor: 'rgba(0, 0, 0, .1)'
  },
  bordered: {
    borderTopWidth: .8,
    borderColor: 'rgba(0, 0, 0, .1)'
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'semibold'
  },
  labelContainer: {
    padding: 8,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: .8,
    borderColor: 'rgba(0, 0, 0, .3)'
  },
  clickedLabelContainer: {
    padding: 8,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .9)',
    backgroundColor: 'rgba(0, 0, 0, .05)'
  },
  calendarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    width: 100,
    padding: 10,
    marginRight: 5,
  }
})

function Footer({setSelected}){
  return (
    <View style={footerStyles.footer}>
      <View style={footerStyles.footerItems}>
        <Text style={footerStyles.skip}>Skip</Text>
        <Pressable style={footerStyles.nextBtn} onPress={() => setSelected('Where')}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Next</Text>
        </Pressable>
      </View>
    </View>
  )
}

const footerStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    borderRadius: 20,
  },
  footerItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: 20,
    marginTop: 5
  },
  skip: {
    textDecorationLine: 'underline',
    fontWeight: 'semibold',
    fontSize: 15
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 6,
    padding: 10,
    height: 40,
    width: 80,
  },
})