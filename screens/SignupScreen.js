import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  loginUser
} from '../redux/modules/auth.js';
import { Button, Spinner } from '../components/common';

import { LinearGradient } from 'expo';

class SignupScreen extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
    this.props.navigation.navigate('Home');
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>SIGN UP</Button>;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LinearGradient
          colors={['#474973', '#ed808c']}
          style={styles.linearGradient}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Vilij</Text>
            <Image
              style={styles.logo}
              source={require('../assets/images/Vilij_Logo.png')}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.containertwo}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />

              <Text style={styles.errorTextStyle}>{this.props.error}</Text>

              <View>{this.renderButton()}</View>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  linearGradient: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 350,
    height: 200
  },
  title: {
    color: '#fff',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 36,
    letterSpacing: 2,
    fontWeight: 'normal'
  },
  containertwo: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    paddingLeft: 20,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 25
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttontext: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(SignupScreen);
