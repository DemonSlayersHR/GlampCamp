import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = ({
  campsite,
  loggedIn,
  setAvailabilityButtonClicked,
  dates,
  setDates,
}) => {
  loggedIn = loggedIn || true;

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [allowRangeSelection, setAllowRangeSelection] = useState(false);

  function disableSelectingPast(date) {
    const today = new Date();
    const availableDates = [];
    campsite.dates?.forEach((campDates) => {
      if (!campDates.reserved) {
        availableDates.push(
          new Date(campDates.date).toISOString().slice(0, 10)
        );
      }
    });
    return (
      date < today &&
      !availableDates.includes(new Date(date).toISOString().slice(0, 10))
    );
  }

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
    let stringDate = date._d.toISOString().slice(0, 10);
    return stringDate;
  };

  const onDateChange = (date) => {
    let string = convertToDateFormat(date);
    setDates([...dates, string]);
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={(date, startOrEnd) => {
          onDateChange(date, startOrEnd);
        }}
        allowRangeSelection={true}
        disabledDates={disableSelectingPast}
        selectedDayColor='#f7f7f7'
        // selectedRangeStyle="F4A259"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});

export default Calendar;
