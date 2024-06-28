import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Link, useRouter, router } from 'expo-router';
import { FIREBASE_AUTH, firebase } from '../../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const user = FIREBASE_AUTH.currentUser
    const email = user.email
    const [usuarioEspecifico, setUsuarioEspecifico] = useState(email);
    const [publicaciones, setPublicaciones] = useState([]);

    const todosRef = firebase.firestore().collection('Users');
    console.log(user)
    useEffect(() => {
        const unsubscribe = todosRef.where('Email', '==', usuarioEspecifico).onSnapshot(querySnapshot => {
            const publicaciones = [];
            querySnapshot.forEach(doc => {
                const { Nombre, Apellido, Imagen } = doc.data();
                publicaciones.push({
                    id: doc.id,
                    Nombre,
                    Apellido,
                    Imagen,
                });
            });
            setLoading(false);
            setPublicaciones(publicaciones);
        });

        return () => unsubscribe();
    }, [usuarioEspecifico]);

    const signOut = () => {
        firebase.auth().signOut();
        router.push('(modals)/login');
    };

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Image
                style={styles.imageProfile}
                source={{ uri: item.Imagen || 'https://firebasestorage.googleapis.com/v0/b/alojavalpo.appspot.com/o/actor-brad-pitt-117003_large.jpg?alt=media&token=ae4be65c-e578-4777-86ae-0bab7ca12e3c' }}
            />
            <Text style={styles.textName}>{item.Nombre} {item.Apellido}</Text>
            <Text style={{ textAlign: 'center', fontFamily: 'rot-l' }}>Profile</Text>

                <TouchableOpacity style={styles.selectButton} onPress = {() => router.push('profile/publicar')}>
                    <Text style={styles.textButton}>Publica tu arriendo</Text>
                    <Text style={styles.textButtonTwo}>en pocos pasos</Text>
                    <View>
                        <Text style={styles.textButtonThree}>Aloja tu casa</Text>
                        <Ionicons style={{ marginTop: -13, marginLeft: 103 }} name="arrow-forward-outline" color={'white'} />
                    </View>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/alojavalpo.appspot.com/o/casaPublicacion-min(1).png?alt=media&token=9573d451-fe13-47a3-be36-3ac8a1a22acc' }}
                    />
                </TouchableOpacity>
            <View><Pressable style={styles.buttonToPosts}onPress ={() => router.push('profile/myposts')}><Text style={styles.TextPost}>Mira tus publicaciones </Text>
            <Ionicons name="chevron-forward-outline" size={13} />
            </Pressable></View>
            <View>
                <Text style={styles.textTitle}>Configuraciones</Text>

                <View>
                        <TouchableOpacity style={styles.configButton}>
                        <Ionicons name="man-outline" size={13} />
                        <Text style={styles.TextPost2}>Informacion del perfil</Text>
                        <Ionicons  style={{marginLeft:174}} name="chevron-forward-outline" size={13} />

                        </TouchableOpacity>
                </View>

                <View >
                        <TouchableOpacity style={styles.configButton}>
                        <Ionicons style={styles.icon} name="lock-open-outline" />
                        <Text style={styles.TextPost2}>
                          Contraseña y sesión</Text>
                          <Ionicons style={{marginLeft:180}} name="chevron-forward-outline" size={13} />

                        </TouchableOpacity>
                </View>

                <View >
                <TouchableOpacity style={styles.configButton}>
                            
                            <Ionicons name="shield-checkmark-outline" size={13} />
                            <Text style={styles.TextPost2}> Seguridad y Privacidad</Text>
                            <Ionicons style={{marginLeft:158}} name="chevron-forward-outline" size={13} />

                        </TouchableOpacity>
                </View>

                <View >
                <TouchableOpacity style={styles.configButton}>
                            <Ionicons style={styles.icon} name="notifications-outline" />
                            <Text style={styles.TextPost2}>
                            Notificaciones</Text>
                            <Ionicons style={{marginLeft:215}} name="chevron-forward-outline" size={13} />

                        </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logOutButton} onPress={signOut}>
                    <Text style={styles.textLogOut}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.itemContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#004AAD" style={styles.activityIndicator} />
            ) : (
                <FlatList
                    data={publicaciones}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    textName: {
        fontFamily: 'rot-b',
        fontSize: 16,
        textAlign: 'center',
    },
    selectButton: {
        marginTop: 25,
        borderRadius: 5,
        width: 340,
        height: 91,
        backgroundColor: '#004AAD',
        borderRadius: 8,
        padding: 10,
        elevation: 20,

    },
    textButton: {
        color: '#ffffff',
        fontFamily: 'rot-b',
        marginLeft: 20,
        fontSize: 14,
    },
    textButtonTwo: {
        color: '#ffffff',
        fontFamily: 'rot-b',
        marginLeft: 20,
        marginTop: -3,
        fontSize: 14,
        alignItems:'center',
        flexDirection:'row'
    },
    textButtonThree: {
        color: '#ffffff',
        fontFamily: 'rot-r',
        marginLeft: 15,
        marginTop: 15,
        fontSize: 14,
    },
    image: {
        marginLeft: 240,
        marginBottom: 100,
        marginTop: -65,
        width: 77,
        height: 66,
        resizeMode: 'contain',
    },
    itemInnerContainer: {
        marginTop: 10,
    },
    textTitle: {
        fontSize: 20,
        fontFamily: 'rot-b',
    },
    optionsContainer: {
        marginTop: 10,
    },
    textOptions: {
        fontSize: 15,
        fontFamily: 'rot-r',
        marginTop: 10,
    },
    logOutButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    textLogOut: {
        alignSelf: 'center',
    },
    imageProfile: {
        padding: 40,
        alignSelf: 'center',
        borderRadius: 50,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonToPosts:{
        borderBottomWidth:0.5,
        borderTopWidth:0.5,
        marginTop: 20,
        height: 40,
        alignItems:'center',
        flexDirection:'row',
        marginBottom: 15
    },
    TextPost:{
        fontFamily: 'rot-b',
        marginRight:180,
    },
    TextPost2:{
        fontFamily: 'rot-r',
    },
    configButton:{
        marginTop: 1,
        height: 40,
        alignItems:'center',
        flexDirection:'row'
    }
});
