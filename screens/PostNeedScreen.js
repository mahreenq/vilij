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
  TextInput,
  Dimensions
} from 'react-native';
import Moment from 'react-moment';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import { connect } from 'react-redux';
import { postNeed } from '../redux/modules/requests';

class PostNeedScreen extends React.Component {
  state = {
    month: '',
    day: '',
    year: '',
    fromTime: '',
    toTime: '',
    notes: ''
  };

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

  postButton() {
    // temporary, hard-coded parent ID for testing,
    // to be replaced by parent ID that is actually logged in
    let parentId = '5a270686a0d3760014197891'; // Aloysius

    let need = {
      date: `${this.state.year}-${this.state.month}-${
        this.state.day
      }T00:00:00.000Z`,
      time: `${this.state.fromTime} to ${this.state.toTime}`,
      specialNotes: this.state.notes,
      parents: [{ _id: parentId }]
    };

    this.props.dispatch(postNeed(need));

    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    // return this.props.isLoading ? (
    //   <ActivityIndicator animating={true} size="small" color="black" />
    // ) : (

    return (
      <View style={styles.mainView}>
        <ImageBackground
          source={require('../assets/images/gradientbg.png')}
          style={styles.background}
        >
          <ScrollView>
            <View style={styles.mainContent}>
              <Text style={styles.formHeading}> Post A Need </Text>

              <View style={styles.form}>
                <Text style={styles.formSubheadings}> Date </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <TextInput
                    placeholder="Month"
                    style={styles.dateInput}
                    onChangeText={text => {
                      this.setState({ month: text });
                    }}
                  />
                  <TextInput
                    placeholder="Day"
                    keyboardType="numeric"
                    style={styles.dateInput}
                    onChangeText={text => {
                      this.setState({ day: text });
                    }}
                  />
                  <TextInput
                    placeholder="Year"
                    keyboardType="numeric"
                    style={styles.dateInput}
                    onChangeText={text => {
                      this.setState({ year: text });
                    }}
                  />
                </View>

                <View style={styles.timeView}>
                  <View style={{ width: '50%' }}>
                    <Text style={styles.formSubheadings}> From </Text>
                    <TextInput
                      placeholder="0:00 pm"
                      // keyboardType='numeric'
                      style={styles.timeInput}
                      onChangeText={text => {
                        this.setState({ fromTime: text });
                      }}
                    />
                  </View>

                  <View style={{ width: '50%' }}>
                    <Text style={styles.formSubheadings}> To </Text>
                    <TextInput
                      placeholder="0:00 pm"
                      // keyboardType='numeric'
                      style={styles.timeInput}
                      onChangeText={text => {
                        this.setState({ toTime: text });
                      }}
                    />
                  </View>
                </View>

                <View>
                  <Text style={styles.formSubheadings}> Children</Text>
                  <Text>Map through logged in user's children here? </Text>
                </View>

                <View>
                  <Text style={styles.formSubheadings}> Special Notes</Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ notes: text });
                    }}
                  />
                </View>

                <View style={styles.postButton}>
                  <TouchableHighlight
                    onPress={() => {
                      this.postButton();
                    }}
                  >
                    <View>
                      <Text style={styles.postText}>Submit</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.requests.isLoading
});

export default connect(mapStateToProps)(PostNeedScreen);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center'
  },
  mainContent: {
    backgroundColor: 'rgba(	248, 233, 231, 0.85)',
    width: SCREEN_WIDTH * 0.85,
    marginTop: 100,
    marginBottom: '10%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 20
  },
  form: {
    padding: 10
  },

  dateInput: {
    height: 50,
    width: '30%',
    backgroundColor: 'rgba(	248, 233, 231,1)',
    borderRadius: 5,
    textAlign: 'center',
    color: '#474973'
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    //  width: SCREEN_WIDTH*0.7
  },
  timeInput: {
    height: 50,
    // width: SCREEN_WIDTH*0.4,
    marginRight: 5,
    backgroundColor: 'rgba(248, 233, 231,1)',
    borderRadius: 5,
    textAlign: 'center',
    color: '#474973'
  },
  notesInput: {
    height: 80,
    width: SCREEN_WIDTH * 0.65,
    backgroundColor: 'rgba(248, 233, 231, 1)',
    borderRadius: 5,
    color: '#474973'
  },
  postButton: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#474973',
    width: SCREEN_WIDTH * 0.6
  },
  postText: {
    color: '#F8E9E7',
    fontSize: 20,
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  formHeading: {
    color: '#474973',
    fontSize: 20
  },
  formSubheadings: {
    color: '#474973',
    marginTop: 15
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

<style>color: rgba(248, 233, 231, 0.9);</style>;
