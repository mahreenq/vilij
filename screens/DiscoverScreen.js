import React from 'react';
import { Image, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {connect} from 'react-redux';
import {fetchParents} from '../redux/modules/parents';
import DiscoverList from '../components/DiscoverList/DiscoverList';
import { LinearGradient } from 'expo';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
import { Ionicons } from '@expo/vector-icons';

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

  const {navigate} = this.props.navigation;
  
  return (
      this.props.isLoading ? 
          <ActivityIndicator animating={true} size="small" color="black" /> 
           : 
      //     <DiscoverList
      //     navigation = {this.props.navigation} 
      //     parentsData = {this.props.parentsData} 
      //     isLoading={this.props.isLoading} /> 


          <View style={styles.mainView} >
              <ScrollView>
                  <LinearGradient
                  style={[
                    styles.mainContent,
                  ]}
                  colors={['#474973', '#ED808C']}
                  start={{ x: 0, y: 0.1 }} 
                  end={{ x: 0.1, y: 1 }}
                  >
                  <Text style={styles.title}> Discover </Text>

              <FlatList
                data={this.props.parentsData}
                renderItem={( {item} )  => 
                    <View onPress={() => navigate('ParentScreen', {parent: {item}})}
                          style={styles.parentsList}>

                        <View style={{width:'20%'}} >
                            <Gravatar 
                                
                                options={{email: item.email,}}
                                style={styles.roundedProfileImage} />
                        </View>

                        <View style={{width:'75%', paddingLeft: 30}}>
                              <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}} onPress={() => navigate('ParentScreen', {parent: {item}})} >
                                  <Text  style={styles.name} 
                                  onPress={() => navigate('ParentScreen', {parent: {item}})}> 
                                  {item.name}  
                                  </Text>
                                  <Ionicons
                                    onPress={() => navigate('ParentScreen', {parent: {item}})}
                                    name="ios-arrow-forward"
                                    size={25}
                                    style={{ marginLeft: 10, color: "#fff" }}
                                    />  
                                </View> 
                            <Text onPress={() => navigate('ParentScreen', {parent: {item}})}
                                  style={styles.description}> {item.description}  </Text>

                              <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}  >
                                  <Ionicons name="md-home"
                                          size={20}
                                          style={{ marginRight: 5, color: "#fff" }}
                                          />  
                                  <Text style={styles.description}>- Mutual Vilijers  </Text>  
                                </View>
                                <Text style={styles.description}>- km away  </Text>    
                        </View>

                    </View>
                    }
                  keyExtractor={item => item.name}   /> 
                
                </LinearGradient>
            </ScrollView>
        </View>

    );
  }; 
}

const mapStateToProps = state => ({
  isLoading: state.parents.isLoading,
  parentsData: state.parents.parentsData
})

export default connect(mapStateToProps)(DiscoverScreen);


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: SCREEN_HEIGHT,
    paddingBottom: 50,
  },
  mainView:{
    // height: SCREEN_HEIGHT,
  },
  title: {
      fontSize: 30,
      color: 'white',
      backgroundColor: 'transparent',
      textAlign: 'center',
      marginBottom: 16,
      paddingTop: 15,
    },
  name: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  description: {
      fontSize: 15,
      color: 'white',
      backgroundColor: 'transparent',
      paddingBottom: 3,
    },
  parentsList:{
      backgroundColor: 'transparent',
      width: '85%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 15,
  },
  roundedProfileImage: {
      width:60, 
      height:60, 
      borderWidth:1,
      borderColor:'white', 
      borderRadius:30,
    },

    flexOne: {
        flex: 1,
    }

});


