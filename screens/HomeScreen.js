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
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { fetchRequests, updateModal } from '../redux/modules/requests';
import { fetchNeeds } from '../redux/modules/calendar';
import { Gravatar, GravatarApi } from 'react-native-gravatar';
import Modal from 'react-native-modal';
import Moment from 'react-moment';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('profile.db');

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });

    // console.log(Expo.FileSystem.getInfoAsync('SQLite/profile.db'));

    this.props.dispatch(fetchRequests());
  }

  add(text) {
    let user = '';

    db.transaction(
      tx => {
        tx.executeSql('delete from items');

        tx.executeSql(
          `select * from items where value = '${text}'`,
          [],
          (_, { rows }) => {
            console.log('count', rows._array.length);
          }
        );
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);

        tx.executeSql('select * from items', [], (_, { rows }) => {
          console.log(JSON.stringify(rows));
          user = rows._array[0].value;
          console.log('user', user);
        });
      },
      null,
      null
    );
  }

  toggleModal() {
    this.props.dispatch(updateModal(0));
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
          <Text
            style={styles.viewProfile}
            onPress={() => navigate('ProfileScreen')}
          >
            View Profile{' '}
          </Text>
          <View style={styles.postButton}>
            <TouchableHighlight
              onPress={() => {
                this.add('Item');
                navigate('PostNeedScreen');
              }}
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
                        {item.date.substr(0, 10)}
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

        <Modal isVisible={this.props.modal == 1}>
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

        <Modal isVisible={this.props.modal == 2}>
          <View style={styles.modal}>
            <Text style={styles.modalHeading}>Post Submitted</Text>
            <Text style={styles.modalMessage}>
              You'll hear from us when a fellow vilijer accepts your request.
            </Text>
            <Text style={styles.modalMessage}>
              Check your calendar to view your submitted requests.
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
  modal: state.requests.modal,
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
    alignItems: 'center',
    marginTop: 20
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
    marginTop: 80,
    marginBottom: 20,
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
    fontSize: 22,
    color: '#474973',
    marginTop: '10%'
  },
  modalMessage: {
    fontSize: 18,
    color: '#474973',
    marginTop: '5%',
    width: '70%',
    textAlign: 'center'
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
  },
  viewProfile: {
    textAlign: 'left',
    fontSize: 20,
    color: '#422B4A',
    paddingTop: 10
  }
});
