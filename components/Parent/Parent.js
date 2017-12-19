import React, { Component } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo';
import { Gravatar, GravatarApi } from 'react-native-gravatar';
// import styles from './styles';

const Parent = ({ parent }) => {
  console.log(parent);

  // navigationOptions = {
  //   title: 'Parent'
  // };
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <LinearGradient
          style={[styles.mainContent]}
          colors={['#474973', '#ED808C']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.1, y: 1 }}
        >
          <View style={styles.content}>
            <View style={{ width: '20%' }}>
              <Gravatar
                options={{ email: parent.email }}
                style={styles.roundedProfileImage}
              />
            </View>
            <Text style={styles.name}> {parent.name}</Text>
            <Text style={styles.purpleFont}> - km away</Text>

            <View>
              <Text style={styles.purpleFont}> {parent.description}</Text>
            </View>
                    <View style={styles.allChildrenContainer} >
                      {parent.children.map((child)=>{
                              return ( 
                                <View key= {child._id} style={styles.childContainer}>
                                    <Image
                                    style={styles.childImg}
                                    source={
                                      child.gender === "Female"
                                        ? require('../../assets/images/girl.png')
                                        : require('../../assets/images/boy.png')
                                    }
                                  />
                                  <Text style={styles.purpleFont} > {child.name} </Text>
                                  <Text style={styles.purpleFont}> {child.age} years </Text>
                              </View>
                            );
                            }) }
                     
                    </View>
                    <Text style={styles.description} > - Mutual Vilijers</Text>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                      <Text style= {styles.help}> {parent.whoYouHelped.length} Sits Offered </Text>
                      <Text style= {styles.help}> {parent.whoHelpedYou.length} Sits Received</Text>
                    </View>

                    <View style={styles.postButton}>
                      <TouchableHighlight>
                        <View>
                          <Text 
                          // onPress={() =>
                          //   navigate('ChatScreen')
                          // }
                          style={styles.postText}>Start a Chat</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                  </View>
              </LinearGradient>
             </ScrollView>
          </View> 
          )
      };



export default Parent;

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
    height: SCREEN_HEIGHT
  },
  content: {
    marginTop: 55,
    paddingTop: 40,
    backgroundColor: 'rgba(248, 233, 231, 0.7)',
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.85,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  title: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 15
  },
  name: {
    fontSize: 22,
    backgroundColor: 'transparent',
    marginBottom: 5,
    color: '#422B4A',
    
  },
  description: {
    fontSize: 15,
    backgroundColor: 'transparent',
    color: '#422B4A',
    paddingTop: 10,
    paddingBottom: 10
  },
  whiteBorderBottom: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    width: SCREEN_WIDTH * 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  roundedProfileImage: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35
  },
  childImg:{
    width: 60,
    height: 60
  },
  childContainer:{
    flexDirection: 'column',
    alignItems:'center'
  },
  allChildrenContainer:{
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 30,
    width: SCREEN_WIDTH*0.7,
  },
  help:{
    fontSize: 18,
    backgroundColor: 'transparent',
    marginTop: 15,
    marginBottom: 5,
    color: '#422B4A',
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
      
    
    });
