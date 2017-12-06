import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {connect} from 'react-redux';
import {fetchParents} from '../redux/modules/parents';
import Parent from '../components/Parent/Parent';

class ParentScreen extends React.Component {
  static navigationOptions = {
    title: 'ParentScreen',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'transparent'
    }
  };

  componentDidMount(){
    this.props.dispatch(fetchParents());
}

render() { 
  const {state} = this.props.navigation;
  console.log(state.params.parent.item.name);
  const parent = state.params.parent.item
  
  return (
      this.props.isLoading ? 
          <ActivityIndicator animating={true} size="small" color="black" /> 
           : 
          <Parent
          parent={parent}
          isLoading={this.props.isLoading} /> 
      // <View>
      // <Text>Name: {parent.name}</Text> 
      // <Text>Name: {parent.description}</Text> 
      // </View>
    );
  }; 
}

const mapStateToProps = state => ({
  isLoading: state.parents.isLoading,
  parentsData: state.parents.parentsData
})

export default connect(mapStateToProps)(ParentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

});
