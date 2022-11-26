import { useState, useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import axios from 'axios';

export default function AvailabilityModal ({campsite, getHostCampsites, modalVisible, setModalVisible}) {

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const [customDatesStyles, setCustomDatesStyles] = useState([])

  useEffect(() => {
    createCustomDatesStyle(campsite)
  }, [campsite])

  const createCustomDatesStyle = (campsite) => {
    const newCustomDatesStyles = [];
    campsite.dates?.forEach((date) => {
      newCustomDatesStyles.push({
        date: date.date,
        // style: {backgroundColor: '#eee'},
        textStyle: date.reserved ? {fontWeight: 'bold', color: 'red'} : {fontWeight: 'bold', color: 'blue'}
      })
    })
    setCustomDatesStyles(newCustomDatesStyles);
  }

  const onDateChange = (date, startOrEnd) => {
    let string = null;
    if (date) {
      string = date._d.toISOString().slice(0,10);
    }
    if (startOrEnd === 'START_DATE') {
      setSelectedStartDate(string)
    } else {
      setSelectedEndDate(string)
    }
  }

  const getDaysArray = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    arr = arr.map((v)=>v.toISOString().slice(0,10))
    return arr;
  };

  const addAvailableDates = () => {
    if (selectedStartDate && selectedEndDate) {
      let daylist = getDaysArray(new Date(selectedStartDate),new Date(selectedEndDate));
      axios.post(`http://192.168.1.3:3000/campsites/dates`, {
        camp_id: campsite.camp_id,
        dates: daylist
      })
        .then(getHostCampsites)
        .catch((err) => {console.log(err)})
    } else {
      Alert.alert('Alert', 'must select start and end date' )
    }
  }

  const removeAvailableDates = () => {
    if (selectedStartDate && selectedEndDate) {
      let daylist = getDaysArray(new Date(selectedStartDate),new Date(selectedEndDate));
      axios.delete(`http://192.168.1.3:3000/campsites/dates`, { data: {
        camp_id: campsite.camp_id,
        dates: daylist
      }})
        .then(getHostCampsites)
        .catch((err) => {console.log(err)})
    } else {
      Alert.alert('Alert', 'must select start and end date' )
    }
  }

  const disableSelectingPast = (date) => {
    const today = new Date()
    return date < today
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <CalendarPicker
            onDateChange={(date, startOrEnd) => onDateChange(date, startOrEnd)}
            // disabledDates={disableSelectingPast}
            allowRangeSelection={true}
            textStyle={{color: 'black'}}
            // todayTextStyle={{color: 'red'}}
            todayBackgroundColor='none'
            customDatesStyles={customDatesStyles}
          />

          <View style={styles.buttonList}>
            <TouchableOpacity
              style={styles.button}
              onPress={addAvailableDates}
            >
              <Text style={styles.textStyle} > Add Dates</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={removeAvailableDates}
            >
              <Text style={styles.textStyle} > Remove Dates </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle} > Hide Calendar </Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eee',
    padding: 10,
    elevation: 2,
    // backgroundColor: "#2196F3",
  },
  textStyle: {
    // color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})