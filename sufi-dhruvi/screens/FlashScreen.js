import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class FlashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/bg.png')}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.goText}>Get Started </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: RFValue(1),
    backgroundColor: 'white',
  },

  droidSafeArea: {
    marginTop:
      Platform.OS == 'android' ? StatusBar.setHidden(true) : RFValue(0),
  },

  backgroundImage: {
    flex: RFValue(1),
    resizeMode: 'cover',
    height: '100%',
    width: screenWidth,
  },

  loginButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 30,
    marginBottom: 10,
    borderRadius: 10,
    textalign: 'center',
    backgroundColor: '#567d4a',
    cursor: 'pointer',
    //marginBottom: 35,
  },
  goText: {
    color: 'white',
  },
});
