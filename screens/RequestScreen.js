import React from 'react';
import { Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchRequests, offerHelp } from '../redux/modules/requests';
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

  offerButton(needId, requestName) {
    let parentId = this.props.parentId;

    this.props.dispatch(offerHelp(needId, parentId, requestName));
    this.props.dispatch(fetchRequests());
  }

  render() {
    // const { state } = this.props.navigation;
    const { state, goBack } = this.props.navigation;
    const request = state.params.request.item;
    // console.log(this.props.navigation);

    //console.log(state.params.request.item.specialNotes);
    if (this.props.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="small" color="black" />
        </View>
      );
    } else {
      return (
        <SingleRequest
          request={request}
          offerButton={this.offerButton.bind(this)}
          goBack={goBack}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.requests.isLoading,
  requestData: state.requests.requestsData,
  parentId: state.parents.parentId
});

export default connect(mapStateToProps)(RequestScreen);

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    height: '100%'
  }
});
