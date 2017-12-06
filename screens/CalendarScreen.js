import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { WebBrowser, LinearGradient } from 'expo';
import { Calendar } from 'react-native-calendars';

import { MonoText } from '../components/StyledText';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'transparent'
    }
  };

  markedDates = {
    '2017-12-10': {
      startingDay: true,
      endingDay: true,
      color: '#f8e9e7',
      textColor: '#000000'
    },
    '2017-12-23': {
      startingDay: true,
      endingDay: true,
      color: '#bdf3ff',
      textColor: '#000000'
    },
    '2017-12-24': {
      startingDay: true,
      endingDay: true,
      color: '#c3a3ce',
      textColor: '#000000'
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <LinearGradient colors={['#474973', '#ed808c']}> */}
        <View style={styles.navContainer}>
          <View style={styles.navItem}>
            <Text style={styles.allText}> All</Text>
          </View>
          <View style={styles.navItem}>
            <View style={styles.offeredCircle} />
            <Text style={styles.offeredText}> Offered</Text>
          </View>
          <View style={styles.navItem}>
            <View style={styles.receivingCircle} />
            <Text style={styles.receivingText}> Receiving</Text>
          </View>
        </View>
        <Calendar
          markedDates={this.markedDates}
          markingType={'period'}
          hideExtraDays={true}
          theme={{
            // backgroundColor: '#474973',
            calendarBackground: 'transparent'
            // textSectionTitleColor: '#b6c1cd',
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            // todayTextColor: '#00adf5',
            // dayTextColor: '#2d4150',
            // textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            // arrowColor: 'orange',
            // monthTextColor: 'blue',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}
        />
        {/* </LinearGradient> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 30
  },
  navItem: {
    flexDirection: 'row'
    // borderStyle: 'solid',
    // borderColor: '#c3a3ce',
    // borderBottomWidth: 2
  },
  allText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f8e9e7'
  },
  offeredCircle: {
    borderRadius: 17 / 2,
    backgroundColor: '#c3a3ce',
    height: 17,
    width: 17
  },
  offeredText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c3a3ce'
  },
  receivingCircle: {
    borderRadius: 17 / 2,
    backgroundColor: '#bdf3ff',
    height: 17,
    width: 17
  },
  receivingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#bdf3ff'
  }
});
