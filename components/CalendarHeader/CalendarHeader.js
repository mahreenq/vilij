import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const CalendarHeader = ({
  monthName,
  topNavName,
  toggleScreen,
  toggleFilter,
  filter
}) => {
  return (
    <View>
      <View style={styles.headerCenter}>
        <Text style={styles.monthName}>{monthName}</Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          let screen = '';
          if (topNavName == 'List') {
            screen = 'list';
          } else {
            screen = 'calendar';
          }
          toggleScreen(screen);
        }}
      >
        <View style={styles.headerRight}>
          <Text style={[styles.navText, styles.listText]}>{topNavName}</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.navContainer}>
        <TouchableHighlight
          onPress={() => {
            toggleFilter('all');
          }}
        >
          <View style={filter == 'all' ? styles.navUnderline : ''}>
            <Text style={[styles.navText, styles.allText]}> All </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            toggleFilter('offered');
          }}
        >
          <View style={styles.navItem}>
            <View style={styles.offeredCircle} />
            <View style={filter == 'offered' ? styles.navUnderline : ''}>
              <Text style={[styles.navText, styles.offeredText]}>
                {' '}
                Offered{' '}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            toggleFilter('receiving');
          }}
        >
          <View style={styles.navItem}>
            <View style={styles.receivingCircle} />
            <View style={filter == 'receiving' ? styles.navUnderline : ''}>
              <Text style={[styles.navText, styles.receivingText]}>
                {' '}
                Receiving{' '}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 30,
    top: -25
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
  },
  headerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 45
  },
  monthName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f8e9e7'
  }
});
