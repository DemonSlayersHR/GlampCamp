import { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import HostCampsite from './components/HostCampsite.js';
import AddCampsite from './components/AddCampsite.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpcomingReservations from './components/UpcomingReservations.js';
import Nav from '../../shared/nav/Nav.js';
import { URL } from '../../../config.js';
import { UserContext } from '../../context/UserContext.js';

export default function Host({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const user_id = user.userInfo.user_id;

  const [starCount, setStarCount] = useState(0);
  const [hostCampsites, setHostCampsites] = useState([]);
  const [hostInfo, setHostInfo] = useState({});

  const [displayAddCampsite, setDisplayAddCampsite] = useState(false);
  const [displayHostCampsites, setDisplayHostCampsites] = useState(true);
  const [displayUpcomingReservations, setDisplayUpcomingReservations] =
    useState(false);

  useEffect(() => {
    getHostCampsites();
    getHostInfo();
  }, [user_id]);

  function getHostCampsites() {
    axios
      .get(`http://${URL}:3000/campsites/?host_id=${user_id}`)
      .then((response) => {
        setHostCampsites(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getHostInfo() {
    axios
      .get(`http://${URL}:3000/user/?user_id=${user_id}`)
      .then((response) => {
        setHostInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.userWelcome}>
          <View style={styles.userInfo}>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>
                'Sup,{' '}
                <Text style={{ textTransform: 'capitalize' }}>
                  {hostInfo.first_name}
                </Text>
                !
              </Text>
              <Text>{hostInfo.location}</Text>
            </View>
            <View style={styles.profilePictureContainer}>
              <Image
                source={{
                  uri:
                    hostInfo.user_photo ||
                    'https://i.postimg.cc/gjFHrzW3/image-4.png',
                }}
                resizeMode={'cover'}
                style={styles.profilePicture}
              />
            </View>
          </View>
        </View>

        <View>
          <View style={styles.dropDown}>
            <TouchableOpacity
              style={styles.dropDownText}
              onPress={() => {
                setDisplayUpcomingReservations(!displayUpcomingReservations);
              }}>
              <Text style={styles.title}>Upcoming Reservations</Text>
              {displayUpcomingReservations ? (
                <Icon name='angle-up' size={30} />
              ) : (
                <Icon name='angle-down' size={30} />
              )}
            </TouchableOpacity>
          </View>

          {displayUpcomingReservations ? (
            <UpcomingReservations hostCampsites={hostCampsites} />
          ) : null}

          <View style={styles.dropDown}>
            <TouchableOpacity
              style={styles.dropDownText}
              onPress={() => {
                setDisplayAddCampsite(!displayAddCampsite);
              }}>
              <Text style={styles.title}>Add Campsites</Text>
              {displayAddCampsite ? (
                <Icon name='angle-up' size={30} />
              ) : (
                <Icon name='angle-down' size={30} />
              )}
            </TouchableOpacity>
          </View>

          {displayAddCampsite ? (
            <AddCampsite
              host_id={user_id}
              getHostCampsites={getHostCampsites}
              setHostCampsites={setHostCampsites}
            />
          ) : null}

          <View style={styles.dropDown}>
            <TouchableOpacity
              style={styles.dropDownText}
              onPress={() => {
                setDisplayHostCampsites(!displayHostCampsites);
              }}>
              <Text style={styles.title}>Your Campsites</Text>
              {displayHostCampsites ? (
                <Icon name='angle-up' size={30} />
              ) : (
                <Icon name='angle-down' size={30} />
              )}
            </TouchableOpacity>
          </View>

          {displayHostCampsites
            ? hostCampsites.map((campsite, index) => (
                <HostCampsite
                  campsite={campsite}
                  key={index}
                  getHostCampsites={getHostCampsites}
                />
              ))
            : null}

          <View style={styles.dropDown}>
            <TouchableOpacity
              style={styles.dropDownText}
              onPress={() => {
                navigation.navigate('Campsites Visited/Plans to Visit', {
                  user_id: user_id,
                });
              }}>
              <Text style={styles.title}>Campsites Visited</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Nav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  greeting: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  greetingText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userWelcome: {
    // borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 15,
  },
  profilePicture: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  profilePictureContainer: {
    paddingRight: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDown: {
    padding: 15,
    // borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dropDownText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginBottom: 80,
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {},
});
