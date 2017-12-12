import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <View>
          <View>
            <Button
              title="Sign up"
              buttonStyle={styles.buttonStyle}
              onPress={this.props.onCompleteSignup}
            />
          </View>
          <View>
            <Button
              title="Log in with Facebook"
              buttonStyle={styles.buttonStyle}
              onPress={this.props.onComplete}
            />
          </View>
          <View style={styles.termsConditionsContainer}>
            <Text style={styles.termsConditionsTitle}>
              By continuing you agree to our&nbsp;
            </Text>
            <Text style={styles.underline}> Terms and Conditions</Text>
          </View>
        </View>
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View key={slide.text}>
          <View
            key={slide.text}
            style={[styles.slideStyle, { backgroundColor: slide.color }]}
          >
            <Image
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center'
              }}
              source={slide.img}
            />
            {/* <Text style={styles.textStyle}>{slide.text}</Text> */}
            <View style={styles.buttonContainer}>
              {this.renderLastSlide(index)}
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#474973',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25
  },
  buttonContainer: {
    marginTop: 500
  },
  termsConditionsContainer: {
    marginTop: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  termsConditionsTitle: {
    color: '#474973'
  },
  underline: {
    color: '#474973',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
};

export default Slides;
