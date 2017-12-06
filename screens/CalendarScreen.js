import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { LinearGradient } from 'expo';
import { Calendar } from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all'
    };
  }

  static navigationOptions = {
    title: 'Calendar',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'transparent'
    }
  };

  toggle(filter) {
    console.log(filter);

    this.setState({
      filter: filter
    });
  }

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
        <LinearGradient
          colors={['#474973', '#ed808c']}
          style={styles.linearGradient}
        >
          <TouchableHighlight
            onPress={() => {
              this.toggle('list');
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
                style={this.state.filter == 'all' ? styles.navUnderline : ''}
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
                    this.state.filter == 'offered' ? styles.navUnderline : ''
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
                    this.state.filter == 'receiving' ? styles.navUnderline : ''
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
            markedDates={this.markedDates}
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

const styles = StyleSheet.create({
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
