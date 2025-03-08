import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        <Text style={[styles.input, darkMode && styles.darkInput]}>Date:</Text>
        <DateTimePicker
          style={styles.timePicker}
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
        />
        <Text style={[styles.input, darkMode && styles.darkInput]}>Start Time:</Text>
        <TimePicker value={startTime} onChange={setStartTime} />
        <Text style={[styles.input, darkMode && styles.darkInput]}>End Time:</Text>
        <TimePicker value={endTime} onChange={setEndTime} />
        <Text style={[styles.input, darkMode && styles.darkInput]}>Reminder:</Text>
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
        <Text style={[styles.input, darkMode && styles.darkInput]}>Recurring:</Text>
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
