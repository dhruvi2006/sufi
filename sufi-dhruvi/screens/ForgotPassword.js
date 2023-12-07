import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');

  async function forgetpassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Email sent. Please do also check your spam');
        navigation.navigate('Login');
      })
      .catch((error) => {
        var errorMessage = error.message;
        Alert.alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity style={{alignSelf: "flex-start", margin: 10}} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Image
        source={require('../assets/Logo.png')}
        style={{ height: 170, width: 170, marginTop: screenheight/6.5,marginBottom: 30}}
      />
     
      <Text style={styles.title}>ForgotPassword</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={forgetpassword}>
        <Text style={styles.buttonText}>ForgetPassword</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e5014',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    marginTop: 26,
    marginBottom: 10,

    color: '#ffffff',

    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  button: {
    backgroundColor: '#567d4a',
    width: '60%',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  secure: {
    alignSelf: 'flex-end',
  },
});
