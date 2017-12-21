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
import {
  fetchParents,
  postParent,
  updateModal
} from '../redux/modules/parents';

class EditProfileScreen extends React.Component {
  state = {
    parentName: '',
    email: '',
    description: '',
    address: '',
    childName: '',
    age: '',
    gender: '',
    activities: '',
    allergies: '',
    medicalConditions: '',
    routines: '',
    additionalNotes: ''
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
    let parent = {
      name: this.state.parentName,
      email: this.state.email,
      description: this.state.description,
      address: this.state.address,
      children: {
        name: this.state.childName,
        age: this.state.age,
        gender: this.state.gender,
        activities: this.state.activities,
        allergies: this.state.allergies,
        medicalConditions: this.state.medicalConditions,
        routines: this.state.routines,
        additionalNotes: this.state.additionalNotes
      }
    };

    // let parent = {
    //   name: 'William',
    //   email: 'william@email.com',
    //   description: 'Hard worker.',
    //   address: '462 Wellington Street',
    //   children: {
    //     name: 'Freddy',
    //     age: '10',
    //     gender: 'Male',
    //     activities: 'Running and jumping.',
    //     allergies: 'Homework',
    //     medicalConditions: 'None.',
    //     routines: 'Afternoon naptime.',
    //     additionalNotes: 'Generally well behaved.'
    //   }
    // };

    this.props.dispatch(postParent(parent));
    this.props.dispatch(updateModal(3));

    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <View style={styles.mainView}>
        <ImageBackground
          source={require('../assets/images/gradientbg.png')}
          style={styles.background}
        >
          <ScrollView>
            <View style={styles.mainContent}>
              <Text style={styles.formHeading}> Edit Your Profile </Text>

              <View style={styles.form}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <TextInput
                    placeholder="Name"
                    style={styles.nameInput}
                    onChangeText={text => {
                      this.setState({ parentName: text });
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 25
                  }}
                >
                  <TextInput
                    placeholder="Email"
                    style={styles.nameInput}
                    onChangeText={text => {
                      this.setState({ email: text });
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 25
                  }}
                >
                  <TextInput
                    placeholder="Describe yourself as a parent (140 characters)"
                    style={styles.descInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ description: text });
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 25
                  }}
                >
                  <TextInput
                    placeholder="Street Address"
                    style={styles.addressInput}
                    onChangeText={text => {
                      this.setState({ address: text });
                    }}
                  />
                </View>

                <Text style={styles.formHeading}>
                  {' '}
                  Edit Your Child's Information{' '}
                </Text>

                <Text style={styles.formSubheadings}> Child's Name </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <TextInput
                    style={styles.nameInput}
                    onChangeText={text => {
                      this.setState({ childName: text });
                    }}
                  />
                </View>

                <View style={styles.timeView}>
                  <View style={{ width: '50%' }}>
                    <Text style={styles.formSubheadings}> Age </Text>
                    <TextInput
                      placeholder="7"
                      keyboardType="numeric"
                      style={styles.timeInput}
                      onChangeText={text => {
                        this.setState({ age: text });
                      }}
                    />
                  </View>

                  <View style={{ width: '50%' }}>
                    <Text style={styles.formSubheadings}> Gender </Text>
                    <TextInput
                      placeholder="Male or Female"
                      style={styles.timeInput}
                      onChangeText={text => {
                        this.setState({ gender: text });
                      }}
                    />
                  </View>
                </View>

                <View>
                  <Text style={styles.formSubheadings}>
                    {' '}
                    Favourite Activites
                  </Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ activities: text });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.formSubheadings}> Allergies</Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ allergies: text });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.formSubheadings}>
                    {' '}
                    Medical Conditions
                  </Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ medicalConditions: text });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.formSubheadings}> Special Routine</Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ routines: text });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.formSubheadings}> Additional Notes</Text>
                  <TextInput
                    style={styles.notesInput}
                    multiline
                    onChangeText={text => {
                      this.setState({ additionalNotes: text });
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
                      <Text style={styles.postText}>Done</Text>
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
  isLoading: state.parents.isLoading,
  parentId: state.parents.parentId
});

export default connect(mapStateToProps)(EditProfileScreen);

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
    marginTop: 150,
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

  nameInput: {
    height: 50,
    width: SCREEN_WIDTH * 0.65,
    backgroundColor: 'rgba(	248, 233, 231,1)',
    borderRadius: 5,
    color: '#474973',
    paddingLeft: 10,
    paddingRight: 10
  },
  descInput: {
    height: 90,
    width: SCREEN_WIDTH * 0.65,
    backgroundColor: 'rgba(248, 233, 231, 1)',
    borderRadius: 5,
    color: '#474973',
    paddingLeft: 10,
    paddingRight: 10
  },
  addressInput: {
    height: 40,
    width: SCREEN_WIDTH * 0.65,
    backgroundColor: 'rgba(248, 233, 231, 1)',
    borderRadius: 5,
    color: '#474973',
    paddingLeft: 10,
    paddingRight: 10
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

  nameInput: {
    height: 50,
    width: SCREEN_WIDTH * 0.65,
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
  }
});

// <View style={{  flexDirection: 'row' ,justifyContent: 'space-around', marginTop: 25}}>
//      <Text style= {styles.formSubheadings}> Children go here</Text>
//  </View>
