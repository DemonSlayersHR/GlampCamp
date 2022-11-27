import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import { URL } from '../../../../config.js';

const Calendar = ({ campsite, loggedIn }) => {
  loggedIn = loggedIn || true;

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [allowRangeSelection, setAllowRangeSelection] = useState(false);
  const [dates, setDates] = useState([]);

  const getDaysArray = (start, end) => {
    for (
      var arr = [
          new Date(start - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        ],
        dt = new Date(start);
      dt < new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().slice(0, 10));
    }
    return arr;
  };

  // change to date format yyyy-mm-dd for axios post request
  const convertToDateFormat = (date) => {
    let stringDate =
      date._i.year +
      '-' +
      (Number(date._i.month) + 1).toString() +
      '-' +
      (Number(date._i.day) + 1).toString();
    return stringDate;
  };

  const onDateChange = (date) => {
    let string = convertToDateFormat(date);
    setDates([...dates, string]);
  };

  const reserveDates = () => {
    if (dates.length === 2) {
      var daylist = getDaysArray(new Date(dates[0]), new Date(dates[1]));
      setDates(daylist);
      axios
        .post(`http://${URL}:3000/reservation`, {
          camp_id: campsite.camp_id,
          client_id: 3,
          dates: daylist,
        })
        .then((results) => {
          console.log(
            'results from successful axios request to add a reservation',
            results
          );
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        // selectedRangeStyle="F4A259"
      />
      <Button title='Reserve Dates' color='#BC4B51' onPress={reserveDates} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

export default Calendar;
