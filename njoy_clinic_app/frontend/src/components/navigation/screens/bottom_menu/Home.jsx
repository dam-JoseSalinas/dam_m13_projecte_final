import React, { useState,useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, FontAwesome6, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import themeContext from "../../../../constants/ThemeContext";
import styles from '../../../../styles/HomeStyles'

const Tab = createBottomTabNavigator(); 

export default function Home() {

    {/*REDIRECCION DE BOTONES*/}
    const navigation = useNavigation();

    {/*diviertete*/}
    const redirectHaveFun = () => {
        navigation.navigate('Funny');
    }
    {/*redes sociales*/}
    const redirectSocial = () => {
        navigation.navigate('SocialNetworks');
    }
    const openTwitter = () => {
        const twitterUrl = 'twitter:';
    
        Linking.canOpenURL(twitterUrl).then(supported => {
            if (supported) {
                return Linking.openURL(twitterUrl);
            } else {
                return Linking.openURL('https://twitter.com/');
            }}).catch(err => console.error('Error al abrir Twitter:', err));
    };
    const openInstagram = () => {
        const instagramUrl = 'instagram:';
        
        Linking.canOpenURL(instagramUrl).then(supported => {
            if(supported) {
                return Linking.openURL(instagramUrl);
            } else {
                return Linking.openURL('https://instagram.com/');
            }}).catch(err => console.error('Error al abrir Instagram:', err));
    };
    const openFacebook = () => {
        const facebookUrl = 'facebook:';

        Linking.canOpenURL(facebookUrl).then(supported => {
            if(supported){
                return Linking.openURL(facebookUrl);
            } else {
                return Linking.openURL('https://facebook.com/');
            }}).catch(err => console.err('Error al abrir Facebook', err)); 
    };
    const openDiscord = () => {
        const discordUrl = 'discord:';
    
        Linking.canOpenURL(discordUrl).then(supported => {
            if(supported){
                return Linking.openURL(discordUrl); 
            } else {
                return Linking.openURL('https://discord.com/');
            }
        }).catch(err => console.error('Error al abrir Discord', err)); 
    };    
    const openYouTube = () => {
        const youtubeUrl = 'youtube:';

        Linking.canOpenURL(youtubeUrl).then(supported => {
            if(supported){
                return Linking.openURL(youtubeUrl);
            } else {
                return Linking.openURL('https://youtube.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openReddit = () => {
        const redditUrl = 'reddit:';

        Linking.canOpenURL(redditUrl).then(supported => {
            if(supported){
                return Linking.openURL(redditUrl);
            } else {
                return Linking.openURL('https://www.reddit.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openWhatsapp = () => {
        const whatsappUrl = 'whatsapp:';

        Linking.canOpenURL(whatsappUrl).then(supported => {
            if(supported){
                return Linking.openURL(whatsappUrl);
            } else {
                return Linking.openURL('https://www.whatsapp.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };
    const openstackoverflow = () => {
        const stackoverflowUrl = 'stackoverflow:';

        Linking.canOpenURL(stackoverflowUrl).then(supported => {
            if(supported){
                return Linking.openURL(stackoverflowUrl);
            } else {
                return Linking.openURL('https://stackoverflow.com/');
            }}).catch(err => console.err('Error al abrir Youtube', err)); 
    };

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
         <SafeAreaView style = {[styles.container, {backgroundColor:theme.theme}]}>
            {/*BODY*/}
            <ScrollView style = {[styles.scroll, {backgroundColor:theme.theme}]} contentContainerStyle={styles.scrollContent}>
                {/*
                ======================
                D I V I E R T E T E
                ======================*/}
                {/*BOTON TITULO*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectHaveFun}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Diviértete</Text> 
                </TouchableOpacity>
                {/*FILA DE BOTONES CON ICONO*/}
                <View style = {[styles.divierte, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]} >
                    <TouchableOpacity style = {[styles.fondoIconGame, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="game-controller-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.game, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMusic, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="musical-notes-outline" 
                            size={50} color= {theme.color} 
                            style = {[styles.music, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconMovie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="file-movie-o" 
                            size={50} color= {theme.color}  
                            style={[styles.movie, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                </View>
                {/* nota: este conjunto de componentes de arriba puede reutilizarse tanto
                    en los siguientes elementos de boton-titulo con botones-icono, como
                    en los apartados de cada tematica de ocio, con la diferencia de que
                    en las vistas de ocio habra un scroll horizontal
                */}
                {/*
                ======================
                R E D E S
                ======================*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]} onPress={redirectSocial}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Tus Redes</Text> 
                </TouchableOpacity>
                <View style = {[styles.divierte, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoIconInsta, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="instagram" 
                            size={50} color= {theme.color}
                            style = {[styles.insta, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openInstagram}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconTwitter, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="twitter" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.twitter, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openTwitter}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconFacebok, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="facebook" 
                            size={50} 
                            color= {theme.color} 
                            style = {[styles.facebook, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openFacebook}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                FOROS
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Foros</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoIconReddit, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="logo-reddit" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.reddit, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openReddit}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconSlideshare, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Entypo 
                            name="slideshare" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.slide, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoIconStack, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="stack-overflow" 
                            size={50} color= {theme.color} 
                            style = {[styles.stack, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}
                            onPress={openstackoverflow}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                N O T I C I A S
                ======================*/}
                <View style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Noticias</Text> 
                </View>
                <View style = {[styles.divierte, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoNewsPaper, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>    
                        <FontAwesome 
                            name="newspaper-o" 
                            size={45} 
                            color= {theme.color} 
                            style = {[styles.newsPaper, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoDesignNews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <Ionicons 
                            name="logo-designernews" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.designNews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoHacker, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="hacker-news" 
                            size={50} 
                            color= {theme.color}
                            style = {[styles.hackernews, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}/>
                    </TouchableOpacity>
                </View>
                {/*
                ======================
                F A V O R I T O S
                ======================*/}
                <TouchableOpacity style = {[styles.botonesTitulo, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                    <Text style = {[styles.containerText, {color:theme.color}]}>Favoritos</Text> 
                </TouchableOpacity>
                <View style = {[styles.divierte, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                    <TouchableOpacity style = {[styles.fondoYouTube, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>    
                        <Entypo 
                            name="youtube"
                            size={50} 
                            color= {theme.color}
                            onPress={openYouTube}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoDiscord, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome6 
                            name="discord"
                            size={50} 
                            color= {theme.color}
                            onPress={openDiscord}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.fondoWhats, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                        <FontAwesome 
                            name="whatsapp" 
                            size={50} 
                            color= {theme.color}
                            onPress={openWhatsapp} /> 
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

    
