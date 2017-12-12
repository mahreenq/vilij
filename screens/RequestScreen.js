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
import { fetchRequests } from '../redux/modules/requests';
import SingleRequest from '../components/SingleRequest/SingleRequest';

class RequestScreen extends React.Component {
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
    this.props.dispatch(fetchRequests());
  }

  render() {

    const { state } = this.props.navigation;
    const request = state.params.request.item;

    //console.log(state.params.request.item.specialNotes);
    return this.props.isLoading ? (
      <ActivityIndicator animating={true} size="small" color="black" />
    ) : (
      <SingleRequest request={request} isLoading={this.props.isLoading} />
    );


  }
}

const mapStateToProps = state => ({
  isLoading: state.requests.isLoading,
  requestData: state.requests.requestsData
});

export default connect(mapStateToProps)(RequestScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
