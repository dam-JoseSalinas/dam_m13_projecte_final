import React, { useState, useContext } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import styles from '../../../../styles/LoginStyles';
import themeContext from '../../../../constants/ThemeContext';
import config from '../../../../settings/Config';

const Login = () => {
    const theme = useContext(themeContext);
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const navigation = useNavigation();
    const isDoctor = email.endsWith('@joyclinc.es');

    const handleLogin = async () => {
        try {
            const url = isDoctor ? config.loginAPI + 'doctor/' : config.loginAPI + 'login/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, psw }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                await AsyncStorage.setItem("token", token);

                const targetScreen = isDoctor ? 'MenuInferior2' : 'MenuInferior';

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: targetScreen }],
                    })
                );
            } else {
                const errorMessage = await response.text();
                Alert.alert('Error', errorMessage.split(":")[1].split("\"")[1]);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            Alert.alert('Error', 'Ha ocurrido un error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleRegisterPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Register' }],
        });
    };

    const handleGuestPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MenuInferior' }],
        });
    }


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Image
                        source={theme.logo}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />
                    <TextInput
                        placeholder="Password"
                        value={psw}
                        onChangeText={setPsw}
                        secureTextEntry={true}
                        style={[styles.input, { backgroundColor: theme.input, color: theme.color, borderColor: theme.lineColor }]}
                        placeholderTextColor={theme.color}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.buttonLog, { backgroundColor: theme.background, borderColor: theme.lineColor }]}
                            onPress={handleLogin}
                        >
                            <Text style={{ color: theme.color }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonReg, { backgroundColor: theme.background, borderColor: theme.lineColor }]}
                            onPress={handleRegisterPress}
                        >
                            <Text style={{ color: theme.color }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonGuest, { backgroundColor: theme.background, borderColor: theme.lineColor }]}
                        onPress={handleGuestPress}
                    >
                        <Text style={{ color: theme.color }}>Guest</Text>
                    </TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        );
    };

    Login.id = 0;

    export default Login;
