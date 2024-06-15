import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Image,TouchableOpacity } from 'react-native';
import { Link, useNavigation, Tabs, router } from 'expo-router';
import { FIREBASE_AUTH,FIREBASE_DB } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import Search from '../../(tabs)/search';
import Profile from '../../(tabs)/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { addDoc, collection } from 'firebase/firestore';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');

    

    const SignIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
            alert('Ingresaste correctamente');
            router.push('../../(tabs)/search')
        } catch (error) {
            console.log(error);
            alert('Inicio de sesión fallido: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const SignUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password,name);
            const doc = await addDoc(collection(FIREBASE_DB, 'Users'), { Email: email, Nombre: name, Apellido: lastname });
            console.log(" file: index.js:12 addpublicacion", doc);

            console.log(response);
            alert('Cuenta Creada Correctamente');
            router.push('../../(modals)/login')

        } catch (error) {
            console.log(error);
            alert('Inicio de sesión fallido: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

  

    return (
        <View style={styles.container}>
             <View style={{alignItems:'center', marginBottom:20}}>
                <Text style={{fontFamily: 'rot-b', fontSize:25, color:'#000'}}>Crea tu Cuenta</Text>
            </View>
            
            <KeyboardAvoidingView behavior='padding'>
            <TextInput
                    style={styles.input}  
                    placeholder="Nombre"
                    onChangeText={(text) => setName(text)}

                    value={name}
                />
                <TextInput
                    style={styles.input}  
                    placeholder="Apellido"
                    onChangeText={(text) => setLastName(text)}
                    value={lastname}
                />
               
               
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Contraseña"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                
                <TouchableOpacity style={styles.button} onPress={SignUp} disabled={email === ''}>
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => router.back()} >
                    <Text style={styles.text2}>¿Ya tienes una cuenta?</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>

           
        </View>
    );
};

const Stack = createNativeStackNavigator();

export default function App(){
    return (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName= "Login">
            <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='Profile' component={Profile} />

        </Stack.Navigator>

    </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        
        flex: 1,
        borderRadius: 200,
        marginTop: 150,
    },
    input: {
        marginVertical: 4,
        marginTop:5,
        marginBottom:10,
        height: 50,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius:10,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#004AAD',
        marginBottom: 20,
        borderRadius:10,

      },
      button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 0,
        backgroundColor: '#fffff',
        marginBottom: 20,
      },
      text: {
        fontSize: 16,
        fontFamily : 'rot-b',

        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
      },
      text2: {
        fontSize: 14,
        justifyContent: 'center',

        fontFamily : 'rot-l',
        alignContent: 'center',
        color: 'black',
      },
});
