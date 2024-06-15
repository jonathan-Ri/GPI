import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Switch } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB, firebase } from '../../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

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

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setWifi(previousState => !previousState);
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
            await addDoc(collection(FIREBASE_DB, 'publicacion'), { User: user, Descripcion: descripcion, direccion: direccion, Valor: valor, Imagen: downloadURL, Wifi: wifi });

            setUploading(false);
            Alert.alert('Foto subida correctamente');
            setImage(null);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
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
                <Text>Wifi</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#004AAD" }}
                    thumbColor={isEnabled ? "#fffff" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.switch}
                />
                <View style={styles.form}>
                    <Text style={styles.label}>Valor de arriendo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: 200.000"
                        onChangeText={(text) => setValor(text)}
                        value={valor}
                    />
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
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
    switch: {
        marginVertical: 20,
    },
});
