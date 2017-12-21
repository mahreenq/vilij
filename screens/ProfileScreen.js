import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ImageBackground,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import { Gravatar, GravatarApi } from 'react-native-gravatar';
import { fetchParents, updateModal } from '../redux/modules/parents';
import { connect } from 'react-redux';

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

  toggleModal() {
    this.props.dispatch(updateModal(0));
    this.props.dispatch(fetchParents());
    console.log('parent ID', this.props.parentId);
  }

  render() {
    const { navigate } = this.props.navigation;

    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <View style={styles.mainView}>
        <ImageBackground
          source={require('../assets/images/gradientbg.png')}
          style={styles.background}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 150,
              justifyContent: 'flex-start',
              width: '90%'
            }}
          >
            <View style={{ width: '20%' }}>
              <Gravatar
                options={{ email: 'noemail@noemail.com' }}
                style={styles.roundedProfileImage}
              />
            </View>
            <Text style={styles.name}> Logged in user's Name </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
              width: '90%'
            }}
          >
            <Text style={styles.text}>
              Logged in user's description. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor in
            </Text>
            <Text
              onPress={() => navigate('EditProfileScreen')}
              style={styles.edit}
            >
              Edit{' '}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
              width: '90%',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#fff'
            }}
          >
            <Text style={styles.text}>
              {' '}
              Map through logged in user's children here.{' '}
            </Text>
            <Text
              onPress={() => navigate('EditChildScreen')}
              style={styles.edit}
            >
              Edit{' '}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
              width: '90%'
            }}
          >
            <Text style={styles.text}> 1234 Abcde Street </Text>
            <Text
              onPress={() => navigate('EditProfileScreen')}
              style={styles.edit}
            >
              Edit
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingTop: 50,
              width: '90%',
              justifyContent: 'space-around'
            }}
          >
            <Text style={styles.helped}># Sits Offered</Text>
            <Text style={styles.helped}># Sits Received</Text>
          </View>
        </ImageBackground>

        <Modal isVisible={this.props.modal == 3}>
          <View style={styles.modal}>
            <Text style={styles.modalHeading}>
              Your profile has been updated.
            </Text>
            <View style={styles.doneButton}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal();
                }}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.parents.isLoading,
  parentId: state.parents.parentId,
  modal: state.parents.modal
});

export default connect(mapStateToProps)(ProfileScreen);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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

  roundedProfileImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30
  },
  name: {
    fontSize: 24,
    color: '#f8e9e7',
    backgroundColor: 'transparent'
  },
  helped: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 14,
    color: '#f8e9e7',
    backgroundColor: 'transparent',
    width: '80%',
    paddingTop: 20,
    paddingBottom: 20
  },
  edit: {
    fontSize: 14,
    color: '#f8e9e7',
    backgroundColor: 'transparent',
    width: '20%'
  },
  modal: {
    borderRadius: 10,
    backgroundColor: '#f8e9e7',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalHeading: {
    fontSize: 22,
    color: '#474973',
    marginTop: '10%'
  },
  doneButton: {
    borderRadius: 50,
    alignItems: 'center',
    marginTop: '15%',
    marginBottom: '10%',
    backgroundColor: '#474973',
    width: '80%'
  },
  doneText: {
    fontSize: 20,
    color: '#f8e9e7',
    paddingTop: '4%',
    paddingBottom: '4%'
  }
});
