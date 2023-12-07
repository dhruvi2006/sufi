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
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const db=firebase.firestore();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  changeSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = () => {
    if (password != confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
    } else {
      // Redirect to login screen
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
  db.collection("users").add({
                      password : password,
                      email : email,
                      name : name,
                      uid:firebase.auth().currentUser.uid,
                  })
          Alert.alert('Success', 'User registered successfully.');
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={{ height: 150, width: 150 }}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
          style={styles.input}
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Already an user? click here</Text>
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
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    padding: 5,
    color: '#ffffff',
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
   // marginLeft: 8,
    marginTop: 9
  },
});
