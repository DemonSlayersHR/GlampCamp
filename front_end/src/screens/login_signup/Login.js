import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import logo from '../../../assets/glampcamp.jpeg';
function Login({ navigation }) {
  const navigate = () => {
    navigation.navigate('register');
  };

  const navigateHome = () => {
    navigation.navigate('homepage');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.ImageStyle}
          source={require('../../../assets/logo.png')}
        />
      </View>
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>Welcome {'\n'}Back</Text>
        <View style={styles.FormView}>
          <TextInput
            placeholder={'Email Address'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={navigateHome} style={styles.Button}>
            <Text style={styles.ButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={navigate} style={styles.TextButton}>
          <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopView: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '70%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ImageStyle: { width: '60%', height: '60%', resizeMode: 'contain' },
  Heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 60,
  },
  TextInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    height: 52,
    borderRadius: 10,
    color: '#fff',
    paddingLeft: 5,
    marginTop: 15,
  },
  FormView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  Button: {
    width: '90%',
    color: '#000',
    height: 52,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: { fontWeight: 'bold', fontSize: 18 },
  SignUpText: { color: 'grey' },
  TextButton: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Login;
