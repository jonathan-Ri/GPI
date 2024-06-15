import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Image,TouchableOpacity } from 'react-native';
import { Link, useNavigation, Tabs, router } from 'expo-router';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import Search from '../../(tabs)/search';
import Profile from '../../(tabs)/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen = () => {
    const [email, setEmail] = useState('diego.aliaga@alumnos.uv.cl');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    

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
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
            alert('Revisa tu email');
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
                <Text style={{fontFamily: 'dnc', fontSize:50, color:'#004AAD'}}>alojaValpo</Text>
            </View>
            <KeyboardAvoidingView behavior='padding'>
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
                
                <TouchableOpacity style={styles.button} onPress={SignIn}>
                    <Text style={styles.text}>Ingresar</Text>
                </TouchableOpacity>
                <View style={{marginBottom:20, alignItems:'center'}}>
                <Link href={"login/registrarse"}>
                <Text style={styles.text2}>Registrarse</Text>
                </Link>
                </View>
            </KeyboardAvoidingView>

           
        </View>
    );
};

const Stack = createNativeStackNavigator();

export default function Log(){
    return (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName= "Login">
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Search' component={Search} options={{headerShown:false}} />

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
        color: '#004AAD',
      },
});
