import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Stack } from 'expo-router'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function _layout() {
    return(
       <Tabs screenOptions={{tabBarActiveTintColor: Colors.primary, 
       tabBarStyle:{
        height: 50
        
    },
    tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: 300,
        marginBottom: 5,
        fontFamily : 'mon'
        },
       
       
       }}>

        <Tabs.Screen name='chat' options={{
            headerShown: false,
            tabBarIcon: ({size,color}) => (
                
                <Ionicons name="chatbubbles-outline" size = {size} color = {color}    />
                      ),
            tabBarLabel: 'Mensajes',

        }}/>
        <Tabs.Screen name='search' options={{
            headerShown: false,
            tabBarIcon: ({size,color}) => (
                <Ionicons name="search-outline" size = {size} color = {color}  />
            ),
            tabBarLabel: 'Aloja'

        }}/>
         <Tabs.Screen name='profile' options={{
            headerShown: false,
            tabBarIcon: ({size,color}) => (
                <Ionicons name="person-outline" size = {size} color = {color}  />      
                  ),
            tabBarLabel: 'Perfil'

        }}/>

       </Tabs>

    )

} 