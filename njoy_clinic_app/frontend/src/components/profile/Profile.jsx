//Profile.jsx
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Alert, FlatList, TextInput, ScrollView, Keyboard, Platform } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import themeContext from "../../constants/ThemeContext";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileContext from '../../constants/ProfileContext';
import styles from '../../styles/ProfileStyles'
import config from "../../settings/Config";

const Profile = () => {
  const navigation = useNavigation();
  const [editingEvent, setEditingEvent] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedStartDate, setEditedStartDate] = useState(new Date());
  const [editedEndDate, setEditedEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const { userData, events, fetchData, fetchEvents, setEvents, count, fetchCountRegister, countEvents, fetchCountEvents, fetchCountDoctores, countDoctors } = useContext(ProfileContext);
  const [profileImage, setProfileImage] = useState(require('../../assets/images/foto_perfil/default.jpg'));
  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false);

  const redirecCalendario = () => {
    navigation.navigate('Calendario');
  };

  const handleEditEvent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      // Formatear las fechas
      const formattedStartDate = moment(editedStartDate).format("YYYY-MM-DD HH:mm:ss");
      const formattedEndDate = moment(editedEndDate).format("YYYY-MM-DD HH:mm:ss");

      // Ocultar el teclado
      Keyboard.dismiss();

      const response = await axios.put(config.loginAPI + `update/${editingEvent.id}/`, {
        title: editedTitle,
        start: formattedStartDate,
        end: formattedEndDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('Evento actualizado correctamente');
        fetchEvents();
        setEditingEvent(null);
        setEditedTitle('');
      } else {
        console.error('Error updating event:', response.data);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      const response = await axios.delete(config.loginAPI + `remove/${eventId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setEvents(events.filter(event => event.id !== eventId));
        Alert.alert('Evento eliminado correctamente');
        fetchCountEvents();
      } else {
        console.error('Error deleting event:', response.data);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDateStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setEditedStartDate(currentDate);
  };

  const handleDateEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedEndDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEditedEndDate(currentDate);
  };

  useEffect(() => {
    fetchData();
    fetchEvents();
    fetchCountRegister();
    fetchCountEvents();
    fetchCountDoctores();
  }, []);

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditedTitle('');
  };

  const redirectEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const renderItem = ({ item }) => {
    if (editingEvent && editingEvent.id === item.id) {
      return (
        <View style={[styles.editContainer, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
          <TextInput
            style={[styles.editInput, { color: theme.color }, { backgroundColor: theme.background }]}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder='Nuevo título'
            placeholderTextColor={theme.color}
          />
          <View style={[styles.dateTimeContainer, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={[styles.dateTimeText, { color: theme.color }]}>Seleccionar fecha y hora de inicio</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={editedStartDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateStartChange}

              />
            )}
          </View>
          <View style={[styles.dateTimeContainer, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={[styles.dateTimeText, { color: theme.color }]}>Seleccionar fecha y hora de fin</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={editedEndDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateEndChange}
              />
            )}

          </View>
          <View style={[styles.buttonContainer, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <TouchableOpacity onPress={handleEditEvent} style={[styles.saveButton, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
              <Text style={[styles.buttonText, { color: theme.color }]}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelEdit} style={[styles.cancelButton, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
              <Text style={[styles.buttonText, { color: theme.color }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.eventItem, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
          <View style={[styles.eventDetails, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.eventTitle, { color: theme.color }]}>{item.title}</Text>
            <Text style={[styles.eventDate, { color: theme.color }]}>
              {`${'Fecha de inicio:'} ${moment(item.start).format("DD/MM/YYYY HH:mm")}`}
            </Text>
            <Text style={[styles.eventDate, { color: theme.color }]}>
              {`${'Fecha de finalización:'} ${moment(item.end).format("DD/MM/YYYY HH:mm")}`}
            </Text>
          </View>
          <View style={[styles.buttonContainer, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
            <TouchableOpacity onPress={() => setEditingEvent(item)}>
              <Text style={[styles.editButton, { color: theme.color }]}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteEvent(item.id)}>
              <Text style={[styles.deleteButton, { color: theme.color }]}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
      <View style={[styles.header, { borderColor: theme.lineColor }]}>
        <View style={[styles.profileInfo, { borderColor: theme.lineColor }]}>
          <Image
            source={userData.photo ? { uri: config.loginAPI + userData.photo } : profileImage}
            style={[styles.profileImage, { borderColor: theme.lineColor }]} />
          <View style={[styles.textosProfile, { borderColor: theme.lineColor }]}>
            <View style={[styles.textName, { borderColor: theme.lineColor }]}>
              <Text style={[styles.username, { color: theme.color }]}>{userData.name} {userData.surname}</Text>
            </View>
            <Text style={[styles.bio, { color: theme.color }]}>{userData.bio}</Text>
            <View style={[styles.locationContainer, { borderColor: theme.lineColor }]}>
              <Entypo
                name="location-pin"
                size={15}
                color={theme.color} />
              <Text style={[styles.locationText, { color: theme.color }]}>{userData.country}</Text>
              <Text style={[styles.locationText, { color: theme.color }]}>{userData.city}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statsContainer, { borderColor: theme.lineColor }]}>
          <View style={[styles.stat, { backgroundColor: theme.theme }, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{count}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Pacientes</Text>
          </View>
          <View style={[styles.stat, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{countEvents}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Eventos</Text>
          </View>
          <View style={[styles.stat, { borderColor: theme.lineColor }]}>
            <Text style={[styles.statNumber, { color: theme.color }]}>{countDoctors}</Text>
            <Text style={[styles.statText, { color: theme.color }]}>Doctores</Text>
          </View>
        </View>
      </View>
      <View style={[styles.buttonsContainer, { borderColor: theme.lineColor }]}>
        <TouchableOpacity style={[styles.buttonEditProfile, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]} onPress={redirectEditProfile}>
          <Text style={[styles.textButton, { color: theme.color }]}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}>
          <Text style={[styles.textButton, { color: theme.color }]}>Compartir Perfil</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.styleCalendario, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}
        onPress={redirecCalendario}>
        <Text style={[styles.textButton, { color: theme.color }]}>Calendario</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.color }]}>Todos los Eventos</Text>
      <ScrollView style={styles.ScrollView}>
        <View style={[styles.containerlist]}>
          <FlatList
            data={[userData, ...events]}
            renderItem={({ item, index }) => {
              if (index === 0) {
                // Renderizar el perfil
                return (
                  <View>
                    {/* Contenido del perfil */}
                  </View>
                );
              } else {
                // Renderizar eventos
                return renderItem({ item });
              }
            }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[styles.containerFlalist, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
