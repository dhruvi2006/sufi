import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import firebaseConfig from '../config';
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const db=firebase.firestore();
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser ? firebase.auth().currentUser.email : "",
      firstName: "",
      docId: '',
      image: '',
      email: firebase.auth().currentUser ? firebase.auth().currentUser.email : "",
    };
  }
signoutUser = () => {
    Alert.alert(
      "Sign Out?",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => this.handleSignOut(),
        },
      ],
      { cancelable: false }
    );
  };

  handleSignOut = () => {
    try {
      firebase.auth().signOut().then(() => {
        Alert.alert("Signed out successfully!");
        this.props.navigation.replace("FlashScreen");
      }).catch((error) => {
        console.log(error);
        Alert.alert("An error occurred. Please try again later.");
      });
    } catch (e) {
      console.log(e);
      Alert.alert("An error occurred. Please try again later.");
    }
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Result', result.assets[0].uri);

    if (!result.cancelled) {
      this.setState({ image: result.assets[0].uri }); 
      this.uploadImage(result.assets[0].uri);
    }
  };

  uploadImage = async (imageUri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      await firebase
        .storage()
        .ref()
        .child('usersP/' + this.state.email)
        .put(blob);

      this.fetchImage();
    } catch (error) {
      console.log(error);
    }
  };

  fetchImage = async () => {
    try {
      const url = await firebase
        .storage()
        .ref()
        .child('usersP/' + this.state.email)
        .getDownloadURL();
      this.setState({ image: url });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.fetchImage();
    this.getUserDetails();
  }

  getUserDetails = () => {
    db.collection("users")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            firstName: doc.data().name,
            docId: doc.id,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  };



 


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', }}>
      <View style={{backgroundColor:'#4F7942',borderWidth:1,borderBottomLeftRadius:20,borderBottomRightRadius:20,borderColor:'white'}}>
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'white'}}> Your Profile</Text>
        <TouchableOpacity onPress={this.pickImage} style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 80, borderWidth: 2, borderColor: 'white', margin: 15 }}
          />
        </TouchableOpacity>
        <View style={{alignItems:'center',alignContent:'center'}}>
          <Text style={styles.userInfoText}>{this.state.firstName}</Text>
          <Text style={styles.userInfoText2}>{this.state.userId}</Text>
        </View>
        </View>
        <View style={styles.menuContainer}>
         <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold'}}>About SUFI</Text>
       
          <Text style={{ textAlign: 'center', fontSize: 12}}>
            Sufi is to work as a mediator between the Company and Investor.
          </Text>

          
          <Text style={{ textAlign: 'center', fontSize: 10 ,margin:10}}>
            Our app is designed to facilitate seamless communication and collaboration between companies and investors. Whether you're a forward-thinking company seeking investment or an investor looking for promising opportunities, Sufi provides a secure and efficient platform for meaningful connections. Discover a new era of collaboration with Sufi, where innovative ideas meet strategic investment, fostering growth and success for both companies and investors.
          </Text>
         
         
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.signoutUser()}
          >
            <Ionicons name="log-out-outline" size={27} color="#4F7942" />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 0.2,
    alignItems: "center",
    padding: 10,
  },
  userInfoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  userInfoText2: {
    fontSize: 12,
    color: "white",
    marginBottom:10,
  },
  menuContainer: {
    flex: 0.8,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#4F7942",
    paddingVertical: 10,
    paddingHorizontal: 5,
  marginTop:50
    
  },
  menuItemText: {
    color: "#4F7942",
    fontSize: 16,
    marginLeft: 10,
  },
});
