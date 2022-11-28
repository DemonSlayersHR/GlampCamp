import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { URL } from '../../../../config.js';

export default function RequestToBook({ campsite, navigation, dates }) {
  const { user, setUser } = useContext(UserContext);

  function getDaysArray(start, end) {
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
  }

  function Reserve() {
    let daylist = getDaysArray(new Date(dates[0]), new Date(dates[1]));

    if (user) {
      axios
        .post(`http://${URL}:3000/reservation`, {
          camp_id: campsite.camp_id,
          client_id: user.userInfo.user_id,
          dates: daylist,
        })
        .then((res) =>
          navigation.navigate('messaging', {
            reserve_id: res.data.reserve_id,
            user_type: 'client',
          })
        )
        .catch((e) => console.log('reservation error', e));
    }
  }

  return (
    <View>
      <Text style={{ fontSize: 12, marginBottom: 5, lineHeight: 14 }}>
        By selecting the button below, I agree to the{' '}
        <Text style={styles.decoration}>
          Host's House Rules, GlampCamp's Rebooking and Refund Policy,
        </Text>{' '}
        and that GlampCamp can{' '}
        <Text style={styles.decoration}>charge my payment method</Text> if I'm
        responsible for damage. I agree to pay the total amount shown if the
        Host accepts my booking request.
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 20, lineHeight: 14 }}>
        I also agree to the{' '}
        <Text style={styles.decoration2}>
          updated Terms of Service, Payments Terms of Service,
        </Text>{' '}
        and I acknowledge the{' '}
        <Text style={styles.decoration2}>Privacy Policy.</Text>
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            Reserve();
          }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 20 }}>
            Request to book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '90%',
    height: 60,
    borderRadius: 15,
    backgroundColor: '#e80050',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decoration: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  decoration2: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#5B8E7D',
  },
});
