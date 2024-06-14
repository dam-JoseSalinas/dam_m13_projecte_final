import React, { useState,useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Ionicons, Foundation, AntDesign } from '@expo/vector-icons';
import Settings from '../screens/settings/Settings'
import themeContext from "../themes/themeContext";
import styles from '../assets/styles/menuInferiorStyles'
import ProfileDoctor from '../screens/profile/ProfileDoctor';
import ContactsDoctor from '../screens/profile/ContactsDoctor';
import Appointments from '../screens/profile/Appointments';

const BottomNavBar = createBottomTabNavigator();

/*Dos tipos de componente en un mismo archivo? --> MenuInferior Y Menus Laterales*/
export default function MenuInferior2() {
    
    /*Funciones para menus laterales */

    const theme = useContext(themeContext)

    const [darkMode, setDarkMode] = useState(false)

    return (
         <View style={{ flex: 1 ,backgroundColor:theme.background}}>
            <BottomNavBar.Navigator 
                /*cambio de focus en iconos(se colorea/descolorea)*/
                screenOptions={ ({ route }) => 
                    ({  tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: theme.background,
                            borderTopColor: theme.lineColor, // Optional: for border color at the top of the tab bar
                        },
                        tabBarIcon: ({ color, focused, size }) => {
                            let iconComponent;
                            if (route.name === "Home") {
                                iconComponent = 
                                    focused ? 
                                    (<Foundation name="home" size={size} color= {theme.color} backgroundColor={theme.background}/>) 
                                    : 
                                    (<Foundation name="home" size={size} color= {theme.color} backgroundColor={theme.background}/>);
                            } else if (route.name === "Contacs") {
                                iconComponent = focused ? 
                                    (<AntDesign name="contacts" size={size} color= {theme.color} backgroundColor={theme.background} />)
                                    :
                                    (<AntDesign name="contacts" size={size} color= {theme.color} backgroundColor={theme.background} />);
                            } else if (route.name === "Settings") {
                                iconComponent = focused ? 
                                    (<Ionicons name="cog-outline" size={size} color= {theme.color} backgroundColor={theme.background} />)
                                    : 
                                    (<Ionicons name="cog-outline" size={size} color= {theme.color} backgroundColor={theme.background} />);
                            }
                            else if (route.name === "Profile") {
                                iconComponent = focused ? 
                                    (<Ionicons name="person" size={24} color= {theme.color} backgroundColor={theme.background}/>)
                                    : 
                                    (<Ionicons name="person" size={size} color= {theme.color} backgroundColor={theme.background} />);
                            }
                            return iconComponent;
                        },
                    })
                }
            >
                <BottomNavBar.Screen
                    name="Home"
                    component={Appointments}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Profile"
                    component={ProfileDoctor}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Contacs"
                    component={ContactsDoctor}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShown: false }}/>
            </BottomNavBar.Navigator>
        </View>
    );
}
