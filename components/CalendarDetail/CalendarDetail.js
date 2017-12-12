import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Moment from 'moment';

const CalendarDetail = ({ detail, toggleDetail }) => {
  return (
    <View style={styles.details}>
      <View>
        <View style={styles.detailHeader}>
          <Text style={styles.detailHeading}>
            {'You offered to help ' + detail.name}
          </Text>
          <TouchableHighlight
            onPress={() => {
              toggleDetail('');
            }}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionHeading}>Children</Text>
          <View style={styles.childSection}>
            {detail.children.map(child => (
              <View key={child._id} style={styles.child}>
                <Image
                  style={styles.childImage}
                  source={
                    child.gender == 'Female'
                      ? require('../../assets/images/girl.png')
                      : require('../../assets/images/boy.png')
                  }
                />
                <Text style={styles.sectionText}>{child.name}</Text>
                <Text style={styles.sectionText}>{child.age} years</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionHeading}>Date</Text>
          <Text style={[styles.sectionText, styles.detailMargin]}>
            {Moment(detail.date).format('dddd, MMMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionHeading}>Time</Text>
          <Text style={[styles.sectionText, styles.detailMargin]}>
            {detail.time}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionHeading}>Location</Text>
          <Text style={[styles.sectionText, styles.detailMargin]}>
            {detail.location}
          </Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionHeading}>Additional Notes</Text>
          <Text style={[styles.sectionText, styles.detailMargin]}>
            {detail.specialNotes}
          </Text>
        </View>
      </View>
      {/* <TouchableHighlight onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableHighlight> */}
    </View>
  );
};

export default CalendarDetail;

const styles = StyleSheet.create({
  details: {
    height: '93%',
    margin: '5%',
    borderRadius: 10,
    backgroundColor: '#f8e9e7',
    justifyContent: 'space-between'
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '8%',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: '2%'
  },
  detailHeading: {
    fontSize: 20,
    color: '#474973'
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#474973'
  },
  detailSection: {
    marginLeft: '8%',
    marginRight: '8%'
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#474973',
    paddingTop: '5%',
    paddingBottom: '3%'
  },
  sectionText: {
    fontSize: 16,
    color: '#474973'
  },
  childSection: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  child: {
    width: '30%',
    alignItems: 'center'
  },
  childImage: {
    height: 65,
    width: 65,
    marginBottom: '1%'
  },
  detailMargin: {
    paddingLeft: '5%'
  },
  button: {
    borderRadius: 50,
    alignItems: 'center',
    margin: '10%',
    backgroundColor: '#474973'
  },
  buttonText: {
    fontSize: 20,
    color: '#f8e9e7',
    padding: '4%'
  }
});
