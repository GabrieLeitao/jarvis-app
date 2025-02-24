import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import userInfo from '../data/userInfo.json';

export default function Index() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    birthdate: string;
    events: { id: number; title: string; date: string; time: string; }[];
  } | null>(null);
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Simulate fetching user data
    setUser(userInfo);
  }, []);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const renderHour = (hour: number) => (
    <View style={styles.hour}>
      <Text style={styles.hourText}>{hour}:00</Text>
    </View>
  );

  const renderDay = (day: Date) => {
    const dayNumber = day.getDate();
    const isToday = day.toDateString() === new Date().toDateString();
    const events = user?.events.filter(event => new Date(event.date).toDateString() === day.toDateString()) || [];
    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>{dayNumber}</Text>
        {Array.from({ length: 24 }, (_, i) => (
          <View key={i} style={styles.hour}>
            <Text style={styles.hourText}>{i}:00</Text>
            {events.filter(event => new Date(event.time).getHours() === i).map(event => (
              <Text key={event.id} style={styles.eventText}>{event.title}</Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderMonthDay = (day: Date) => {
    const dayNumber = day.getDate();
    const hasEvents = user?.events.some(event => new Date(event.date).toDateString() === day.toDateString());
    return (
      <View style={styles.monthDayContainer}>
        <Text style={styles.monthDayText}>{dayNumber}</Text>
        {hasEvents && <View style={styles.eventIndicator} />}
      </View>
    );
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const getMonthDays = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString('default', { month: 'long' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar Assistant</Text>
      </View>
      <View style={styles.controls}>
        <Picker
          selectedValue={view}
          style={styles.picker}
          onValueChange={(itemValue) => setView(itemValue)}
        >
          <Picker.Item label="Day" value="day" />
          <Picker.Item label="Week" value="week" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>
        <View style={styles.navigation}>
          <Button title="<" onPress={handlePrevious} />
          <Button title=">" onPress={handleNext} />
        </View>
      </View>
      {view === 'week' && (
        <>
          <Text style={styles.weekRangeText}>
            {getWeekDays(currentDate)[0].toDateString()} - {getWeekDays(currentDate)[6].toDateString()}
          </Text>
          <ScrollView horizontal style={styles.weekContainer} showsHorizontalScrollIndicator={false}>
            {getWeekDays(currentDate).map((day) => (
              <View key={day.toISOString()} style={styles.dayWrapper}>
                {renderDay(day)}
              </View>
            ))}
          </ScrollView>
        </>
      )}
      {view === 'day' && (
        <ScrollView style={styles.dayViewContainer}>
          {renderDay(currentDate)}
        </ScrollView>
      )}
      {view === 'month' && (
        <>
          <Text style={styles.monthText}>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</Text>
          <View style={styles.monthContainer}>
            {getMonthDays(currentDate).map((day) => (
              <View key={day.toISOString()} style={styles.monthDayWrapper}>
                {renderMonthDay(day)}
              </View>
            ))}
          </View>
        </>
      )}
      {view === 'year' && (
        <ScrollView style={styles.yearContainer}>
          {Array.from({ length: 12 }, (_, i) => (
            <View key={i} style={styles.monthWrapper}>
              <Text style={styles.monthText}>{getMonthName(i)}</Text>
              <View style={styles.monthContainer}>
                {getMonthDays(new Date(currentDate.getFullYear(), i)).map((day) => (
                  <View key={day.toISOString()} style={styles.monthDayWrapper}>
                    {renderMonthDay(day)}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>User Information</Text>
        {user && (
          <>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Birthdate: {user.birthdate}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
  navigation: {
    flexDirection: 'row',
  },
  weekRangeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  weekContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  dayWrapper: {
    width: 100,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    marginBottom: 10,
  },
  todayText: {
    color: '#ff6347',
  },
  hour: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  hourText: {
    fontSize: 14,
    color: '#888',
  },
  eventText: {
    fontSize: 12,
    color: '#ff6347',
  },
  dayViewContainer: {
    flex: 1,
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthDayWrapper: {
    width: '14.28%',
    alignItems: 'center',
    marginVertical: 5,
  },
  monthDayContainer: {
    alignItems: 'center',
  },
  monthDayText: {
    fontSize: 14,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff6347',
    marginTop: 2,
  },
  yearContainer: {
    flex: 1,
  },
  monthWrapper: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
