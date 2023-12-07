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
  KeyboardAvoidingView,
  FlatList,Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import firebase from 'firebase';
import firebaseConfig from '../config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
}
const db = firebase.firestore();
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
     profiles:[]
    };
  }

   componentDidMount(){
       
        this.getProfiles();
    }

    getProfiles = () => {
        const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection('profiles').onSnapshot((snapshot) => {
      var allP = [];
      snapshot.docs.map((doc) => {
        var profile = doc.data();
        profile.id = doc.id;
        allP.push(profile);
      })
      this.setState({ profiles: allP });
     
    });
    }

         handleDelete = (profileId) => {
        Alert.alert(
          'Delete profile',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => this.deleteProfile(profileId),
            },
          ],
          {cancelable: false},
        );
      };

          deleteProfile= async(id)=>{
       await db.collection('profiles').doc(id).delete().then(() => {
          alert("Profile successfully deleted!");
         
      }).catch((error) => {
          alert("Something went wrong!Try later");
      });
      this.getProfiles()
      }

      emptylist=()=>{
        return(
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
      <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}} > No profiles at the moment.Please switch to the next tab to make a create a profile.</Text>
      </View>
        ) 
      }

      renderItem = ({item}) => {    
return(

 
        
      
            
 <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileDetail", {detailId : item})}>
                <View style = {{flex:1,width:'90%',height:200,margin:15,alignSelf:'center',borderColor:'white',borderWidth:2,borderRadius:10}}>
                 <ImageBackground
          style={styles.backgroundImage}
          source={{uri:item.profileImg}}
          imageStyle={{ opacity: 0.5 }}
          >
          { firebase.auth().currentUser.uid == item.uid?
                    <View>
          
                   <TouchableOpacity style = {{alignSelf : 'flex-end', marginTop : RFValue(5),
                    marginRight : RFValue(10)}}
                    onPress={()=>{this.handleDelete(item.id)}}>
                        <MaterialIcons name="delete" size={23} color="red" />
                    </TouchableOpacity>
                    </View>: ''}
           
      
                    <Text style = {{
                        fontSize : RFValue(15),
                     fontWeight:'bold',
                     alignSelf:'flex-start',
                     marginTop:5,
                     color:'white',
                     backgroundColor:'darkgreen',
                     borderWidth:1,
                     borderRadius:20,
                     borderColor:'white',
                     padding:10
                     
                    }}>Firm : {item.name}</Text>
                    <Text style = {{
                        fontSize : RFValue(15),
                         alignSelf:'flex-start',
                     marginTop:5,
                     color:'white',
                     padding:10,
                    }}>CEO : {item.ceo}</Text>
                        
   </ImageBackground>
                </View>
                </TouchableOpacity>
            
   
 
       
    
)  
     
           


            
        
            
        

    }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
      
        <SafeAreaView style={styles.droidSafeArea} />
        <Image
          source={require('../assets/Logo.png')}
          style={{
            height: 80,
            width: 80,
            margin: 20,
            alignSelf:'center'
          
          }}
        />
      
       <View style = {{flex : 0.90}}>
                   
                        <FlatList 
                        ListEmptyComponent={()=>this.emptylist()}
                        scrollEnabled
                        data = {this.state.profiles}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index)=>index.toString()}/> 
                </View>
        
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
    backgroundImage: {
   
    resizeMode: 'contain',
    height:195,

    width:'100%'
  },

  droidSafeArea: {
    marginTop:
      Platform.OS == 'android' ? StatusBar.setHidden(true) : RFValue(0),
  },
 
});
