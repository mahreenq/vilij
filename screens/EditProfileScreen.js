import React from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator, ImageBackground, TextInput, Dimensions } from 'react-native';
import Moment from 'react-moment';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class EditProfileScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 0,
      left: 0,
      right: 0
    },
    headerTintColor: '#fff'
  
  };

  render() {


    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <View style={styles.mainView}>
        <ImageBackground
        source={require('../assets/images/gradientbg.png')}
        style={styles.background}>

        <ScrollView>
        <View style={styles.mainContent}>
              <Text style= {styles.formHeading}> Edit Your Profile </Text>

              <View style={styles.form}>

                      <View style={{  flexDirection: 'row' ,justifyContent: 'space-around'}}>
                            
                            <TextInput
                            placeholder="Name"
                            style={styles.nameInput}
                            />
                      </View>

                      <View style={{  flexDirection: 'row' ,justifyContent: 'space-around', marginTop: 25}}> 
                              <TextInput
                              placeholder="Describe yourself as a parent (140 characters)"
                              style={styles.descInput}
                              multiline 
                              />
                      </View> 
  

                      <View style={{  flexDirection: 'row' ,justifyContent: 'space-around', marginTop: 25}}> 
                              <TextInput
                              placeholder="Street Address"
                              style={styles.addressInput}
                             
                              />
                      </View> 

                      

                      <View style={styles.postButton}>
                        <TouchableHighlight>
                          <View>
                            <Text 
                            style={styles.postText}>Done</Text>
                          </View>
                        </TouchableHighlight>
                    </View>

              </View>
          </View>
          </ScrollView>
          </ImageBackground>

      </View>
    );
  }
}


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default EditProfileScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center'
  },
  mainContent: {
    backgroundColor: 'rgba(	248, 233, 231, 0.85)',
    width: SCREEN_WIDTH*0.85,
    marginTop: 150,
    marginBottom: '10%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 20
  },
  form: {
    padding: 10
  },
 
  nameInput: {
    height: 50, 
    width: SCREEN_WIDTH*0.65, 
    backgroundColor  : 'rgba(	248, 233, 231,1)',
    borderRadius: 5,
    color: '#474973'
  },
  descInput: {
    height: 80, 
    width: SCREEN_WIDTH*0.65, 
    backgroundColor  : 'rgba(248, 233, 231, 1)',
    borderRadius: 5,
    color: '#474973'
  },
  addressInput: {
    height: 40, 
    width: SCREEN_WIDTH*0.65, 
    backgroundColor  : 'rgba(248, 233, 231, 1)',
    borderRadius: 5,
    color: '#474973'
  },

  postButton: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#474973',
    width: SCREEN_WIDTH*0.6
  },
  postText: {
    color: '#F8E9E7',
    fontSize: 20,
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  formHeading:{
    color: '#474973',
    fontSize: 20
  },
  formSubheadings: {
    color: '#474973',
    marginTop: 15,
  }

 
});

// <View style={{  flexDirection: 'row' ,justifyContent: 'space-around', marginTop: 25}}> 
//      <Text style= {styles.formSubheadings}> Children go here</Text>
//  </View> 