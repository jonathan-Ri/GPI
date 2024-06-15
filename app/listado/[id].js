import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Page = () => {
    const { id } = useLocalSearchParams(); // No es necesario especificar el tipo en JavaScript
    const router = useRouter();

    console.log("Log");

    return (
        <View>
            <Text>Página: {router.route}</Text>
            <Text>ID: {id}</Text>
        </View>
    );
};

export default Page;
