import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = () => {

const [selectedStartDate, setSelectedStartDate] = useState('');

  const onDateChange = (date) => {
    setSelectedStartDate(date);
    // change the date a different color afer reservation is confirmed
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={selectedStartDate}
      />

      <View>
        <Text>SELECTED DATE:{ selectedStartDate }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

export default Calendar;