import React, { useState } from 'react';
import axios from 'axios';
import {
  Text,
  StyleSheet,
  Button,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackArrow from 'react-native-vector-icons/Feather';
// import { authentication } from '../../../../Firebase/firebase.js';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { URL } from '../../../../config.js';
// import bcrypt from 'bcryptjs';

const formState = {
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  location: '',
  user_photo: '',
};

import AddPhotosCloudinary from '../../profile/components/AddPhotosCloudinary.js';

// const salt = bcrypt.genSaltSync(10);
const Register = ({ navigation }) => {
  const [signUpForm, setSignUpForm] = useState(formState);

  const navigate = () => {
    navigation.navigate('login');
  };

  //Uncomment for google sign in option
  // const signInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(authentication, provider)
  //     .then((re) => {
  //       console.log(re);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleUserRegister = () => {
    // const hashedPassword = bcrypt.hashSync(signUpForm.password, salt);
    let query = {
      username: signUpForm.username,
      first_name: signUpForm.first_name,
      last_name: signUpForm.last_name,
      password: signUpForm.password,
      location: signUpForm.location,
      user_photo: '',
    };
    // console.log(JSON.stringify(query));
    axios
      .post(`http://${URL}:3000/user`, query)
      .then((res) => {
        // console.log(res.data);
        // console.log(`http://${URL}:3000/user?user_id=${res.data.user_id}`);
        // axios
        //   .get(`http://${URL}:3000/user?user_id=${res.data.user_id}`)
        //   .then((res) => console.log(res))
        //   .catch((error) => {
        //     console.log(error);
        //   });
      })
      .catch((error) => console.log(error));
    setSignUpForm(formState);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.ImageStyle}
          source={require('../../../../assets/logo.png')}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <BackArrow
          onPress={navigate}
          style={styles.Icon}
          name='chevron-left'
          size={60}
          color={'#fff'}></BackArrow>
        <Text style={styles.Heading}>Create {'\n'}Account</Text>
        <View style={styles.FormView}>
          <TextInput
            onChangeText={(newText) =>
              setSignUpForm({ ...signUpForm, first_name: newText })
            }
            value={signUpForm.first_name}
            placeholder={'First Name*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(newText) =>
              setSignUpForm({ ...signUpForm, last_name: newText })
            }
            value={signUpForm.last_name}
            placeholder={'Last Name*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(newText) =>
              setSignUpForm({ ...signUpForm, username: newText })
            }
            value={signUpForm.username}
            placeholder={'Username*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(newText) =>
              setSignUpForm({ ...signUpForm, location: newText })
            }
            value={signUpForm.location}
            placeholder={'Street Address*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(newText) =>
              setSignUpForm({ ...signUpForm, password: newText })
            }
            value={signUpForm.password}
            placeholder={'Password*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
          />
          <TextInput
            placeholder={'Confirm Password*'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
            secureTextEntry={true}
          />

          <AddPhotosCloudinary
            signUpForm={signUpForm}
            setSignUpForm={setSignUpForm}
            formType={'register'}></AddPhotosCloudinary>

          {/* <Text style={styles.ButtonText}>Upload Profile Photo</Text> */}

          <TouchableOpacity onPress={handleUserRegister} style={styles.Button}>
            <Text style={styles.ButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '80%',

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
    marginTop: 5,
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
  PhotoUploadProfile: {
    display: 'flex',
    width: '50%',
    height: 52,
    backgroundColor: '#5B8E7D',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Icon: {
    marginLeft: 5,
    marginTop: 10,
  },
});
export default Register;