import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from "react";
import { Animated, Platform, Switch, Text, TouchableOpacity, View } from "react-native";
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import EventOptionsModal from './components/EventOptionsModal'; // Import EventOptionsModal
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
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [slideAnim] = useState(new Animated.Value(300)); // Initial position off-screen

  useEffect(() => {
    const fetchUserData = async () => {
      if (Platform.OS === 'web') {
        // Handle web-specific logic
        try {
          const userData = localStorage.getItem('userInfo');
          if (userData) {
            setUser(JSON.parse(userData) as User);
          } else {
            console.warn('userInfo not found in localStorage, initializing with empty user data.');
            setUser({ name: '', email: '', birthdate: '', events: [] });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Handle native-specific logic
        const fileUri = FileSystem.documentDirectory + 'userInfo.json';
        try {
          const userData = await FileSystem.readAsStringAsync(fileUri);
          setUser(JSON.parse(userData) as User);
        } catch (error) {
          if ((error as any).code === 'E_FILE_NOT_FOUND') {
            console.warn('userInfo.json not found, initializing with empty user data.');
            setUser({ name: '', email: '', birthdate: '', events: [] });
          } else {
            console.error('Error fetching user data:', error);
          }
        }
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
      if (Platform.OS === 'web') {
        // Handle web-specific logic
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      } else {
        // Handle native-specific logic
        const fileUri = FileSystem.documentDirectory + 'userInfo.json';
        try {
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedUser));
        } catch (error) {
          console.error('Error saving event:', error);
        }
      }
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (user) {
      const updatedEvents = user.events.filter(event => event.id !== id);
      const updatedUser = { ...user, events: updatedEvents };
      setUser(updatedUser);

      // Save to JSON file
      if (Platform.OS === 'web') {
        // Handle web-specific logic
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      } else {
        // Handle native-specific logic
        const fileUri = FileSystem.documentDirectory + 'userInfo.json';
        try {
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedUser));
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      }
      handleCloseOptionsModal();
    }
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setOptionsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, // Add useNativeDriver
    }).start();
  };

  const handleCloseOptionsModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false, // Add useNativeDriver
    }).start(() => {
      setOptionsModalVisible(false);
      setSelectedEvent(null);
    });
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
        <View style={[styles.pickerContainer, darkMode && styles.darkPickerContainer]}>
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
        </View>
        <View style={styles.navigation}>
          <TouchableOpacity style={[styles.navButton, darkMode && styles.darkNavButton]} onPress={handlePrevious}>
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, darkMode && styles.darkNavButton]} onPress={handleNext}>
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
        handleEventPress={handleEventPress}
      />
      <UserInfo user={user} darkMode={darkMode} />
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
        event={editEvent}
        darkMode={darkMode}
      />
      {selectedEvent && (
        <Animated.View style={[styles.optionsModal, { transform: [{ translateX: slideAnim }] }]}>
          <EventOptionsModal
            visible={optionsModalVisible}
            onClose={handleCloseOptionsModal}
            event={selectedEvent}
            onDelete={handleDeleteEvent}
            darkMode={darkMode}
          />
        </Animated.View>
      )}
    </View>
  );
}
