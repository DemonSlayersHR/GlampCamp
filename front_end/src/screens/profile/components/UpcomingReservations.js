import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';


export default function UpcomingReservations ({hostCampsites}) {

  const [reservations, setReservations] = useState({})

  useEffect(() => {
    let currentReservations = {}
    hostCampsites.forEach((campsite) => {
      campsite.dates.forEach((date) => {
        if(date.reserved) {
          if (currentReservations[campsite.camp_name]) {
            currentReservations[campsite.camp_name].push(date.date)
          } else {
            currentReservations[campsite.camp_name] = [date.date]
          }
        }
      })
    })
    if (Object.keys(currentReservations).length) {
      setReservations(currentReservations)
    } else {
      setReservations({'No Upcoming Reservations': null})
    }
  }, [hostCampsites])


  return (
    <View style={styles.list}>
      {Object.keys(reservations).map((campsite, index) => (
        <View key={index}>
          <Text style={styles.listItemTextHead}>{campsite}</Text>
          {reservations[campsite] ?
            <Text style={styles.dates}>{reservations[campsite].join(',\n')}</Text>
          : null}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'stretch',
    alignItems: 'center',
  },
  dates: {
    padding: 10,
  },
  listItemTextHead: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});
