import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./app/about";
import Page from './app/(tabs)/profile'; // Corregido: Corregido la ruta del import
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name='About' component={About} />
        </InsideStack.Navigator>
    );
}

export default function App() {
    const [user, setUser] = useState< User | null>(null);
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Page">
                {user ?
                    <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: true }} /> // Corregido: options en lugar de option
                    :
                    <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} /> // Corregido: options en lugar de option
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
