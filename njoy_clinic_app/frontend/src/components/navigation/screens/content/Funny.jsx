import React, { useState,useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons, FontAwesome5, FontAwesome6, Entypo } from '@expo/vector-icons';
import themeContext from "../../../../constants/ThemeContext";
import styles from '../../../../styles/FunnyStyles';

export default function Funny(){
    const openSpotify = () => {
        const spotifyUrl = 'spotify:';
    
        Linking.canOpenURL(spotifyUrl).then(supported => {
            if (supported) {
                return Linking.openURL(spotifyUrl);
            } else {
                return Linking.openURL('https://spotify.com/');
            }}).catch(err => console.error('Error al abrir Spotify:', err));
    };
    const openAppleMusic = () => {
        const AppleMusicUrl = 'music.apple:';
    
        Linking.canOpenURL(AppleMusicUrl).then(supported => {
            if (supported) {
                return Linking.openURL(AppleMusicUrl);
            } else {
                return Linking.openURL('https://music.apple.com/');
            }}).catch(err => console.error('Error al abrir Apple Music:', err));
    };
    const openAmazon = () => {
        const amazonUrl = 'music.amazon:';
    
        Linking.canOpenURL(amazonUrl).then(supported => {
            if (supported) {
                return Linking.openURL(amazonUrl);
            } else {
                return Linking.openURL('https://music.amazon.es/');
            }}).catch(err => console.error('Error al abrir Amazon Music:', err));
    };
    const openYoutubeMusic = () => {
        const youtubeUrl = 'music.youtube:';
    
        Linking.canOpenURL(youtubeUrl).then(supported => {
            if (supported) {
                return Linking.openURL(youtubeUrl);
            } else {
                return Linking.openURL('https://music.youtube.com/');
            }}).catch(err => console.error('Error al abrir Youtube Music:', err));
    };
    const openNetflix= () => {
        const netflixUrl = 'netflix:';
    
        Linking.canOpenURL(netflixUrl).then(supported => {
            if (supported) {
                return Linking.openURL(netflixUrl);
            } else {
                return Linking.openURL('https://netflix.com/');
            }}).catch(err => console.error('Error al abrir Netflix:', err));
    };
    const openAmazonPrime= () => {
        const amazonPrime = 'primevideo:';
    
        Linking.canOpenURL(amazonPrime).then(supported => {
            if (supported) {
                return Linking.openURL(amazonPrime);
            } else {
                return Linking.openURL('https://primevideo.com/');
            }}).catch(err => console.error('Error al abrir Amazon Prime Video:', err));
    };
    const openFriv= () => {
        const friv = 'friv:';
    
        Linking.canOpenURL(friv).then(supported => {
            if (supported) {
                return Linking.openURL(friv);
            } else {
                return Linking.openURL('https://www.friv.com/');
            }}).catch(err => console.error('Error al abrir Friv:', err));
    };
    const openInfinity= () => {
        const infinity = 'infinityCraft:';
    
        Linking.canOpenURL(infinity).then(supported => {
            if (supported) {
                return Linking.openURL(infinity);
            } else {
                return Linking.openURL('https://neal.fun/infinite-craft/');
            }}).catch(err => console.error('Error al abrir Infinity Craft:', err));
    };
    const openTetris= () => {
        const tetris = 'tetris:';
    
        Linking.canOpenURL(tetris).then(supported => {
            if (supported) {
                return Linking.openURL(tetris);
            } else {
                return Linking.openURL('https://tetris.com/play-tetris');
            }}).catch(err => console.error('Error al abrir Tetris:', err));
    };

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
       <SafeAreaView style = {[styles.container, {backgroundColor:theme.background}]}>
            {/*BODY*/}
            <ScrollView style = {[styles.scroll, {backgroundColor:theme.theme}]} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                VIDEOJUEGOS
                ======================*/}
                {/*BOTON TITULO*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Videojuegos</Text> 
                </View>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} >
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color}  
                            style = {[styles.game, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openFriv} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <MaterialIcons 
                            name="games" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openInfinity} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <MaterialCommunityIcons 
                            name="nintendo-game-boy" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openTetris}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome5 
                            name="gamepad" 
                            size={42} 
                            color= {theme.color}  />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.game, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.game, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} />
                    </TouchableOpacity>
                </View>
                {/* nota: este conjunto de componentes de arriba puede reutilizarse tanto
                    en los siguientes elementos de boton-titulo con botones-icono, como
                    en los apartados de cada tematica de ocio, con la diferencia de que
                    en las vistas de ocio habra un scroll horizontal
                */}
                {/*
                ======================
                MÚSICA
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Música</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} >
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="musical-notes-outline" 
                            size={50} color= {theme.color}  
                            style = {[styles.music, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="spotify" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openSpotify}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Fontisto 
                            name="applemusic" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openAppleMusic}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <MaterialCommunityIcons 
                            name="shopping-music" 
                            size={50} 
                            color= {theme.color}  />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <AntDesign 
                            name="amazon" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openAmazon} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="youtube" 
                            size={50} 
                            color= {theme.color} 
                            onPress={openYoutubeMusic}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                SERIES  Y PELÍCULAS
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Plataformas de Streaming</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <MaterialCommunityIcons 
                            name="netflix" 
                            size={50} 
                            color= {theme.color}  
                            onPress={openNetflix}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome6 
                            name="cc-amazon-pay" 
                            size={50} 
                            color= {theme.color}  
                            onPress={openAmazonPrime}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color= {theme.color} 
                            style={styles.movie}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome5 
                            name="cc-apple-pay" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome5 
                            name="twitch" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome5 
                            name="kickstarter" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



