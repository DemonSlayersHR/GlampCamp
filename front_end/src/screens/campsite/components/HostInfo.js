import { useEffect, useState, useContext } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { UserContext } from '../../../context/UserContext';
import { URL } from '../../../../config.js';
import axios from 'axios';

export default function HostInfo({ campsite, navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [host, setHost] = useState(null);

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
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        Hosted by {host && `${host.first_name} ${host.last_name}`}
      </Text>
      <Pressable
        style={styles.viewBtn}
        onPress={() => {
          if (Object.keys(user).length) {
            navigation.navigate('messaging', {
              user: user.userInfo,
              campsite: campsite,
              user_type: 'client',
            });
          } else {
            navigation.navigate('login');
          }
        }}>
        <Text>Contact Host</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  viewBtn: {
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
