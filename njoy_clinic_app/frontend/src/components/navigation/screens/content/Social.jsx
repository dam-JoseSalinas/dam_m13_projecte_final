import React, { useState, useContext } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Entypo, FontAwesome6, FontAwesome5, AntDesign } from '@expo/vector-icons';
import themeContext from "../../../../constants/ThemeContext";
import styles from '../../../../styles/SocialStyles'

export default function SocialNetworks(){
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.theme}]}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.botonesTitulo, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                    <Text style={[styles.containerText, {color: theme.color}]}>Redes Sociales</Text> 
                </View>
                <View style={[styles.divierte, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="instagram" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="twitter" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                        name="facebook" 
                        size={50} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome 
                        name="whatsapp" 
                        size={55} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome 
                        name="telegram" 
                        size={50} 
                        color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome6 
                            name="discord"
                            size={50} 
                            color= {theme.color}
                            //onPress={openDiscord}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="youtube"
                            size={50} 
                            color= {theme.color}
                            //onPress={openYouTube}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="tiktok" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <AntDesign 
                            name="linkedin-square" 
                            size={50}
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="snapchat" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="pinterest" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="twitch" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <FontAwesome5 
                            name="kickstarter" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <Entypo 
                            name="spotify" 
                            size={50} 
                            color={theme.color}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fondoIcon, {backgroundColor: theme.background, borderColor: theme.lineColor}]}>
                        <AntDesign 
                            name="github" 
                            size={50} 
                            color={theme.color} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

