import React from 'react';
import { Image, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions, ImageBackground} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {connect} from 'react-redux';
import {fetchRequests} from '../redux/modules/requests';
import { LinearGradient } from 'expo';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
import Moment from 'react-moment';

class HomeScreen extends React.Component {
   static navigationOptions = {
    header: null,
  };  

  componentDidMount(){
    this.props.dispatch(fetchRequests());
}

render() { 

  const {navigate} = this.props.navigation;
  
  return (
      this.props.isLoading ? 
          <ActivityIndicator animating={true} size="small" color="black" /> 
           : 

          <View style={styles.mainView} >
           
              <ImageBackground source={require('../assets/images/gradientbg.png')} style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>

                   <TouchableOpacity
                              style={styles.offerHelpButton}
                            // onPress={() => navigate('HomeScreen')}
                              underlayColor='#fff'>
                              <View >
                                  <Text style={styles.buttonText}>Post a Need</Text> 
                              </View>
                    </TouchableOpacity>

                    <ScrollView>

              <FlatList
                data={this.props.requestsData}
                renderItem={( {item} )  => 
          
                    <View style={styles.requestsList}>

                    <View style={{flexDirection: 'row'}}>

                        <View style={{width:'20%'}} >
                            <Gravatar options={{email: item.parents.email,}}
                                style={styles.roundedProfileImage} />
                        </View>

                        <View style={{width:'75%', paddingLeft: 15}}>
                            <Text  style={styles.name} 
                                  onPress={() => navigate('RequestScreen', {request: {item}})} > 
                              {item.parents[0].name} needs help
                            </Text>
                            <Moment  format="MMMM D, YYYY " 
                                        style={styles.date} 
                                        element={Text} 
                                        >
                                         {item.date}
                                </Moment>
                         
                            <Text style={styles.date}>{item.time}  </Text>
                        </View>

                      </View>
 
                       <View style={{flexDirection: 'row', paddingTop: 20}}>
                             <Text style={styles.helped}> You helped {item.parents[0].name} : #  </Text>
                             <Text style={styles.helped}> {item.parents[0].name} helped you : # </Text>
                       </View>
                    </View>   
                    }
                  keyExtractor={item => item.parents[0].name}   /> 
                  </ScrollView>
                
                </ImageBackground>
            
        </View>

    );
  }; 
}

const mapStateToProps = state => ({
  isLoading: state.requests.isLoading,
  requestsData: state.requests.requestsData
});

export default connect(mapStateToProps)(HomeScreen);

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
    justifyContent: 'center',
    paddingBottom: 50,
    
  },
  mainView:{
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    flex: 1,
    
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
    fontSize: 20,
    color: '#422B4A',
    backgroundColor: 'transparent',
    paddingBottom: 5,
 
  },
  date: {
      fontSize: 15,
      color: '#422B4A',
      backgroundColor: 'transparent',
    },
    helped: {
      fontSize: 14,
      color: '#422B4A',
      backgroundColor: 'transparent',
    },
  requestsList:{
      backgroundColor: 'rgba(248, 233, 231, 0.5)',
      width: SCREEN_WIDTH*0.88,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom : 15,
      margin : 5,
      marginLeft: 20,
      borderRadius:15,
      padding: 20,
    
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
    },
    offerHelpButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:125,
      marginBottom: 30,
      paddingTop:10,
      paddingBottom:15,
      backgroundColor:'#422B4A',
      borderRadius:30,
      height: 40,
      width: SCREEN_WIDTH*0.7,

    },
    buttonText:{
        color:'#F8E9E7',
        textAlign:'center',
        fontSize: 20,
        borderRadius:20,
        backgroundColor:'transparent',
    }



    // <LinearGradient
    // style={[
    //   styles.mainContent,
    // ]}
    // colors={['#474973', '#ED808C']}
    // start={{ x: 0, y: 0.1 }} 
    // end={{ x: 0.1, y: 1 }}
    // >
});


