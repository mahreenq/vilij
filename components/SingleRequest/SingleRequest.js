import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
// import styles from './styles';
import Moment from 'react-moment';

const SingleRequest = ({ request, offerButton, goBack }) => {
  // console.log(request);

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/gradientbg.png')}
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        >
          <View style={styles.content}>
            <View>
              {request.parents.map(parent => {
                return (
                  <View key={parent._id}>
                    <Text style={styles.purpleFontTitle} key={parent.name}>
                      {' '}
                      {parent.name} Needs Help{' '}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View>
              <Text style={styles.purpleHeadingFont}> Children</Text>
            </View>

            <View>
              {request.parents[0].children.map(child => {
                return (
                  <View style={styles.childContainer} key={child._id}>
                    <Image
                      style={styles.childImg}
                      source={
                        child.gender === 'Female'
                          ? require('../../assets/images/girl.png')
                          : require('../../assets/images/boy.png')
                      }
                      key={child.gender}
                    />
                    <Text style={styles.purpleFont} key={child.name}>
                      {' '}
                      {child.name}{' '}
                    </Text>
                    <Text style={styles.purpleFont} key={child.age}>
                      {' '}
                      {child.age} years{' '}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View>
              <Text style={styles.purpleHeadingFont}> Date</Text>
              <Moment
                format="MMMM D, YYYY "
                style={styles.purpleFont}
                element={Text}
              >
                {request.date.substr(0, 10)}
              </Moment>
            </View>

            <View>
              <Text style={styles.purpleHeadingFont}> Time</Text>
              <Text style={styles.purpleFont}> {request.time} </Text>
            </View>

            <View>
              <Text style={styles.purpleHeadingFont}> Location</Text>
              {request.parents.map(parent => {
                return (
                  <View key={parent._id}>
                    <Text style={styles.purpleFont} key={parent.address}>
                      {' '}
                      {parent.address}{' '}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View>
              <Text style={styles.purpleHeadingFont}> Additional Notes</Text>
              <Text style={styles.purpleFont}> {request.specialNotes} </Text>
            </View>

            <TouchableOpacity
              style={styles.offerHelpButton}
              // onPress={() => navigate('HomeScreen')}
              onPress={() => {
                offerButton(request._id, request.parents[0].name);
                goBack();
                // navigate('HomeScreen');
              }}
              underlayColor="#fff"
            >
              <View>
                <Text style={styles.buttonText}>Offer Help</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default SingleRequest;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center'
  },
  content: {
    marginTop: 110,
    marginLeft: 30,
    paddingTop: 20,
    backgroundColor: 'rgba(248, 233, 231, 0.95)',
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.8,
    flexDirection: 'column',
    borderRadius: 15
  },
  childImg: {
    width: 50,
    height: 50,
    paddingLeft: 30,
    paddingRight: 30
  },
  purpleHeadingFont: {
    color: '#422B4A',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20
  },
  purpleFont: {
    color: '#422B4A',
    paddingLeft: 40,
    paddingRight: 30
  },
  purpleFontTitle: {
    color: '#422B4A',
    paddingLeft: 20,
    paddingRight: 30,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 25
  },
  childContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  offerHelpButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#422B4A',
    borderRadius: 30,
    height: 40
  },
  buttonText: {
    color: '#F8E9E7',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 20,
    backgroundColor: 'transparent'
  }
});
