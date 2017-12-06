import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {connect} from 'react-redux';
import {fetchParents} from '../redux/modules/parents';
import DiscoverList from '../components/DiscoverList/DiscoverList';

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    title: 'Discover',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'transparent'
    }
  };

  componentDidMount(){
    this.props.dispatch(fetchParents());
}

render() { 
  

  return (
      this.props.isLoading ? 
          <ActivityIndicator animating={true} size="small" color="black" /> 
           : 
          <DiscoverList 
          parentsData = {this.props.parentsData} 
          isLoading={this.props.isLoading} /> 
    );
  }; 
}

const mapStateToProps = state => ({
  isLoading: state.parents.isLoading,
  parentsData: state.parents.parentsData
})

export default connect(mapStateToProps)(DiscoverScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

});
