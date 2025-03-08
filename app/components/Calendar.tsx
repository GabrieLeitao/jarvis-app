import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
  handleDeleteEvent: (id: number) => void;
}

export default function Calendar({ user, view, currentDate, darkMode, setEditEvent, handleDeleteEvent }: CalendarProps) {
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
            {events.filter(event => {
              const eventStart = new Date(`${day.toISOString().split('T')[0]}T${event.startTime}`);
              const eventEnd = new Date(`${day.toISOString().split('T')[0]}T${event.endTime}`);
              return eventStart.getHours() <= i && eventEnd.getHours() >= i;
            }).map(event => (
              <TouchableOpacity key={event.id} style={styles.event} onPress={() => setEditEvent(event)}>
                <Text style={styles.eventText}>{event.title}</Text>
                <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={() => handleDeleteEvent(event.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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

  const currentHourLine = () => {
    const now = new Date();
    if (now.toDateString() === currentDate.toDateString()) {
      const top = (now.getHours() * 50) + (now.getMinutes() * 50 / 60);
      return <View style={[styles.currentHourLine, { top }]} />;
    }
    return null;
  };

  return (
    <>
      {view === 'week' && (
        <>
          <Text style={[styles.weekRangeText, darkMode && styles.darkText]}>
            {getWeekDays(currentDate)[0].toDateString()} - {getWeekDays(currentDate)[6].toDateString()}
          </Text>
          <ScrollView horizontal style={styles.weekContainer} showsHorizontalScrollIndicator={false}>
            <ScrollView style={styles.dayViewContainer} showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {getWeekDays(currentDate).map((day) => (
                  <View key={day.toISOString()} style={styles.dayWrapper}>
                    {renderDay(day)}
                  </View>
                ))}
              </View>
              {currentHourLine()}
            </ScrollView>
          </ScrollView>
        </>
      )}
      {view === 'day' && (
        <ScrollView style={styles.dayViewContainer}>
          {renderDay(currentDate)}
          {currentHourLine()}
        </ScrollView>
      )}
      {view === 'month' && (
        <>
          <Text style={[styles.monthText, darkMode && styles.darkText]}>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</Text>
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
      )}
    </>
  );
}
