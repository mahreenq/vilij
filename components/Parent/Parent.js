import React, { Component } from 'react';
import { FlatList, Platform,  StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
// import styles from './styles';


const Parent = ({parent}) => {
console.log(parent);
  
  // navigationOptions = {
  //   title: 'Parent'
  // };
        return (
        <View style ={styles.mainContainer} >
           <ScrollView>
           <LinearGradient
                  style={[
                    styles.mainContent,
                  ]}
                  colors={['#474973', '#ED808C']}
                  start={{ x: 0, y: 0.1 }} 
                  end={{ x: 0.1, y: 1 }}
                  >
                    <Text style={styles.name}> {parent.name}</Text>
                    <Text style={styles.description}> {parent.description}</Text>
                    <Text> {parent.children.length} Child</Text>
              </LinearGradient>
             </ScrollView>
          </View> 
          )
      };

     export default Parent;

    //  Parent: {
    //   screen: Parent
    // },




    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
      },
      title: {
          fontSize: 30,
          color: 'white',
          backgroundColor: 'transparent',
          textAlign: 'center',
          marginBottom: 16,
          paddingTop: 15,
        },
      name: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        marginBottom: 5
      },
      description: {
          fontSize: 15,
          color: 'white',
          backgroundColor: 'transparent',
          marginBottom: 16
        },
      parentsList:{
          backgroundColor: 'transparent',
          width: '85%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom : 15,
      },
      roundedProfileImage: {
          width:60, 
          height:60, 
          borderWidth:1,
          borderColor:'white', 
          borderRadius:30,
        },
    
        flexOne: {
            flex: 1,
        }
    
    });