import { StyleSheet, Text, View,TextInput,TouchableOpacity, Dimensions,Alert,Pressable, SafeAreaView ,StatusBar,Image,Linking,ScrollView} from 'react-native'
import React from 'react'
import firebase from "firebase";

import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from '@expo/vector-icons';
import firebaseConfig from '../config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
}
const db = firebase.firestore();

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class ProfileDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          account:'',
          idea:'',
          gstNumber:'',
          angelInvestors:'',
          auditReports:'',
         proImg:'',
         ceo:'',
         name:'',
         email:'',

         selectedId_state:this.props.route.params.detailId['id']
        }
    }
   
    componentDidMount(){
        console.log(this.state.selectedId_state)
        this.getData();
            }
   
    getData=async()=>
    {


        var response=await db.collection("profiles").doc(this.state.selectedId_state).get();


console.log(response.data());
this.setState({
    account: response.data().account,
    idea: response.data().idea,
    gstNumber: response.data().gstNumber,
    ceo: response.data().ceo,
    angelInvestors: response.data().investores,
    name: response.data().name,
    auditReports: response.data().oditReports,
    proImg:response.data().profileImg,
    email:response.data().email,
 
})


console.log(response.data());


    }

  sendEmail = () => {
   
    Linking.openURL('mailto:'+this.state.email+'?body=Hi, I am interested in your idea, could we connect further?')

   
  };
 
 


    render(){
  return (
   <ScrollView style={{backgroundColor:'#4F7942',height:screenHeight}}>
    <View style={{flex:1,backgroundColor:'#4F7942'}}>
        <StatusBar hidden={true} translucent={true} />
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={{margin:10}}>
            <AntDesign name="leftcircleo" size={35} color="white"/></TouchableOpacity>
        <Text style = {styles.title}>Details</Text>
<Image
          style={styles.backgroundImage}
          source={{uri:this.state.proImg}}
          imageStyle={{ opacity: 0.5 }}
          />
           <Text style = {styles.name}>{this.state.name}</Text>
            <Text style = {styles.ceo}>{this.state.ceo}</Text>
             <Text style = {styles.ideaText}>Idea:</Text>
              <Text style = {styles.idea}>{this.state.idea}</Text>
            

         <Text style = {styles.investors}>AngelInvestors: </Text>
          <Text style = {{color:'white',marginLeft:20,}}>{this.state.angelInvestors}</Text>

           <View style={{flexDirection:'row',margin:20}}>
              <Text style = {styles.detailRow}>Account:{this.state.account}, </Text>
              <Text style = {styles.detailRow}>GST#:{this.state.gstNumber}, </Text>
               <Text style = {styles.detailRow}>Audit#:{this.state.auditReports}</Text>
              </View>
 <TouchableOpacity
                style={styles.button}
                onPress={()=>this.sendEmail()}>
                <Text style={styles.buttonText}>Interested</Text>
              </TouchableOpacity>

    </View>
    </ScrollView>

  )
  }
}

const styles = StyleSheet.create({
    title : {
        fontSize : RFValue(25),
       alignSelf : "center",
       color:'white'
        //marginTop : RFValue(40)
    },
    name:{
      alignSelf:'flex-start',
      marginLeft:20,
      fontSize:RFValue(20),
      color:'white',
      fontWeight:'bold',
    },
      ceo:{
      alignSelf:'flex-start',
      marginLeft:20,
      fontSize:RFValue(15),
      color:'white',
      // fontWeight:'bold',
    },
      ideaText:{
      alignSelf:'flex-start',
      marginLeft:20,
      fontSize:RFValue(15),
      color:'white',
      marginTop:10
    },
        idea:{
      alignSelf:'flex-start',
      textAlign:'left',
      marginLeft:20,
      fontSize:RFValue(12),
      color:'white'
    },

     detailRow:{
     
      
      
      fontSize:RFValue(12),
      color:'white'
    },
         investors:{
      alignSelf:'flex-start',
      textAlign:'left',
      marginLeft:20,
      fontSize:RFValue(12),
      fontWeight:'bold',
      color:'white',
      marginTop:20,
    },
    backgroundImage: {
   
    resizeMode: 'contain',
    height:250,
margin:10,

    width:screenWidth-20,
    borderRadius:20
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

})
