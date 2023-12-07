import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import firebaseConfig from '../config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}

export default class Loading extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        this.props.navigation.navigate('BottomTab');
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        this.props.navigation.navigate('FlashScreen');
        // ...
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: RFValue(1),
    justifyContent: 'center',
  },

  droidSafeArea: {
    marginTop:
      Platform.OS == 'android' ? StatusBar.setHidden(true) : RFValue(0),
  },

  text: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#234152',
  },
});
