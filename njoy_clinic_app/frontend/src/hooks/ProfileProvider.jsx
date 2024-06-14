// ProfileContext.js
import React, { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import ProfileContext from '../constants/ProfileContext';
import config from '../settings/Config';

const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(require('../assets/images/foto_perfil/default.jpg'));
  const [count, setCount] = useState([])
  const [countDoctors, setCountDoctors] = useState([])
  const [countEvents, setCountEvents] = useState(null);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    psw: "",
    bio: "",
    birth_date: new Date(),
    address: "",
    city: "",
    country: "",
    postal_code: "",
    photo: "",
  });
  const [usersData, setUsersData] = useState({
    user: {
      name: "",
      surname: "",
      number: "",
      email: "",
      psw: "",
      bio: "",
      birth_date: new Date(),
      address: "",
      city: "",
      country: "",
      postal_code: "",
      photo: "",
    },
    registros: []
  });
  const [userDoctor, setUserDoctor] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    psw: "",
    specialty: "",
  });

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }

      const response = await fetch(config.loginAPI + 'profile/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        setUserData(data);
        if (data.photo) {
          setProfileImage({ uri: data.photo });
        }
      } else {

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
    }
  };

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }

      const response = await axios.get(config.loginAPI + 'all_events/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedEvents = response.data.map(event => ({
        ...event,
        start: moment(event.start, "MM/DD/YYYY, HH:mm:ss").toDate(),
        end: moment(event.end, "MM/DD/YYYY, HH:mm:ss").toDate(),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      //console.error('Error fetching events:', error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await fetch(config.loginAPI + 'api/v1/registros/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Devuelve los datos en lugar de establecer el estado local
      } else {
        throw new Error('Error al obtener los registros');
      }
    } catch (error) {
      console.error('Error fetching registros:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  const fetchCountRegister = async () => {
    try {
      const response = await fetch(config.loginAPI + 'count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data)
      } else {

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los registros.');
    };
  }

  const fetchCountEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }

      const response = await fetch(config.loginAPI + 'events/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCountEvents(data)
      } else {

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los eventos.');
    }
  };
  const fetchCountDoctores = async () => {
    try {
      const response = await fetch(config.loginAPI + 'doctorsCount', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCountDoctors(data)
      } else {

      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos de los registros.');
    };
  }
  const fetchDoctor = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        //throw new Error('El token no está disponible');
      }

      const response = await fetch(config.loginAPI + 'doctor_perfil/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        setUserDoctor(data);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
    }
  };
  const isDoctor = userDoctor.email && userDoctor.email.endsWith('@joyclinc.es');

  return (
    <ProfileContext.Provider value={{ userData, events, usersData, count, countEvents, countDoctors, userDoctor, isDoctor, setCountDoctors, setProfileImage, setCountEvents, setCount, setUsersData, setUserData, setEvents, fetchData, fetchEvents, fetchRegistros, fetchCountRegister, fetchCountEvents, fetchCountDoctores, fetchDoctor }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
