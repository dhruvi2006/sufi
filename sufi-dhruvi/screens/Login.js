import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import firebaseConfig from '../config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
}
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  changeSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        navigation.navigate('Home');
        Alert.alert('Welcome Back');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={{ height: 150, width: 150 }}
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View
        style={{
          flexDirection: 'row',
          width: screenWidth,
          justifyContent: 'center',
          marginLeft: 15,
        }}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input2}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity style={styles.secure} onPress={changeSecureTextEntry}>
          {secureTextEntry ? (
            <Entypo name="eye-with-line" size={20} color="white" />
          ) : (
            <Entypo name="eye" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginRight: 40 }}
        onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={{ fontSize: 13, color: 'white' }}>ForgotPassword</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{ marginTop: 10 }}>
        <Text style={{ color: 'white' }}>New User? Click here.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e5014',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    marginBottom: 10,
    color: '#ffffff',
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  input2: {
    height: 40,
    borderColor: 'gray',
    marginBottom: 10,
    color: '#ffffff',
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginLeft: 15
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
    marginBottom: 15,
    marginLeft: 8
  },
});
