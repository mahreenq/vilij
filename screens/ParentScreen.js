import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { fetchParents } from '../redux/modules/parents';
import Parent from '../components/Parent/Parent';

class ParentScreen extends React.Component {
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



  componentDidMount() {
    this.props.dispatch(fetchParents());
  }

  render() {

    const { state } = this.props.navigation;
    const parent = state.params.parent.item;


    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <Parent parent={parent} isLoading={this.props.isLoading} />
    );

  }
}

const mapStateToProps = state => ({
  isLoading: state.parents.isLoading,
  parentsData: state.parents.parentsData
});

export default connect(mapStateToProps)(ParentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
