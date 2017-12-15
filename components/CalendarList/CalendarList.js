import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Moment from 'moment';

const CalendarList = ({ listDates, toggleDetail }) => {
  return (
    <View>
      {Object.keys(listDates)
        .sort()
        .map(key => {
          let detailHeading = '';

          if (listDates[key].filter == 'offered') {
            detailHeading = 'You offered to help ' + listDates[key].name;
          } else if (listDates[key].filter == 'receiving') {
            detailHeading = listDates[key].name + ' offered to help you';
          } else {
            detailHeading = 'Your request is pending';
          }

          return (
            <View key={key} style={styles.calendarEvent}>
              <TouchableHighlight
                onPress={() => {
                  toggleDetail(listDates[key].date);
                }}
              >
                <View style={[styles.eventCircle, listDates[key].circleColor]}>
                  <View style={styles.circleText}>
                    <Text style={styles.dayText}>
                      {parseInt(listDates[key].date.substr(8, 2))}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <View>
                <Text style={styles.detailText}>{detailHeading}</Text>
                <Text style={styles.detailText}>
                  {Moment(listDates[key].date).format('dddd')},{' '}
                  {listDates[key].time}
                </Text>
                <Text style={styles.detailText}>{listDates[key].location}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default CalendarList;

const styles = StyleSheet.create({
  calendarEvent: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '7%'
  },
  detailText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#f8e9e7'
  },
  eventCircle: {
    borderRadius: 56 / 2,
    height: 56,
    width: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '3%'
  },
  circleText: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  dayText: {
    fontSize: 25
  }
});
