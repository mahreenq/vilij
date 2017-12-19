import React from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator, ImageBackground, TextInput, Dimensions, Picker } from 'react-native';
import Moment from 'react-moment';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class EditChildScreen extends React.Component {
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
      <Text style= {styles.formHeading}> Edit Your Child's Information </Text>

      <View style={styles.form}>

      <Text style= {styles.formSubheadings} > Child's Name </Text>

              <View style={{  flexDirection: 'row' ,justifyContent: 'space-around'}}>
                    
                    <TextInput
                    style={styles.nameInput}
                    />
                    
              </View>

              <View style={styles.timeView}>

                  <View style={{  width: '50%'}}>
                        <Text style= {styles.formSubheadings}> Age </Text>
                        <TextInput
                        placeholder='7'
                         keyboardType='numeric'
                        style={styles.timeInput}
                        />
                    </View>

                    <View style={{  width: '50%'}} >
                        <Text style= {styles.formSubheadings}> Gender </Text>
                        <TextInput
                        placeholder='Male or Female'
                        style={styles.timeInput}
                        />
                  </View>

              </View>

             
              <View> 
                      <Text style= {styles.formSubheadings}> Favourite Activites</Text>
                      <TextInput
                    
                      style={styles.notesInput}
                      multiline 
                      />
              </View>
              <View> 
                      <Text style= {styles.formSubheadings}> Allergies</Text>
                      <TextInput
                    
                      style={styles.notesInput}
                      multiline 
                      />
              </View> 
              <View> 
                      <Text style= {styles.formSubheadings}> Medical Conditions</Text>
                      <TextInput
                    
                      style={styles.notesInput}
                      multiline 
                      />
              </View>
              <View> 
                      <Text style= {styles.formSubheadings}> Special Routine</Text>
                      <TextInput
                    
                      style={styles.notesInput}
                      multiline 
                      />
              </View>
              <View> 
                      <Text style= {styles.formSubheadings}> Additional Notes</Text>
                      <TextInput
                    
                      style={styles.notesInput}
                      multiline 
                      />
              </View>

              <View style={styles.postButton}>
                <TouchableHighlight>
                  <View>
                    <Text 
                    style={styles.postText}>Submit</Text>
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

export default EditChildScreen;

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
    marginTop: 100,
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
    textAlign: 'center',
    color: '#474973'
  },
  timeView:{
    flexDirection: 'row' ,
    justifyContent: 'space-between',
    //  width: SCREEN_WIDTH*0.7
  },
  timeInput: {
    height: 50, 
    // width: SCREEN_WIDTH*0.4, 
    marginRight: 5,
    backgroundColor  : 'rgba(248, 233, 231,1)',
    borderRadius: 5,
    textAlign: 'center',
    color: '#474973'
  },
  notesInput: {
    height: 80, 
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