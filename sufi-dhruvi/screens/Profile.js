import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Avatar } from 'react-native-elements';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import firebase from 'firebase';
import firebaseConfig from '../config';
import * as ImagePicker from 'expo-image-picker';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
}
const db = firebase.firestore();
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      companyName: ' ',
      ceo: ' ',
      companyIdea: ' ',
      date: ' ',
      investors: ' ',
      acc: ' ',
      gstNumber: ' ',
      oditReports: ' ',
      email:firebase.auth().currentUser.email,
      image: 'https://dummyimage.com/300x300/0a2602/fff.png&text=Photo',
         companyEmail:'',
    };
  }

   pickImage = async () => {
     if(this.state.companyName!= ' '){
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    

  console.log("Result",result.assets[0].uri);

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    
      this.uploadImage(result.assets[0].uri);
    }
      }
     else{
       alert("Please provide the company's name")
     }
    
  };

  uploadImage = async (imageUri) => {
   try{
    // var blobOb = await fetch(imageUri);
    // var blob = await blobOb.blob();
    const blob =await new Promise((resolve,reject)=>{
      const xhr=new XMLHttpRequest();
      xhr.onload=function(){
        resolve(xhr.response);
      }
      xhr.error=function(){
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType='blob';
      xhr.open('GET',imageUri,true)
      xhr.send(null)
    });
    return storageRef = firebase
      .storage()
      .ref().child('userss/'+this.state.companyName)
      .put(blob)
      .then(() => {
        this.fetchImage();
      })}
      catch(error)  {
        console.log(error);
      };
  };
  fetchImage = async () => {
    await firebase
      .storage()
      .ref().child('userss/'+this.state.companyName)
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  submitForm = () => {
    
    db.collection('profiles')
      .add({
        name: this.state.companyName,
        email:this.state.companyEmail,
        ceo: this.state.ceo,
        idea: this.state.companyIdea,
        date: this.state.date,
        investores: this.state.investors,
        account: this.state.acc,
        gstNumber: this.state.gstNumber,
        oditReports: this.state.oditReports,
        profileImg: this.state.image,
        uid:firebase.auth().currentUser.uid,
     

      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        alert('Successfully submitted')
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

    componentDidMount = () => {

      this.fetchImage();
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
      
        <SafeAreaView style={styles.droidSafeArea} />
        <Image
          source={require('../assets/Logo.png')}
          style={{
            height: 70,
            width: 70,
            margin: 20,
            alignSelf:'center'
          
          }}
        />
     
         <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View>
          
              <Text
                style={{
                  color: '#043927',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                Fill the required form
              </Text>

                  <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, color: '#ECFFDC', marginLeft: 8 }}>
              
                Company name:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Company name"
                onChangeText={(text) => {
                  this.setState({ companyName: text });
                }}
              />
            </View>
             <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, color: '#ECFFDC', marginLeft: 8 }}>
              
                Company Logo:
              </Text>
            </View>
        <Avatar
            containerStyle={{
              alignSelf: "center",
              width: 60,
              height:60,
              borderWidth:2,
              borderColor:'white',
              
            }}
            rounded
            source={{ uri: this.state.image }}
            size="small"
            onPress={() => {
              this.pickImage();
            }}
          />
        
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
              
                CEO:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="CEO"
                onChangeText={(text) => {
                  this.setState({ ceo: text });
                }}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
              
                CEO:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => {
                  this.setState({ companyEmail: text });
                }}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                Idea Behind The company:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={(text) => {
                  this.setState({ companyIdea: text });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                When was company started:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Date"
                onChangeText={(text) => {
                  this.setState({ date: text });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                Angel Investers:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="List them all"
                onChangeText={(text) => {
                  this.setState({ investors: text });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                Account Details:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Required"
                onChangeText={(text) => {
                  this.setState({ acc: text });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                GST number:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="GST number"
                onChangeText={(text) => {
                  this.setState({ gstNumber: text });
                }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: '#ECFFDC', marginLeft: 8 }}>
                
                Odit Reports:
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Last three years? Yes/No?"
                onChangeText={(text) => {
                  this.setState({ oditReports: text });
                }}
              />
            </View>
           <TouchableOpacity
                style={styles.button}
                onPress={()=>this.submitForm()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: RFValue(1),
   height:screenHeight,
   width:screenWidth,
    backgroundColor: '#4F7942',
  },

  droidSafeArea: {
    marginTop:
      Platform.OS == 'android' ? StatusBar.setHidden(true) : RFValue(0),
  },
  input: {
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    alignSelf:'center',
    width: '80%',
    padding: 5,
    color: '#1C352D',
    margin:10
   
  },

  button: {
    backgroundColor: '#567d4a',
    width: '40%',
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    marginBottom:60,
    alignSelf:'center',
    borderWidth:1,
    borderColor:'white',
    
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
