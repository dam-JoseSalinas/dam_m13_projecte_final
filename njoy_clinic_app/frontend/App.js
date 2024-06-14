import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import ProfileProvider from './src/hooks/ProfileProvider';
import Navigation from './src/components/navigation/Navigation';
import ThemeContext from './src/constants/ThemeContext';
import Themes from './src/themes/Themes';



export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  return (
    <ProfileProvider>
      <ThemeContext.Provider value={darkMode ? Themes.dark : Themes.light}>
        <Navigation />
      </ThemeContext.Provider>
    </ProfileProvider>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//return <Main/>