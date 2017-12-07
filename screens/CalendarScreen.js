import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { fetchNeeds, updateFilter } from '../redux/modules/calendar';

class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'transparent'
    }
  };

  componentWillMount() {
    this.props.dispatch(fetchNeeds());
  }

  toggle(filter) {
    this.props.dispatch(updateFilter(filter));
    console.log(filter);
  }

  render() {
    // console.log(this.props);

    let markedDates = {};

    let needsData = this.props.needsData;
    needsData.map(need => {
      let markedDate = need.date.substr(0, 10); // yyyy-mm-dd

      if (!markedDates.hasOwnProperty(markedDate)) {
        if (this.props.filter == 'all' || this.props.filter == 'offered') {
          markedDates[markedDate] = {
            startingDay: true,
            endingDay: true,
            color: '#c3a3ce', // offered
            textColor: '#000000'
          };
        }
      }
    });

    // if (!markedDates.hasOwnProperty('2017-12-10')) {
    //   markedDates['2017-12-10'] = {
    //     startingDay: true,
    //     endingDay: true,
    //     color: '#f8e9e7',  // all
    //     textColor: '#000000'
    //   };

    //   markedDates['2017-12-23'] = {
    //     startingDay: true,
    //     endingDay: true,
    //     color: '#bdf3ff',  // receiving
    //     textColor: '#000000'
    //   };

    //   markedDates['2017-12-24'] = {
    //     startingDay: true,
    //     endingDay: true,
    //     color: '#c3a3ce',  // offered
    //     textColor: '#000000'
    //   };
    // }

    if (this.props.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="small" color="black" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={['#474973', '#ed808c']}
            style={styles.linearGradient}
          >
            <TouchableHighlight
              onPress={() => {
                // this.toggle('list');
              }}
            >
              <View style={styles.navList}>
                <Text style={[styles.navText, styles.listText]}>List</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.navContainer}>
              <TouchableHighlight
                onPress={() => {
                  this.toggle('all');
                }}
              >
                <View
                  style={this.props.filter == 'all' ? styles.navUnderline : ''}
                >
                  <Text style={[styles.navText, styles.allText]}> All </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.toggle('offered');
                }}
              >
                <View style={styles.navItem}>
                  <View style={styles.offeredCircle} />
                  <View
                    style={
                      this.props.filter == 'offered' ? styles.navUnderline : ''
                    }
                  >
                    <Text style={[styles.navText, styles.offeredText]}>
                      {' '}
                      Offered{' '}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.toggle('receiving');
                }}
              >
                <View style={styles.navItem}>
                  <View style={styles.receivingCircle} />
                  <View
                    style={
                      this.props.filter == 'receiving'
                        ? styles.navUnderline
                        : ''
                    }
                  >
                    <Text style={[styles.navText, styles.receivingText]}>
                      {' '}
                      Receiving{' '}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <Calendar
              markedDates={markedDates}
              markingType={'period'}
              hideExtraDays={true}
              onMonthChange={month => {
                console.log('month changed', month);
              }}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#f8e9e7',
                dayTextColor: '#f8e9e7',
                monthTextColor: '#f8e9e7'
              }}
            />
          </LinearGradient>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.needs.isLoading,
  needsData: state.needs.needsData,
  filter: state.needs.filter
});

export default connect(mapStateToProps)(CalendarScreen);

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  linearGradient: {
    flex: 1
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  navList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingRight: 30
  },
  listText: {
    color: '#f8e9e7'
  },
  navItem: {
    flexDirection: 'row'
  },
  navText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  navUnderline: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#f8e9e7'
  },
  allText: {
    color: '#f8e9e7'
  },
  offeredCircle: {
    borderRadius: 17 / 2,
    backgroundColor: '#c3a3ce',
    height: 17,
    width: 17
  },
  offeredText: {
    color: '#c3a3ce'
  },
  receivingCircle: {
    borderRadius: 17 / 2,
    backgroundColor: '#bdf3ff',
    height: 17,
    width: 17
  },
  receivingText: {
    color: '#bdf3ff'
  }
});
