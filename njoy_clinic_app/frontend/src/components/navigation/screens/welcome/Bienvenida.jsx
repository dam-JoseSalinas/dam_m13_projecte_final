import React, { useContext } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import styles from '../../../../styles/BienvenidaStyles';
import themeContext from '../../../../constants/ThemeContext';

export default function Bienvenida() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();

    const redirectHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MenuInferior' }],
            })
        );
    };

    const redirectoLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={theme.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View>
                    <TouchableOpacity style={[styles.buttonHome, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]} onPress={redirectHome}>
                        <Text style={[styles.buttonText, { color: theme.color }]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonLogin, { backgroundColor: theme.background }, { borderColor: theme.lineColor }]} onPress={redirectoLogin}>
                        <Text style={[styles.buttonText, { color: theme.color }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
