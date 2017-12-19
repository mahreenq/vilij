import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ChatScreen extends React.Component {
   static navigationOptions = {
    title: 'Chat',
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
    return (
      <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/gradientbg.png')}
        style={styles.background}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={{height: 40}}>
              <Text style={{marginTop: 300}}>CHAT SCREEN .. currently out of scope</Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
      background: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center'
      },
});
