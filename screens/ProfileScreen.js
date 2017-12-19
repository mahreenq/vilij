import React from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchRequests, updateModal } from '../redux/modules/requests';
import { fetchNeeds } from '../redux/modules/calendar';
import { Gravatar, GravatarApi } from 'react-native-gravatar';
import Modal from 'react-native-modal';
import Moment from 'react-moment';

class ProfileScreen extends React.Component {
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
          style={styles.background}
        >

        <Text style={styles.viewProfile}> PROFILE SCREEN </Text>
      
  
        </ImageBackground>
    </View>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default ProfileScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    color: '#422B4A',
    backgroundColor: 'transparent',
    paddingBottom: 5
  },
  date: {
    fontSize: 15,
    color: '#422B4A',
    backgroundColor: 'transparent'
  },
  helped: {
    fontSize: 14,
    color: '#422B4A',
    backgroundColor: 'transparent'
  },
  requestsList: {
    backgroundColor: 'rgba(248, 233, 231, 0.5)',
    width: '90%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    margin: 5,
    marginLeft: 20,
    borderRadius: 15,
    padding: 20
  },
  roundedProfileImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30
  },
  postButton: {
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 125,
    marginBottom: 30,
    backgroundColor: '#474973',
    width: '80%'
  },
  postText: {
    color: '#F8E9E7',
    fontSize: 20,
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  modal: {
    borderRadius: 10,
    backgroundColor: '#f8e9e7',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalHeading: {
    fontSize: 20,
    color: '#474973',
    marginTop: '10%'
  },
  doneButton: {
    borderRadius: 50,
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#474973',
    width: '80%'
  },
  doneText: {
    fontSize: 20,
    color: '#f8e9e7',
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  viewProfile:{
    textAlign: 'left',
    fontSize: 20,
    color: '#422B4A',
    paddingTop: 10
  }
});
