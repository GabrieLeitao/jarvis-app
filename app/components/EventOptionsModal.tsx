import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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

interface EventOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  event: Event;
  onDelete: (id: number) => void;
  darkMode: boolean;
}

export default function EventOptionsModal({ visible, onClose, event, onDelete, darkMode }: EventOptionsModalProps) {
  if (!visible) return null;

  return (
    <View style={[styles.optionsModalView, darkMode && styles.darkOptionsModalView]}>
      <Text style={[styles.modalText, darkMode && styles.darkText]}>Event Details</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>Title: {event.title}</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>Date: {event.date}</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>Start Time: {event.startTime}</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>End Time: {event.endTime}</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>Reminder: {event.reminder}</Text>
      <Text style={[styles.label, darkMode && styles.darkText]}>Recurring: {event.recurring}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={() => onDelete(event.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
