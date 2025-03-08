import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event: Event | null;
  darkMode: boolean;
}

const TimePicker = ({ value, onChange }: { value: Date; onChange: (date: Date) => void }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Picker
        selectedValue={value.getHours()}
        style={{ width: 100 }}
        onValueChange={(itemValue) => {
          const newDate = new Date(value);
          newDate.setHours(itemValue);
          onChange(newDate);
        }}
      >
        {hours.map((hour) => (
          <Picker.Item key={hour} label={hour.toString()} value={hour} />
        ))}
      </Picker>
      <Text>:</Text>
      <Picker
        selectedValue={value.getMinutes()}
        style={{ width: 100 }}
        onValueChange={(itemValue) => {
          const newDate = new Date(value);
          newDate.setMinutes(itemValue);
          onChange(newDate);
        }}
      >
        {minutes.map((minute) => (
          <Picker.Item key={minute} label={minute.toString()} value={minute} />
        ))}
      </Picker>
    </View>
  );
};

const renderDateTimePicker = (value: Date, onChange: (date: Date) => void, mode: 'date' | 'time') => {
  if (Platform.OS === 'web') {
    const formattedValue = mode === 'date' ? value.toISOString().split('T')[0] : value.toTimeString().split(' ')[0].substring(0, 5);
    return (
      <input
        type={mode === 'date' ? 'date' : 'time'}
        value={formattedValue}
        onChange={(e) => {
          const newValue = mode === 'date' ? new Date(e.target.value) : new Date(value.toDateString() + ' ' + e.target.value);
          onChange(newValue);
        }}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
    );
  } else {
    return (
      <DateTimePicker
        style={styles.timePicker}
        value={value}
        mode={mode}
        display="default"
        onChange={(event, selectedDate) => onChange(selectedDate || value)}
      />
    );
  }
};

export default function EventModal({ visible, onClose, onSave, event, darkMode }: EventModalProps) {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(new Date(event?.date || Date.now()));
  const [startTime, setStartTime] = useState(new Date(event?.startTime || Date.now()));
  const [endTime, setEndTime] = useState(new Date(event?.endTime || Date.now()));
  const [reminder, setReminder] = useState(event?.reminder || '10 minutes before');
  const [recurring, setRecurring] = useState(event?.recurring || 'None');

  const handleSave = () => {
    const newEvent = {
      id: event ? event.id : Date.now(),
      title,
      date: date.toISOString().split('T')[0],
      startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reminder,
      recurring,
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalView, darkMode && styles.darkModalView]}>
        <Text style={[styles.modalText, darkMode && styles.darkText]}>{event ? 'Edit Event' : 'Add New Event'}</Text>
        <TextInput
          style={[styles.input, darkMode && styles.darkInput]}
          placeholder="Title"
          placeholderTextColor={darkMode ? "#ccc" : "#888"}
          value={title}
          onChangeText={setTitle}
        />
        <Text style={[styles.label, darkMode && styles.darkText]}>Date:</Text>
        {renderDateTimePicker(date, setDate, 'date')}
        <Text style={[styles.label, darkMode && styles.darkText]}>Start Time:</Text>
        {renderDateTimePicker(startTime, setStartTime, 'time')}
        <Text style={[styles.label, darkMode && styles.darkText]}>End Time:</Text>
        {renderDateTimePicker(endTime, setEndTime, 'time')}
        <Text style={[styles.label, darkMode && styles.darkText]}>Reminder:</Text>
        <Picker
          selectedValue={reminder}
          style={[styles.picker, darkMode && styles.darkPicker]}
          onValueChange={(itemValue) => setReminder(itemValue)}
        >
          <Picker.Item label="10 minutes before" value="10 minutes before" />
          <Picker.Item label="30 minutes before" value="30 minutes before" />
          <Picker.Item label="1 hour before" value="1 hour before" />
          <Picker.Item label="1 day before" value="1 day before" />
        </Picker>
        <Text style={[styles.label, darkMode && styles.darkText]}>Recurring:</Text>
        <Picker
          selectedValue={recurring}
          style={[styles.picker, darkMode && styles.darkPicker]}
          onValueChange={(itemValue) => setRecurring(itemValue)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, darkMode && styles.darkButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
