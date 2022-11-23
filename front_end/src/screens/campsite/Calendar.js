import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = () => {

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [allowRangeSelection, setAllowRangeSelection] = useState(false);
  const [selectedDayColor, setSelectedDayColor] = useState('');
  const [todayBackgroundColor, setTodayBackgroundColor] = useState('');
  const [selectedRangeStartTextStyle, setSelectedRangeStartTextStyle] = useState({});
  const [selectedRangeEndTextStyle, setSelectedRangeEndTextStyle] = useState({});
  // const [selectedRangeStyle, setSelectedRangeStyle] = useState(viewStyle);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);

  const onDateChange = (d: dateTime) => {
    // setSelectedDayColor('blue');
    console.log(d);
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        // onDateChange={selectedStartDate}
      />

      {/* <View>
        <Text>SELECTED DATE:{ selectedStartDate }</Text>
      </View> */}
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