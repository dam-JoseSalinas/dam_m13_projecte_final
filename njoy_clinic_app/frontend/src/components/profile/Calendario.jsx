import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/CalendarioStyles';
import { View, TouchableOpacity, Text, Alert, Modal, TextInput, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../constants/ThemeContext';
import ProfileContext from '../../constants/ProfileContext';
import config from '../../settings/Config';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const navigation = useNavigation();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { events, fetchEvents, setEvents, fetchCountEvents, countEvents, setCountEvents } = useContext(ProfileContext);
  useEffect(() => {
    fetchEvents();
    fetchCountEvents();
  }, []);

  const handleDatePress = (date) => {
    setSelectedDate(date.dateString);
    // Setear la fecha seleccionada en el evento
    setEventStart(moment(date.dateString).startOf('day').toDate());
    setEventEnd(moment(date.dateString).endOf('day').toDate());
  };

  const handleAddEvent = () => {
    setModalVisible(true);
  };

  const redirectGetEvents = () => {
    navigation.navigate('Profile', { selectedDate });
  };

  const handleSaveEvent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      const response = await axios.post(config.loginAPI + 'add_event/', {
        title: eventName,
        start: moment(eventStart).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(eventEnd).format("YYYY-MM-DD HH:mm:ss"),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        fetchEvents();
        fetchCountEvents();
        setModalVisible(false);
        setEventName('');
        setEventStart(new Date());
        setEventEnd(new Date());
      } else {
        Alert.alert('Error', 'No se pudo guardar el evento. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      Alert.alert('Error', 'Hubo un error al guardar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  const theme = useContext(themeContext)

  const [darkMode, setDarkMode] = useState(false)

  return (
    <View style={[styles.container, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
      <Calendar
        current={moment().format('YYYY-MM-DD')}
        markedDates={{
          ...events,
          [selectedDate]: { selected: true, selectedColor: 'gray', backgroundColor: theme.background },
        }}
        onDayPress={(day) => handleDatePress(day)}
        style={[styles.Calendar, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}
        theme={{
          calendarBackground: {backgroundColor: theme.theme},
          textSectionTitleColor: theme.color,
          selectedDayBackgroundColor: theme.color,
          selectedDayTextColor: theme.color,
          todayTextColor: theme.color,
          dayTextColor: theme.color,
          textDisabledColor: theme.color,
          selectedDotColor: theme.color,
          textDayFontColor: theme.color,
          textDayHeaderFontColor: theme.color,
        }}
      />
      {selectedDate && (
        <View style={[styles.actions, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
          <TouchableOpacity onPress={handleAddEvent} style={[styles.button, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.buttonText, { color: theme.color }]}>Agregar evento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectGetEvents} style={[styles.button, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.buttonText, { color: theme.color }]}>Mostrar eventos</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[styles.centeredView, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
          <View style={[styles.modalView, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.modalText, { color: theme.color }]}>Ingrese el nombre del evento:</Text>
            <TextInput
              style={[styles.textInput, { color: theme.color }]}
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Nombre del evento"
              placeholderTextColor={theme.color}
            />
            <Text style={[styles.modalText, { color: theme.color }]}>Seleccione la hora de inicio:</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={[styles.timeText, { color: theme.color }]}>{moment(eventStart).format('HH:mm')}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={eventStart}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) {
                    setEventStart(selectedDate);
                  }
                }}
              />
            )}
            <Text style={[styles.modalText, { color: theme.color }]}>Seleccione la hora de inicio:</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={[styles.timeText, { color: theme.color }]}>{moment(eventEnd).format('HH:mm')}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={eventEnd}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) {
                    setEventEnd(selectedDate);
                  }
                }}
              />
            )}
            <Button title="Guardar" onPress={handleSaveEvent} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Calendario;