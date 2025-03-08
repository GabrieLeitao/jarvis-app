import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { styles } from '../styles';

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  reminder: string;
  recurring: string;
}

interface User {
  events: Event[];
}

interface CalendarProps {
  user: User | null;
  view: 'day' | 'week' | 'month' | 'year';
  currentDate: Date;
  darkMode: boolean;
  setEditEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  handleEventPress: (event: Event) => void;
}

export default function Calendar({ user, view, currentDate, darkMode, setEditEvent, handleEventPress }: CalendarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDateState, setCurrentDate] = useState(currentDate);
  const [hourBlockHeight, setHourBlockHeight] = useState(50); // Default value

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const onHourLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHourBlockHeight(height);
  };

  const renderHour = (hour: number) => (
    <View style={styles.hour} onLayout={onHourLayout}>
      <Text style={styles.hourText}>{hour}:00</Text>
    </View>
  );

  const renderDay = (day: Date) => {
    const dayNumber = day.getDate();
    const isToday = day.toDateString() === new Date().toDateString();
    const events = user?.events.filter(event => new Date(event.date).toDateString() === day.toDateString()) || [];

    const renderEvent = (event: Event) => {
      const eventStart = new Date(`${day.toISOString().split('T')[0]}T${event.startTime}`);
      const eventEnd = new Date(`${day.toISOString().split('T')[0]}T${event.endTime}`);
      const startHour = eventStart.getHours();
      const endHour = eventEnd.getHours();
      const top = startHour * hourBlockHeight + (eventStart.getMinutes() * hourBlockHeight / 60);
      const height = (endHour - startHour) * hourBlockHeight + ((eventEnd.getMinutes() - eventStart.getMinutes()) * hourBlockHeight / 60);

      return (
        <TouchableOpacity
          key={event.id}
          style={[styles.event, { top, height, width: '100%' }]}
          onPress={() => handleEventPress(event)}
        >
          <Text style={styles.eventText}>{event.title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>{dayNumber}</Text>
        <View style={styles.dayEventsContainer}>
          {Array.from({ length: 24 }, (_, i) => (
            <View key={i} style={styles.hour}>
              {renderHour(i)}
            </View>
          ))}
          {events.map(renderEvent)}
        </View>
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

  const currentHourLine = () => {
    if (currentTime.toDateString() === currentDate.toDateString()) {
      const top = (currentTime.getHours() * hourBlockHeight) + (currentTime.getMinutes() * hourBlockHeight / 60);
      return <View style={[styles.currentHourLine, { top }]} />;
    }
    return null;
  };

  const renderCalendar = () => {
    switch (view) {
      case 'day':
        return (
          <ScrollView style={styles.dayViewContainer}>
            {renderDay(currentDate)}
            {currentHourLine()}
          </ScrollView>
        );
      case 'week':
        return (
          <>
            <Text style={[styles.weekRangeText, darkMode && styles.darkText]}>
              {getWeekDays(currentDate)[0].toDateString()} - {getWeekDays(currentDate)[6].toDateString()}
            </Text>
            <ScrollView horizontal style={styles.weekContainer} showsHorizontalScrollIndicator={false}>
              <ScrollView style={styles.dayViewContainer} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', width: getWeekDays(currentDate).length * 100 }}>
                  <View style={styles.hourColumn}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <View key={i} style={styles.hour}>
                        {renderHour(i)}
                      </View>
                    ))}
                  </View>
                  {getWeekDays(currentDate).map((day, index) => (
                    <View key={day.toISOString()} style={[styles.dayWrapper, index < 6 && styles.verticalLine]}>
                      {renderDay(day)}
                    </View>
                  ))}
                  {currentHourLine()}
                </View>
              </ScrollView>
            </ScrollView>
          </>
        );
      case 'month':
        return (
          <>
            <Text style={[styles.monthText, darkMode && styles.darkText]}>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</Text>
            <CalendarList
              current={currentDate.toISOString().split('T')[0]}
              pastScrollRange={12}
              futureScrollRange={12}
              scrollEnabled
              showScrollIndicator
              onDayPress={(day) => setCurrentDate(new Date(day.dateString))}
              markedDates={user?.events.reduce((acc, event) => {
                acc[event.date] = { marked: true };
                return acc;
              }, {} as Record<string, any>)}
              theme={{
                calendarBackground: darkMode ? '#1e1e1e' : '#fff',
                textSectionTitleColor: darkMode ? '#fff' : '#000',
                dayTextColor: darkMode ? '#fff' : '#000',
                todayTextColor: '#ff6347',
                selectedDayBackgroundColor: '#ff6347',
                selectedDayTextColor: '#fff',
                monthTextColor: darkMode ? '#fff' : '#000',
                indicatorColor: darkMode ? '#fff' : '#000',
              }}
            />
          </>
        );
      case 'year':
        return (
          <ScrollView style={styles.yearContainer}>
            {Array.from({ length: 12 }, (_, i) => (
              <View key={i} style={styles.monthWrapper}>
                <Text style={[styles.monthText, darkMode && styles.darkText]}>{getMonthName(i)}</Text>
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
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderCalendar()}
      <View style={[styles.clockContainer, darkMode && styles.darkClockContainer, { position: 'absolute', bottom: 10, right: 10 }]}>
        <Text style={[styles.clockText, darkMode && styles.darkClockText]}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </>
  );
}
