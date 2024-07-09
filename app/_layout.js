import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { React, useEffect } from "react";
import { Stack, useRouter, SplashScreen } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function _layout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'rot-b': require('../assets/fonts/Roboto-Bold.ttf'),
    'rot-t': require('../assets/fonts/Roboto-Thin.ttf'),
    'rot-l': require('../assets/fonts/Roboto-Light.ttf'),
    'dnc': require('../assets/fonts/Dancing-Script.ttf'),
    'rot-r': require('../assets/fonts/Roboto-Regular.ttf'),
    'rot-m': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Función para renderizar el botón headerLeft
  const renderHeaderLeft = () => {
    return (
      <TouchableOpacity style={styles.headerLeftButton} onPress={() => console.log('Header Left Button Pressed')}>
        <Ionicons name="menu" size={24} color="#004AAD" />
      </TouchableOpacity>
    );
  };

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          title: 'alojaValpo',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffff',
            fontFamily: 'dnc',
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: '#004AAD',
          },
          headerLeft: (renderHeaderLeft),
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/login/index" options={{ headerShown: false }} />

     
      
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set the entire background to white
  },
  button: {
    backgroundColor: '#f1f1',
    borderColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
  },
  headerLeftButton: {
    marginLeft: 10, // Ajusta el margen según sea necesario
    padding: 10, // Ajusta el padding según sea necesario
  },
});
