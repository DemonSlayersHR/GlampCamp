import {
  TouchableOpacity,
  Button,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { CheckBox } from '@rneui/themed';
import CampsiteInfo from './components/CampsiteInfo';
import RequestToBook from './components/RequestToBook';
import YourTrip from './components/YourTrip';
import { UserContext } from '../../context/UserContext.js';
import axios from 'axios';
import { URL } from '../../../config.js';

export default function Reservation({ route, navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { campsite, dates, guests } = route.params;
  const [checked, setChecked] = useState(false);

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    arr = arr.map((v) => v.toISOString().slice(0, 10));
    return arr;
  };

  function Dates() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    if (dates.length > 1) {
      let start = `${months[dates[0]?.split('-')[1] - 1]} ${
        dates[0]?.split('-')[2]
      }`;
      let end = `${months[dates[1]?.split('-')[1] - 1]} ${
        dates[1].split('-')[2]
      }`;

      if (start.split(' ')[0] === end.split(' ')[0]) {
        return `${start.split(' ')[0]} ${start.split(' ')[1]} - ${
          end.split(' ')[1]
        }`;
      } else {
        return `${start} - ${end}`;
      }
    } else {
      return 'Select dates';
    }
  }

  const [host, setHost] = useState(null);
  const [messageHost, setMessageHost] = useState('');

  useEffect(() => {
    axios
      .get(`http://${URL}:3000/campsites?camp_id=${campsite.camp_id}`)
      .then((res) => {
        axios
          .get(`http://${URL}:3000/user?user_id=${res.data[0].host_id}`)
          .then((res) => {
            console.log(res.data);
            setHost(res.data);
          })
          .catch((e) => console.log('setHost error', e));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box}>
          <CampsiteInfo campsite={campsite} />
        </View>

        <View style={styles.box}>
          <Text>Your booking is protected by Sean McCodes</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Your trip</Text>
          <YourTrip campsite={campsite} Dates={Dates} />
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Travel Insurance</Text>
          <CheckBox
            checked={checked}
            title={'Add travel insurance for $200'}
            onPress={() => setChecked(!checked)}>
            onChange
          </CheckBox>
          <Text style={styles.insuranceText}>
            {`Get reimbursed if you need to cancel due \nto illness, travel delays, and more.`}
          </Text>
          <Text> </Text>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: true, fontWeight: 'bold' }}>
              What's Covered
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Message the Host</Text>
          <Text style={{ fontWeight: '750' }}>
            Let the Host know why you're traveling and when you'll check in.
          </Text>
          <View style={styles.hostInfo}>
            <Image
              source={{
                uri: host?.user_photo,
              }}
              resizeMode={'cover'}
              style={styles.profilePicture}
            />
            <View style={{ marginLeft: 10, marginTop: 7 }}>
              <Text style={{ fontWeight: 'bold' }}>{host?.first_name}</Text>
              <Text>Joined in 2022</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              borderWidth: 1,
              borderRadius: 7,
              borderColor: 'rgba(158, 150, 150, .9)',
              height: 100,
            }}>
            <TextInput
              style={{ margin: 10 }}
              placeholderTextColor='gray'
              placeholder='Hello! I will be visiting...'></TextInput>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Price details</Text>
          <View style={styles.flexLeftRight}>
            <Text>
              ${campsite.price} x {getDaysArray(dates[0], dates[1]).length}{' '}
              nights
            </Text>
            <Text>
              ${campsite.price * getDaysArray(dates[0], dates[1]).length}
            </Text>
          </View>
          <View style={styles.flexLeftRight}>
            <Text>Cleaning fee (1%)</Text>
            <Text>
              ${campsite.price * getDaysArray(dates[0], dates[1]).length * 0.01}
            </Text>
          </View>
          <View style={styles.flexLeftRight}>
            <Text>Service fee (10%)</Text>
            <Text>
              ${campsite.price * getDaysArray(dates[0], dates[1]).length * 0.1}
            </Text>
          </View>
          {checked ? (
            <View style={styles.flexLeftRight}>
              <Text>Travel Insurance</Text>
              <Text>$200</Text>
            </View>
          ) : null}
          <View style={styles.flexLeftRight}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Total(USD)</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
              $
              {checked
                ? Math.round(
                    campsite.price *
                      getDaysArray(dates[0], dates[1]).length *
                      1.11
                  ) + 200
                : Math.round(
                    campsite.price *
                      getDaysArray(dates[0], dates[1]).length *
                      1.11
                  )}
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <RequestToBook
            campsite={campsite}
            navigation={navigation}
            dates={dates}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 5,
  },
  image: {
    width: 130,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  flexLeftRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
  },
  insuranceText: {
    fontSize: 15,
    fontWeight: '695',
  },
  hostInfo: {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: -10,
    flexDirection: 'row',
    padding: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
