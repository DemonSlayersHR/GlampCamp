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
    host && <View style={styles.container}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
       <View >
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Hosted by {host && `${host?.first_name} ${host.last_name}`}
        </Text>
        <Text style={{color: 'gray'}}>
          Joined in 2022.
        </Text>
       </View>
       <View>
        <Image source={{uri: host?.user_photo}} style={{height: 50, width: 50, borderRadius: 500, resizeMode: 'cover'}}/>
       </View>
    </View>
    <Text style={{fontWeight: '600', marginBottom: 5}}>{host?.first_name} is a Superhost.</Text>
    <Text style={{marginBottom: 5}}>Superhosts are experienced, highly rated hosts who are comitted to providing great stays for guests.</Text>
    <Text>Response time: within a few hours</Text>
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
    <Text style={{fontSize: 12, color:'gray'}}>To protect your payment, never transfer money or communicate outside of the Glampcamp website or app.</Text>
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
    marginBottom:15,
  },
});
