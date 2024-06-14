import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useContext } from "react";
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Feather, EvilIcons, Entypo, FontAwesome6, AntDesign } from '@expo/vector-icons';
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from "../../../../constants/ThemeContext";
import styles from '../../../../styles/SettingsStyles'

export default function Settings(){ 
    const [text, setText] = useState('')
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        bio: "",
        birth_date: new Date(), 
        city: "",
        country: "",
        photo: "",
      });
      
    const dispotivos = () => {
        navigation.navigate('Dispositivos')
    }
    const editProfile = () => {
        navigation.navigate('EditProfile')
    }
    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Token antes de eliminar:', token);

            await AsyncStorage.removeItem('token');
            console.log('Token eliminado:', token);

            setUserData({
                name: "",
                surname: "",
                bio: "",
                birth_date: new Date(), 
                city: "",
                country: "",
                photo: "",
            });
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } 
    };    

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.theme}]}>
            <ScrollView style = {[styles.ScrollView, {backgroundColor:theme.theme}]}>
            <View style = {[styles.content, {backgroundColor:theme.theme}]}>
                    <Text style = {[styles.settings, {color:theme.color}]}>Configuración</Text>
                    <Text style = {[styles.cuenta, {color:theme.color}]}>Cuenta</Text>
                    <View style = {[styles.configPerfil, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="person-circle-outline" 
                            size={24} 
                            resizeMode='contain' />
                        <View style={[{ flex: 1 }]}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Gestor de cuenta</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Datos personales, contraseñas, seguridad...</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} 
                            onPress={editProfile} />
                    </View>
                    <Text style = {[styles.informacion, {color:theme.color, backgroundColor: theme.back}]}>Información</Text>
                    <View style = {[styles.configNoti, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="notifications-outline" 
                            size={24} 
                            resizeMode='contain' />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Notificaciones</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Notificaciones</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <Feather 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="activity" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Tu actividad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Actividad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <EvilIcons 
                            style={[styles.iconSearch, {color: theme.color}]}                       
                            name="archive" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Archivos</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Archivos</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <Entypo 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="back-in-time" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Tiempo Transcurrido</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Gestor de Tiempo Transcurrido</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <MaterialIcons
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="security" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Seguridad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Seguridad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="lock-closed-outline" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Privacidad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Privacidad</Text>
                        </View>
                        <MaterialIcons
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configNoti, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="language" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Idioma</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración del Idioma</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <FontAwesome6 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="universal-access" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Accesibilidad</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Accesibilidad</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="color-palette-outline" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Apariencia</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Tema</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="devices" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Dispositivos</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Dispositivos</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} 
                            onPress={dispotivos}/>
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="keyboard-voice" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Voz</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Voz</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24} />
                    </View>
                    <View style = {[styles.configInfo, {backgroundColor:theme.theme}]}>
                        <AntDesign 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="camerao" 
                            size={24} />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Video</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Configuración de Video</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24}  />
                    </View>
                    <Text style = {[styles.cuenta, {color:theme.color}]}>Cerrar Sesión</Text>
                    <View style = {[styles.configPerfil, {backgroundColor:theme.theme}]}>
                        <Ionicons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="exit-outline" 
                            size={24} 
                            //onPress={exit} 
                            />
                        <View style={{ flex: 1 ,backgroundColor:theme.theme}}>
                            <Text style = {[styles.gestorCuenta, {color:theme.color}]}>Salir</Text>
                            <Text style = {[styles.texto, {color:theme.color}]}>Cierra la cuenta del dispositivo actual</Text>
                        </View>
                        <MaterialIcons 
                            style={[styles.iconSearch, {color: theme.color}]}
                            name="navigate-next" 
                            size={24}
                            onPress={logout} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};