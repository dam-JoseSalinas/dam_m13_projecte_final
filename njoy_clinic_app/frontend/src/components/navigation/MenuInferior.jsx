import React, { useState,useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Ionicons, Foundation, AntDesign } from '@expo/vector-icons';
import Home from './screens/bottom_menu/Home';
import Contacts from './screens/bottom_menu/Contacts';
import Search from './screens/bottom_menu/Search';
import Settings from './screens/bottom_menu/Settings';
import Profile from '../profile/Profile';
import themeContext from "../../constants/ThemeContext";
import styles from '../../styles/MenuInferiorStyles'

const BottomNavBar = createBottomTabNavigator();

/*Dos tipos de componente en un mismo archivo? --> MenuInferior Y Menus Laterales*/
export default function MenuInferior() {
    
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
                            } else if (route.name === "Search") {
                                iconComponent = focused ? 
                                    (<Ionicons name="search" size={size} color= {theme.color} backgroundColor={theme.background} />)
                                    :
                                    (<Ionicons name="search-outline" size={size} color= {theme.color} backgroundColor={theme.background} />);
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
                    component={Home}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Search"
                    component={Search}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Contacs"
                    component={Contacts}
                    options={{ headerShown: false }}/>
                <BottomNavBar.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShown: false }}/>
            </BottomNavBar.Navigator>
        </View>
    );
}
