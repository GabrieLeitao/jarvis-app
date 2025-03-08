import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import UserInfo from './components/UserInfo';
import { styles } from './styles';

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
  name: string;
  email: string;
  birthdate: string;
  events: Event[];
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const fileUri = FileSystem.documentDirectory + 'userInfo.json';
      try {
        const userData = await FileSystem.readAsStringAsync(fileUri);
        setUser(JSON.parse(userData) as User);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
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

  const handleSaveEvent = async (event: Event) => {
    if (user) {
      const updatedUser = {
        ...user,
        events: editEvent
          ? user.events.map(e => e.id === event.id ? event : e)
          : [...user.events, event],
      };
      setUser(updatedUser);
      setModalVisible(false);
      setEditEvent(null);

      // Save to JSON file
      const fileUri = FileSystem.documentDirectory + 'userInfo.json';
      try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error saving event:', error);
      }
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (user) {
      const updatedEvents = user.events.filter(event => event.id !== id);
      const updatedUser = { ...user, events: updatedEvents };
      setUser(updatedUser);

      // Save to JSON file
      const fileUri = FileSystem.documentDirectory + 'userInfo.json';
      try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, darkMode && styles.darkHeaderText]}>Calendar Assistant</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      <View style={styles.controls}>
        <Picker
          selectedValue={view}
          style={[styles.picker, darkMode && styles.darkPicker]}
          onValueChange={(itemValue) => setView(itemValue)}
        >
          <Picker.Item label="Day" value="day" />
          <Picker.Item label="Week" value="week" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>
        <View style={styles.navigation}>
          <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={handlePrevious}>
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={handleNext}>
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={[styles.addButton, darkMode && styles.darkButton, { marginTop: 10 }]} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
      <Calendar
        user={user}
        view={view}
        currentDate={currentDate}
        darkMode={darkMode}
        setEditEvent={setEditEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
      <UserInfo user={user} darkMode={darkMode} />
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
        event={editEvent}
        darkMode={darkMode}
      />
    </View>
  );
}
