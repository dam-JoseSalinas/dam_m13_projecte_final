import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState,useContext } from "react";
import { Entypo, Fontisto, FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import themeContext from "../../../../constants/ThemeContext";
import styles from '../../../../styles/SearchStyles'

export default function Search(){
    const [text, setText] = useState('')
    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
            <SafeAreaView style = {[styles.container, {backgroundColor:theme.theme}]}>
                <View style = {[styles.content, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                    <View style = {[styles.search, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                        <TextInput 
                            style={[styles.textInput, { color: theme.color }, { backgroundColor: theme.theme }]}
                            placeholder='Buscador'
                            onChangeText={newText => setText(newText)}
                            defaultValue={text}
                            placeholderTextColor={theme.color}
                        />
                        <Ionicons 
                            style={styles.iconSearch}
                            name="search"
                            size={24}
                            color={theme.color}/>
                    </View>
                    <ScrollView>
                        <View style = {[styles.apartado, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                            <TouchableOpacity>
                                <View style = {[styles.div1, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <MaterialCommunityIcons 
                                        name="netflix" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div2, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <AntDesign 
                                        name="amazon" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div3, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <Entypo 
                                        name="spotify" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.apartado, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                            <TouchableOpacity>
                                <View style = {[styles.div4, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                    <Entypo 
                                        name="github" 
                                        size={40} 
                                        color= {theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div5, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <MaterialCommunityIcons 
                                        name="google-maps" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div6, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <MaterialCommunityIcons 
                                        name="google-drive" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.apartado, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                        <TouchableOpacity>
                            <View style = {[styles.div7, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                <MaterialCommunityIcons 
                                    name="google-downasaur" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div8, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <Fontisto 
                                    name="applemusic" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {[styles.div9, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                <FontAwesome5 
                                    name="telegram" 
                                    size={40} 
                                    color={theme.color} />
                            </View>
                        </TouchableOpacity>
                        </View>
                        <View style = {[styles.apartado, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                            <TouchableOpacity>
                                <View style = {[styles.div10, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                    <FontAwesome 
                                        name="linkedin" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div11, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <FontAwesome5 
                                        name="cc-apple-pay" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div12, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <FontAwesome5 
                                        name="tiktok" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity> 
                        </View>
                        <View style = {[styles.apartado, {backgroundColor:theme.theme}, {borderColor:theme.lineColor}]}>
                            <TouchableOpacity>
                                <View style = {[styles.div13, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>  
                                    <MaterialCommunityIcons 
                                        name="apple-icloud" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div14, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <MaterialCommunityIcons 
                                        name="calculator" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {[styles.div15, {backgroundColor:theme.background}, {borderColor:theme.lineColor}]}>
                                    <AntDesign 
                                        name="google" 
                                        size={40} 
                                        color={theme.color} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
    );
};

