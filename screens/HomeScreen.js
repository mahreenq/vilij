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
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { fetchRequests, updateModal } from '../redux/modules/requests';
import { fetchNeeds } from '../redux/modules/calendar';
import { Gravatar, GravatarApi } from 'react-native-gravatar';
import Modal from 'react-native-modal';
import Moment from 'react-moment';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.dispatch(fetchRequests());
  }

  toggleModal() {
    this.props.dispatch(updateModal(false));
    this.props.dispatch(fetchRequests());
    this.props.dispatch(fetchNeeds());
  }

  render() {
    const { navigate } = this.props.navigation;

    let requestsData = this.props.requestsData.filter(request => {
      return Object.keys(request.offered).length == 0;
    });

    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <View style={styles.mainView}>
        <ImageBackground
          source={require('../assets/images/gradientbg.png')}
          style={styles.background}
        >
          <View style={styles.postButton}>
            <TouchableHighlight
            // onPress={() => navigate('HomeScreen')}
            >
              <View>
                <Text style={styles.postText}>Post a Need</Text>
              </View>
            </TouchableHighlight>
          </View>

          <ScrollView>
            <FlatList
              data={requestsData}
              renderItem={({ item }) => (
                <View style={styles.requestsList}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '20%' }}>
                      <Gravatar
                        options={{ email: item.parents.email }}
                        style={styles.roundedProfileImage}
                      />
                    </View>

                    <View style={{ width: '75%', paddingLeft: 15 }}>
                      <Text
                        style={styles.name}
                        onPress={() =>
                          navigate('RequestScreen', { request: { item } })
                        }
                      >
                        {item.parents[0].name} needs help
                      </Text>
                      <Moment
                        format="MMMM D, YYYY "
                        style={styles.date}
                        element={Text}
                      >
                        {item.date}
                      </Moment>

                      <Text style={styles.date}>{item.time} </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <Text style={styles.helped}>
                      {' '}
                      You helped {item.parents[0].name} : #{' '}
                    </Text>
                    <Text style={styles.helped}>
                      {' '}
                      {item.parents[0].name} helped you : #{' '}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        </ImageBackground>

        <Modal isVisible={this.props.modalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalHeading}>
              You offered to help {this.props.requestName}!
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
  isLoading: state.requests.isLoading,
  requestsData: state.requests.requestsData,
  modalVisible: state.requests.modalVisible,
  requestName: state.requests.requestName
});

export default connect(mapStateToProps)(HomeScreen);

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
  }
});
