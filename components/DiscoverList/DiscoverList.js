import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View, Image, ScrollView,ActivityIndicator} from 'react-native';

import { Dimensions } from 'react-native';
// import styles from './styles';
import { LinearGradient } from 'expo';
import {Gravatar, GravatarApi} from 'react-native-gravatar';


 //import {goToParent} from '../../lib/NavigationHelpers';

const DiscoverList = ({parentsData , isLoading, navigation}) => {
   // console.log(this.props.navigation.navigate);
   console.log(navigation);
//    const {navigate} = navigation;

   handlePress = () => {
    navigation.navigate('Parent', {parentData: {item}});
  }

        return (
        <View  >
              <ScrollView>
                  <LinearGradient
                  style={[
                    styles.mainContent,
                  ]}
                  colors={['#474973', '#ED808C']}
                  start={{ x: 0, y: 0.1 }} 
                  end={{ x: 0.1, y: 1 }}
                  >
                  <Text style={styles.title}> Discover </Text>

              <FlatList
                data={parentsData}
                renderItem={( {item} )  => 
                    <View style={styles.parentsList}>

                        <View style={{width:'20%'}} >
                            <Gravatar options={{email: item.email,}}
                                style={styles.roundedProfileImage} />
                        </View>

                        <View style={{width:'75%', paddingLeft: 15}}>
                            <Text  style={styles.name} 
                            onPress={this.handlePress} 
                            > 
                            {item.name}  </Text>
                            <Text style={styles.description}> {item.description}  </Text>
                        </View>

                    </View>
                    }
                  keyExtractor={item => item.name}   /> 
                
                </LinearGradient>
            </ScrollView>
     </View>
    
        
        )
        
     };

     const styles = StyleSheet.create({
        mainContent: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around'
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

     export default DiscoverList;

    //  this.props.navigation.navigate('Parent')