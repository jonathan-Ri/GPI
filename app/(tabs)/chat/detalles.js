import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Switch, Pressable } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB, firebase } from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker'
export default function Page() {
    const [valor, setValor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [imagen, setImagen] = useState('');
    const currentUser = FIREBASE_AUTH.currentUser;
    const user = currentUser.email;
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [petfriendly, setPetFriendly] = useState(false);
    const [cocina, setCocina] = useState(false)
    const [tipoResidencia, setTipoResidencia] = useState('');
    const [tiempoAlojo, setTiempoAlojo] = useState('')

    
    const toggleSwitchWifi = () => {
        setWifi(previousState => !previousState);

    };
    const toggleSwitchPet = () => {
        setPetFriendly(previousState => !previousState);

    };
    const toggleSwitchCocina = () => {
        setCocina(previousState => !previousState);

    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        setUploading(true);
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            await ref.put(blob);
            const downloadURL = await ref.getDownloadURL();
            setImagen(downloadURL);
            await addDoc(collection(FIREBASE_DB, 'publicacion'), { User: user, Descripcion: descripcion, direccion: direccion, Valor: valor, Imagen: downloadURL, Wifi: wifi, tipoResidencia: tipoResidencia, petfriendly: petfriendly, cocina: cocina, tiempoAlojo:tiempoAlojo });

            setUploading(false);
            Alert.alert('Publicación subida correctamente');
            setImage(null);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };
    const [buttonColor, setButtonColor] = useState('#fff'); // Estado para el color del botón

    const changeButtonColor = (residencia) => {
        // Función para cambiar el color del botón al hacer clic y guardar el tipo de residencia
        setButtonColor('#004AAD'); // Cambia el color del botón al hacer clic
        setTipoResidencia(residencia); // Guarda el tipo de residencia según el botón presionado
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={styles.title}>Publica tu arriendo aquí</Text>
                <Text style={styles.subtitle}>Qué tipo de alojamiento ofreces</Text>
                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                    <View style={styles.box}>
                        <Pressable
                            style={[styles.button, tipoResidencia === 'casa' && { backgroundColor: '#004AAD' }]} // Estilo del botón con color dinámico
                            onPress={() => changeButtonColor('casa')} // Función que se ejecuta al hacer clic
                        >
                            <Ionicons name="home-outline" size={40} color="black" style={styles.icon} />
                            <Text style={styles.text}>Casa</Text>
                        </Pressable>
                    </View>
                    <View style={styles.box}>
                        <Pressable
                            style={[styles.button, tipoResidencia === 'edificio' && { backgroundColor: '#004AAD' }]}
                            onPress={() => changeButtonColor('edificio')}
                        >
                            <Ionicons name="business-outline" size={40} color="black" style={styles.icon} />
                            <Text style={styles.text}>Edificio</Text>
                        </Pressable>
                    </View>
                    <View style={styles.box}>
                        <Pressable
                            style={[styles.button, tipoResidencia === 'habitacion' && { backgroundColor: '#004AAD' }]}
                            onPress={() => changeButtonColor('habitacion')}
                        >
                            <Ionicons name="bed-outline" size={40} color="black" style={styles.icon} />
                            <Text style={styles.text}>Habitación</Text>
                        </Pressable>
                    </View>
                    <View style={styles.box}>
                        <Pressable
                            style={[styles.button, tipoResidencia === 'houseboat' && { backgroundColor: '#004AAD' }]}
                            onPress={() => changeButtonColor('houseboat')}
                        >
                            <Ionicons name="boat-outline" size={40} color="black" style={styles.icon} />
                            <Text style={styles.text}>Houseboat</Text>
                        </Pressable>
                    </View>
                    <View style={styles.box}>
                        <Pressable
                            style={[styles.button, tipoResidencia === 'casaParticular' && { backgroundColor: '#004AAD' }]}
                            onPress={() => changeButtonColor('casaParticular')}
                        >
                            <Ionicons name="storefront-outline" size={40} color="black" style={styles.icon} />
                            <Text style={styles.text}>Casa particular</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={styles.switch}>
                <Text style={styles.textSwitch}>Wifi</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#004AAD" }}
                    thumbColor={isEnabled ? "#ffffff" : "#ffffff"} // Color blanco cuando está activado y cuando está desactivado
                    onValueChange={toggleSwitchWifi}
                    value={wifi}
                    style={styles.switch}
                />
            
                <Text style={styles.textSwitch}>Pet Friendly</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#004AAD" }}
                    thumbColor={isEnabled ? "#ffffff" : "#ffffff"} // Color blanco cuando está activado y cuando está desactivado
                    onValueChange={toggleSwitchPet}
                    value={petfriendly}
                    style={styles.switch}
                />
                <Text style={styles.textSwitch}>Cocina</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#004AAD" }}
                    thumbColor={isEnabled ? "#ffffff" : "#ffffff"} // Color blanco cuando está activado y cuando está desactivado
                    onValueChange={toggleSwitchCocina}
                    value={cocina}
                    style={styles.switch}
                />
                </View>
                <View >
                   
                    <Text style={styles.label}>Valor de arriendo:</Text>
                    <View style = {{alignItems:'center', flexDirection:'row', justifyContent:'center'
 }}>
                    <TextInput
                        placeholder="Ej: 200.000"
                        onChangeText={(text) => setValor(text)}
                        value={valor}
                    />
                    <Picker
                        
                        selectedValue={tiempoAlojo}
                        onValueChange={(itemValue, itemIndex) =>
                            setTiempoAlojo(itemValue)
                        }
                        style={styles.dropdown}
                        mode="dropdown"
                    >
                        <Picker.Item style={{fontSize:10, fontFamily: 'rot-l'}} label="Diario" value="por día" />
                        <Picker.Item style={{fontSize:10, fontFamily: 'rot-l'}} label="Semanal" value="por semana" />
                        <Picker.Item style={{fontSize:10, fontFamily: 'rot-l'}} label="Mensual" value="por mes" />

                    </Picker>
                    </View>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Agregue una descripción"
                        onChangeText={(text) => setDescripcion(text)}
                        value={descripcion}
                    />
                    <Text style={styles.label}>Dirección</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Agregue la dirección"
                        onChangeText={(text) => setDireccion(text)}
                        value={direccion}
                    />
                </View>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                        <View style={styles.buttonContent}>
                            <Ionicons name="image-outline" size={20} color="black" style={{ marginRight: 10 }} />
                            <Text style={styles.buttonText}>Selecciona una imagen</Text>
                        </View>
                    </TouchableOpacity>
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    )}
                    {uploading ? (
                        <ActivityIndicator size="large" color="#004AAD" style={styles.activityIndicator} />
                    ) : (
                        <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia}>
                            <Text style={{ color: 'white', fontFamily: 'rot-l' }}>Sube tu arriendo</Text>
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'rot-b',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'justify',
        fontStyle: 'rot-l',
        marginLeft: -40
    },
    form: {
        marginVertical: 20,
        flexDirection: 'column',
    },
    input: {
        height: 54,
        width: 300,
        borderWidth: 0.8,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#ffff',
        borderColor: '#004AAD',
        marginHorizontal: 50,
    },
    label: {
        marginHorizontal: 50,
    },
    selectButton: {
        borderRadius: 5,
        alignItems: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'rot-l',
    },
    uploadButton: {
        borderRadius: 5,
        alignItems: 'center',
        width: 300,
        height: 50,
        backgroundColor: '#004AAD',
        justifyContent: 'center',
        marginVertical: 10,
    },
    activityIndicator: {
        marginVertical: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginVertical: 1,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    
    button: {
        flexDirection: 'column', // Alinea ícono y texto en la misma fila
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        height: 80,
        width:80,
        marginLeft: 15
      },
      text: {
        fontSize: 10,
        color: '#000',
        fontStyle: 'rot-l'
      },
      switch:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'

      },
      textSwitch:{
        marginLeft: 5
      },
      dropdownContainer: {
          borderWidth: 1,
          borderRadius: 10,
          width:1000
      },
      dropdown: {
          height: 50,
          width:130,
          alignItems:'center',
      },
  
   
});
