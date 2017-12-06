import React, { Component } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import styles from './styles';




const Parent = ({}) => {
    
     
    
        return (
          
        <View style ={styles.mainContainer} >
              <ScrollView>


              <Text> PARENT SCREEN</Text>
    
            </ScrollView>
     </View>
    
        
        )
        
     };

     export default Parent;

    //  Parent: {
    //   screen: Parent
    // },