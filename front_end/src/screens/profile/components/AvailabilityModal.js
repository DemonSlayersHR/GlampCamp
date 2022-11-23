import { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';

export default function AvailabilityModal ({modalVisible, setModalVisible}) {

  const [dates, setDates] = useState([]);

  const convertToDateFormat = (date) => {
    let stringDate = date._i.year + '-' + (Number(date._i.month) + 1).toString() + '-' + (Number(date._i.day) + 1).toString();
    return stringDate;
  }

  const onDateChange = (date) => {
    let string = convertToDateFormat(date);
    setDates([...dates, string]);
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
            onDateChange={onDateChange}
            allowRangeSelection={true}
          />

          <View style={styles.buttonList}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {}}
            >
              <Text style={styles.textStyle} > Add Dates</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {}}
            >
              <Text style={styles.textStyle} > Edit Dates </Text>
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
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})