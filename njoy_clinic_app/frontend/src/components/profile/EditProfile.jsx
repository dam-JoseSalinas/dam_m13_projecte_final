import React, { useState, useEffect, useContext } from "react";
import { Text, View, SafeAreaView, Alert, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import themeContext from "../../constants/ThemeContext";
import ProfileContext from "../../constants/ProfileContext";
import styles from '../../styles/EditProfileStyles'
import config from "../../settings/Config";

export default function EditProfile() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../../assets/images/foto_perfil/default.jpg'));
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { userData, fetchData, setUserData} = useContext(ProfileContext);
  const theme = useContext(themeContext);

  const updateProfileData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('El token no está disponible');
      }

      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('surname', userData.surname);
      formData.append('number', userData.number);
      formData.append('email', userData.email);
      formData.append('psw', userData.psw);
      formData.append('bio', userData.bio);
      formData.append('birth_date', userData.birth_date);
      formData.append('address', userData.address);
      formData.append('city', userData.city);
      formData.append('country', userData.country);
      formData.append('postal_code', userData.postal_code);

      const response = await fetch(config.loginAPI + 'updateProfile/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        console.log("updateProfileData: Success");
        return true; 
      } else {
        const errorData = await response.json();
        console.error('Error Data:', errorData); 
        throw new Error('Error updating user data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar los datos del usuario.');
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAndNavigate = async () => {
    const success = await updateProfileData();
    if (success) {
      console.log("Navigating to Profile");
      navigation.navigate('Profile');
    } else {
      console.log("Failed to update data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const changeProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso necesario', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.assets[0].uri === true) {
      return;
    }

    setProfileImage({ uri: pickerResult.uri });
    setUserData(prevData => ({ ...prevData, photo: pickerResult.uri }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || userData.birth_date;
    setShowDatePicker(Platform.OS === 'ios');
    const formattedDate = currentDate.toISOString().split('T')[0];
    setUserData(prevData => ({ ...prevData, birth_date: formattedDate }));
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.theme}, {borderColor:theme.lineColor}]}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent, {backgroundColor: theme.theme}]}>
        <Text style={[styles.title, {color: theme.color}]}>Editar Perfil</Text>
        <View style={styles.line}></View>
        <View style={styles.headerInfo}>
          <TouchableOpacity onPress={changeProfileImage}>
            <View style={styles.profileImageContainer}>
              <Image
                source={userData.photo ? { uri: config.loginAPI + userData.photo } : profileImage}
                style={styles.profileImage}
              />
              <View style={styles.editIconContainer}>
                <AntDesign name="edit" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.nameContainer}>
            <TextInput
              style={[styles.inputNames, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.name}
              onChangeText={text => setUserData(prevData => ({ ...prevData, name: text }))}
              placeholder='Nombre'
            />
            <TextInput
              style={[styles.inputNames, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.surname}
              onChangeText={text => setUserData(prevData => ({ ...prevData, surname: text }))}
              placeholder='Apellido'
            />
          </View>
        </View>
        <View style={styles.textFieldsContainer}>
          <View style={styles.viewNumber}>
            <TextInput
              style={[styles.inputEmail, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.email}
              onChangeText={text => setUserData(prevData => ({ ...prevData, email: text }))}
              placeholder="Email"
            />
            <TextInput
              style={[styles.inputNumber, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.number}
              onChangeText={text => setUserData(prevData => ({ ...prevData, number: text }))}
              placeholder='Número'
            />
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
            value={userData.psw}
            onChangeText={text => setUserData(prevData => ({ ...prevData, psw: text }))}
            placeholder='Contraseña'
            secureTextEntry={true}
          />
          <View style={styles.date}>
            <TextInput
              style={[styles.inputFecha, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.birth_date ? format(new Date(userData.birth_date), "yyyy-MM-dd") : ""}
              placeholder='Fecha de nacimiento'
            />
            <View style={styles.datePickerContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.textFecha, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}>Seleccionar fecha</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={userData.birth_date ? new Date(userData.birth_date) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>
          <View style={styles.viewAddress}>
            <TextInput
              style={[styles.inputAddres, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.address}
              onChangeText={text => setUserData(prevData => ({ ...prevData,  address: text }))}
              placeholder='Dirección'
            />
            <TextInput
              style={[styles.inputCode, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.postal_code}
              onChangeText={text => setUserData(prevData => ({ ...prevData, postal_code: text }))}
              placeholder='Código Postal'
            />
          </View>
          <View style={styles.viewNumber}>
            <TextInput
              style={[styles.inputAddres, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.city}
              onChangeText={text => setUserData(prevData => ({ ...prevData, city: text }))}
              placeholder='Ciudad'
            />
            <TextInput
              style={[styles.inputCode, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
              value={userData.country}
              onChangeText={text => setUserData(prevData => ({ ...prevData, country: text }))}
              placeholder='País'
            />
          </View>
          <TextInput
            style={[styles.bioInput, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
            value={userData.bio}
            onChangeText={text => setUserData(prevData => ({ ...prevData, bio: text }))}
            placeholder='Biografía'
            multiline={true}
          />
        </View>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.background, color: theme.color, borderColor: theme.lineColor }]} onPress={fetchAndNavigate}>
            <Text style={[styles.buttonText, { color: theme.color, borderColor: theme.lineColor }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

