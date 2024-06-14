import React, { useState,useContext }  from "react";
import { Text, View, SafeAreaView } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import themeContext from "../../../constants/ThemeContext";
import styles from '../../../styles/DispositivosStyles'

export default function Dispositivos(){

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            <View style = {[styles.content, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                <Text style = {[styles.info, {color:theme.color}]}>En el apartado de dispositivos, puedes ver los dipositivos en los que se encuentra la aplicación. Cuando se agregue un nuevo dispositivo, aparecerá aquí mismo.</Text>
                <Text style = {[styles.texto, {color:theme.color}]}>Todos los dispositivos</Text>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="apple1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>iOS</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
                <View style = {[styles.dispositivos, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <MaterialIcons 
                        name="phone-android" 
                        size={24} 
                        color={theme.color} />
                    <AntDesign 
                        name="android1" 
                        size={24} 
                        color={theme.color} />
                    <View style = {[styles.dentroTexto, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Android</Text>
                        <Text style = {[styles.textoDispositivo, {color:theme.color}]}>Barcelona, Catalonia, Barcelona, Spain</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

