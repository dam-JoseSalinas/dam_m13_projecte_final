import React, { useState, useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import styles from '../../../../styles/RegisterStyles'
import themeContext from '../../../../constants/ThemeContext';
import config from '../../../../settings/Config';

export default function Register() {
    const theme = useContext(themeContext);
    const [username, setUsername] = useState('');
    const [userlastname, setUserLastname] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        if (username && psw && userlastname && number && email) {
            fetch(config.loginAPI + 'api/v1/registros/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    surname: userlastname,
                    number: number,
                    email: email,
                    psw: psw,
                }),
            })
            .then(response => {
                if (response.ok) {
                    Alert.alert("Creación de cuenta exitosa");
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Login'}],
                        })
                    );
                } else {
                    response.text().then(errorMessage => {
                        Alert.alert(errorMessage.split(":")[1].split("\"")[1]);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error', 'Hubo un problema durante el registro. Por favor, inténtalo de nuevo.');
            });
        } else {
            Alert.alert('Error', 'Por favor, completa todos los campos');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Registro de usuarios
                    </Text>
                    <Image
                        source={theme.logo}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                    <TextInput
                        placeholder='Nombre'
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TextInput
                        placeholder='Apellido'
                        value={userlastname}
                        onChangeText={text => setUserLastname(text)}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TextInput
                        placeholder='Número'
                        value={number}
                        keyboardType='number-pad'
                        onChangeText={text => setNumber(text)}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TextInput
                        placeholder='Contraseña'
                        value={psw}
                        onChangeText={text => setPsw(text)}
                        secureTextEntry={true}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.background, borderColor: theme.lineColor }]} onPress={handleRegister}>
                        <Text style={{ color: theme.color }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
