import { View, Text, FlatList, StyleSheet, Pressable, Image, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase, FIREBASE_AUTH } from '../../../firebaseConfig';
import { router } from 'expo-router';

const Index = () => {
    const [users, setUsers] = useState([]);
    const todosRef = firebase.firestore().collection('publicacion');
    const screenWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const user = FIREBASE_AUTH.currentUser
    const email = user.email
    const [usuarioEspecifico, setUsuarioEspecifico] = useState(email);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const unsubscribe = todosRef.where('User', '==', usuarioEspecifico).onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const { User, Descripcion, Valor, direccion, Imagen } = doc.data();
                users.push({
                    id: doc.id,
                    User,
                    Descripcion,
                    Valor,
                    direccion,
                    Imagen,
                });
            });
            setLoading(false);
            setUsers(users);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{alignSelf:'center', fontFamily: 'rot-m', marginTop: 10, fontSize:20}}>Tus publicaciones</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#004AAD" style={styles.activityIndicator} />
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={styles.flatList}
                    data={users}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.itemContainer} onPress={() => router.push(`/profile/editpost?id=${item.id}`)}>
                            <View style={styles.innerContainer}>
                                <View style={styles.innerInnerContainer}>
                                    <Image
                                        style={styles.profileImage}
                                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/alojavalpo.appspot.com/o/actor-brad-pitt-117003_large.jpg?alt=media&token=ae4be65c-e578-4777-86ae-0bab7ca12e3c' }}
                                    />
                                    <Text style={styles.textName}>{item.User} - 3d                Edit</Text>
                                </View>
                                <Image
                                    resizeMode="cover"
                                    style={[styles.image, { width: screenWidth }]} // Restar para los márgenes
                                    source={{ uri: item.Imagen }}
                                />
                                <View style={{ alignItems: 'justify', marginLeft: 15 }}>
                                    <Text style={{ fontSize: 15, fontFamily: 'rot-r' }}>{item.direccion}</Text>
                                    <Text style={{ fontSize: 12, fontFamily: 'rot-l' }}>{item.Descripcion}</Text>
                                    <Text style={{ fontSize: 15, fontFamily: 'rot-b' }}>${item.Valor} CLP <Text style={{ fontFamily: 'rot-t' }}>/por semana</Text></Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    flatList: {
        height: '100%',
    },
    itemContainer: {
        borderBottomColor: '#ccc',
        paddingTop: 30,
    },
    innerContainer: {
        flexDirection: 'column',
    },
    innerInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 10,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 25,
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    image: {
        height: 250,
        width: '100%',
        marginBottom: 10,
    },
    itemDescripcion: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemValor: {
        fontSize: 14,
        color: '#333',
    },
    activityIndicator: {
        justifyContent: 'center',
        padding: 200,
    },
});

export default Index;
