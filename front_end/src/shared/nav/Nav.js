import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Nav({ navigation }) {
  const [selected, setSelected] = useState('Explore');

  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <IconFormat
          iconName='magnify'
          title='Explore'
          selected={selected}
          setSelected={setSelected}
          navigation={navigation}
        />
        <IconFormat
          iconName='heart-outline'
          title='Saved'
          selected={selected}
          setSelected={setSelected}
          navigation={navigation}
        />
        {user.userInfo ? (
          <>
            <IconFormat
              iconName='message-outline'
              title='Messaging'
              selected={selected}
              setSelected={setSelected}
              navigation={navigation}
            />
            <IconFormat
              iconName='account'
              title='User'
              selected={selected}
              setSelected={setSelected}
              navigation={navigation}
            />
          </>
        ) : (
          <IconFormat
            iconName='account'
            title='Log in'
            selected={selected}
            setSelected={setSelected}
            navigation={navigation}
          />
        )}
      </View>
    </View>
  );
}

function IconFormat({ iconName, title, selected, setSelected, navigation }) {
  function navigate() {
    setSelected(title);
    if (title === 'Explore') {
      navigation.navigate('homepage');
    }
    if (title === 'User') {
      navigation.navigate('user');
    }
    if (title === 'Log in') {
      navigation.navigate('login');
    }
    if (title === 'Saved') {
      // navigation.navigate('saved');
    }
    if (title === 'Messaging') {
      navigation.navigate('messaging');
    }
    if (title === 'Explore') {
      navigation.navigate('homepage');
    }
  }

  return (
    <Pressable style={styles.icon} onPress={navigate}>
      <Text>
        <Icon
          name={iconName}
          size={25}
          color={title === selected ? '#e80050' : '#757675'}
        />
      </Text>
      <View>
        <Text
          style={
            title === selected ? styles.iconTitleClicked : styles.iconTitle
          }>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ebebea',
    backgroundColor: 'white',
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 80,
    paddingLeft: 5,
    paddingTop: 10,
  },
  icon: {
    flex: 0.22,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconTitle: {
    fontSize: 12,
    color: '#757675',
  },
  iconTitleClicked: {
    fontSize: 12,
  },
});
