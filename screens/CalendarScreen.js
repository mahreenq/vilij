import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from 'react-redux';
import {
  fetchNeeds,
  updateScreen,
  updateFilter,
  updateMonth,
  updateDetail
} from '../redux/modules/calendar';
// import Moment from 'moment';
import CalendarHeader from '../components/CalendarHeader/CalendarHeader';
import CalendarList from '../components/CalendarList/CalendarList';
import CalendarDetail from '../components/CalendarDetail/CalendarDetail';

class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
    header: null
  };

  componentWillMount() {
    this.props.dispatch(fetchNeeds());
  }

  toggleScreen(screen) {
    this.props.dispatch(updateScreen(screen));
  }

  toggleFilter(filter) {
    this.props.dispatch(updateFilter(filter));
  }

  toggleMonth(month) {
    this.props.dispatch(updateMonth(month));
  }

  toggleDetail(detailDate) {
    this.props.dispatch(updateDetail(detailDate));
  }

  getMonthName(monthNo) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    let monthName = '';

    if (monthNo >= 1 && monthNo <= 12) {
      monthName = monthNames[monthNo - 1];
    }

    return monthName;
  }

  getCurrentDate(yearNo, monthNo, dayNo) {
    let currentDate = '';

    let yearStr = yearNo.toString();
    let monthStr = monthNo.toString();
    let dayStr = dayNo.toString();

    if (monthStr.length == 1) {
      monthStr = '0' + monthStr;
    }

    if (dayStr.length == 1) {
      dayStr = '0' + dayStr;
    }

    currentDate = `${yearStr}-${monthStr}-${dayStr}`;

    return currentDate;
  }

  setCalendarLocale() {
    LocaleConfig.locales['zz'] = {
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul.',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };

    LocaleConfig.defaultLocale = 'zz';
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="small" color="black" />
        </View>
      );
    } else {
      let markedDates = {};
      let listDates = {};
      let yearNo = 0;
      let monthNo = 0;
      let dayNo = 0;
      let currentDate = '';
      let monthName = '';

      if (Object.keys(this.props.month).length > 0) {
        monthNo = this.props.month.month;
        currentDate = this.props.month.dateString;
      } else {
        yearNo = new Date().getFullYear();
        monthNo = new Date().getMonth() + 1;
        dayNo = new Date().getDate();

        currentDate = this.getCurrentDate(yearNo, monthNo, dayNo);
      }

      if (monthNo > 0) {
        monthName = this.getMonthName(monthNo);
      }

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

              // color: '#f8e9e7',  // all
              // color: '#bdf3ff',  // receiving
              // color: '#c3a3ce',  // offered
            };
          }
        }

        if (markedDate.substr(0, 7) === currentDate.substr(0, 7)) {
          listDates[markedDate] = {
            name: need.parents[0].name,
            date: need.date.substr(0, 10),
            time: need.time,
            location: need.parents[0].address,
            specialNotes: need.specialNotes,
            children: need.parents[0].children
          };
        }
      });

      this.setCalendarLocale();

      if (this.props.detailDate.length > 0) {
        return (
          <View style={styles.container}>
            <StatusBar hidden={true} />
            <LinearGradient
              colors={['#474973', '#ed808c']}
              style={styles.linearGradient}
            >
              <CalendarDetail
                detail={listDates[this.props.detailDate]}
                toggleDetail={this.toggleDetail.bind(this)}
              />
            </LinearGradient>
          </View>
        );
      } else {
        if (this.props.screen == 'calendar') {
          return (
            <View style={styles.container}>
              <StatusBar hidden={true} />
              <LinearGradient
                colors={['#474973', '#ed808c']}
                style={styles.linearGradient}
              >
                <CalendarHeader
                  monthName={monthName}
                  topNavName={'List'}
                  toggleScreen={this.toggleScreen.bind(this)}
                  toggleFilter={this.toggleFilter.bind(this)}
                  filter={this.props.filter}
                />
                <Calendar
                  current={currentDate}
                  markedDates={markedDates}
                  markingType={'period'}
                  monthFormat={' '}
                  hideExtraDays={true}
                  onMonthChange={month => {
                    this.toggleMonth(month);
                  }}
                  onDayPress={day => {
                    this.toggleMonth(day);
                    if (listDates.hasOwnProperty(day.dateString)) {
                      this.toggleDetail(day.dateString);
                    }
                  }}
                  theme={{
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#f8e9e7',
                    dayTextColor: '#f8e9e7',
                    monthTextColor: '#f8e9e7',
                    textDayHeaderFontSize: 18
                  }}
                />
              </LinearGradient>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <StatusBar hidden={true} />
              <LinearGradient
                colors={['#474973', '#ed808c']}
                style={styles.linearGradient}
              >
                <CalendarHeader
                  monthName={monthName}
                  topNavName={'Calendar'}
                  toggleScreen={this.toggleScreen.bind(this)}
                  toggleFilter={this.toggleFilter.bind(this)}
                  filter={this.props.filter}
                />
                <CalendarList
                  listDates={listDates}
                  toggleDetail={this.toggleDetail.bind(this)}
                />
              </LinearGradient>
            </View>
          );
        }
      }
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.needs.isLoading,
  needsData: state.needs.needsData,
  screen: state.needs.screen,
  filter: state.needs.filter,
  month: state.needs.month,
  detailDate: state.needs.detailDate
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
  }
});
