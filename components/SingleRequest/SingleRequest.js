import React, { Component } from 'react';
import { FlatList, Platform,  StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
// import styles from './styles';
import Moment from 'react-moment';


const SingleRequest = ({request}) => {
console.log(request);
 
        return (
        <View style ={styles.mainView} >
           <ScrollView>
           <LinearGradient
                  style={[
                    styles.mainContent,
                  ]}
                  colors={['#474973', '#ED808C']}
                  start={{ x: 0, y: 0.1 }} 
                  end={{ x: 0.1, y: 1 }}
                  >

<View style ={styles.content}>

                    <View> 
                    {request.parents.map((parent)=>{
                              return ( 
                                <View  key={parent._id}>
                                  <Text style={styles.purpleFontTitle} key={parent.name}> {parent.name} Needs Help </Text>
                              </View>
                            );
                            }) }
                     
                    </View>

                    <View > 
                      <Text style={styles.purpleHeadingFont}> Children</Text> 
                    </View>

                    <View >
                      {request.parents[0].children.map((child)=>{
                              return ( 
                                <View style={styles.childContainer} key= {child._id} >
                                    <Image
                                    style={styles.childImg}
                                    source={
                                      child.gender === "Female"
                                        ? require('../../assets/images/girl.png')
                                        : require('../../assets/images/boy.png')
                                    }
                                  key = {child.gender}/>
                                  <Text style={styles.purpleFont} key={child.name}> {child.name} </Text>
                                  <Text style={styles.purpleFont}  key={child.age}> {child.age} years </Text>
                              </View>
                            );
                            }) }
                     
                    </View>


                    <View> 
                      <Text style={styles.purpleHeadingFont}> Date</Text> 
                      <Moment  format="MMMM D, YYYY " 
                              style={styles.purpleFont }
                               element={Text}  >
                                  {request.date}
                      </Moment>
                    </View>

                    <View> 
                      <Text style={styles.purpleHeadingFont}> Time</Text> 
                      <Text style={styles.purpleFont }> {request.time} </Text>
                    </View>

                    <View> 
                      <Text style={styles.purpleHeadingFont }> Location</Text> 
                      {request.parents.map((parent)=>{
                              return ( 
                                <View  key={parent._id}>
                                  <Text style={styles.purpleFont} key={parent.name}> {parent.address} </Text>
                              </View>
                            );
                            }) }
                     
                    </View>


                    <View> 
                      <Text style={styles.purpleHeadingFont }> Additional Notes</Text> 
                      <Text style={styles.purpleFont }> {request.specialNotes} </Text>
                    </View>


                    <TouchableOpacity
                              style={styles.offerHelpButton}
                            // onPress={() => navigate('HomeScreen')}
                              underlayColor='#fff'>
                              <View >
                                  <Text style={styles.buttonText}>Offer Help</Text> 
                              </View>
                    </TouchableOpacity>


</View>




              </LinearGradient>
             </ScrollView>
          </View> 
          )
      };

      
 

     export default SingleRequest;

     const SCREEN_WIDTH = Dimensions.get('window').width;
     const SCREEN_HEIGHT = Dimensions.get('window').height;



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: SCREEN_HEIGHT,
      },
      content: {
        marginTop: 55,
        paddingTop: 40,
        backgroundColor: 'rgba(248, 233, 231, 0.7)',
        width: SCREEN_WIDTH*0.85,
        height: SCREEN_HEIGHT*0.85,
        flexDirection: 'column',
        borderRadius:15,
      },
     
       
        childImg:{
            width: 50,
            height: 50,
            paddingLeft:30,
            paddingRight: 30,
        },
        purpleHeadingFont: {
          color: '#422B4A',
          fontWeight: 'bold',
          paddingLeft:30,
          paddingRight: 30,
          paddingTop: 20,
        },
        purpleFont: {
          color: '#422B4A',
          paddingLeft:40,
          paddingRight: 30,
        },
        purpleFontTitle :{
          color: '#422B4A',
          paddingLeft:20,
          paddingRight: 30,
          paddingTop: 10,
          textAlign: 'center',
          fontSize: 25,

        },
        childContainer: {
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10,
          },

          offerHelpButton:{
          marginRight:40,
          marginLeft:40,
          marginTop:20,
          paddingTop:10,
          paddingBottom:10,
          backgroundColor:'#422B4A',
          borderRadius:30,
          height: 40,
   
        },
        buttonText:{
            color:'#F8E9E7',
            textAlign:'center',
            fontSize: 20,
            borderRadius:20,
            backgroundColor:'transparent',
        }
    
    });
