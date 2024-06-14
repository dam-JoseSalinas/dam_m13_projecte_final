import React from 'react';
import { StatusBar } from 'react-native'; 
import { View, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../../styles/LoadingStyles';

export default function LoadingIncial() {

    const navigation = useNavigation();
    setTimeout(
      () => { navigation.navigate('Bienvenida'); },
      300
    );
  
    return (
      <SafeAreaView
        style={styles.container}>
        <View
          style={styles.content}>
          <Image
            source={require('../../../../assets/images/logo/logoClaro.png')}
            style={styles.logo}
            resizeMode='contain'/>
          <StatusBar
            style="auto"
            animated={true}
            backgroundColor="#61dafb"/>
        </View>
      </SafeAreaView>
    );
  };
