import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity, ImageBackground, Modal } from "react-native";
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import { firebase } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Details = () => {
const { id } = useLocalSearchParams(); // Obtener el parámetro id de la URL
const [loading, setLoading] = useState(true);
const [publication, setPublication] = useState(null);
const screenWidth = Dimensions.get('screen').width;

useEffect(() => {
const fetchPublication = async () => {
try {
const doc = await firebase.firestore().collection('publicacion').doc(id).get();
if (doc.exists) {
setPublication(doc.data());
} else {
console.log('No such document!');
}
} catch (error) {
console.error("Error fetching document: ", error);
} finally {
setLoading(false);
}
};


if (id) {
  fetchPublication();
}
}, [id]);

if (loading) {
return <ActivityIndicator size="large" color="#004AAD" style={styles.activityIndicator} />;
}

if (!publication) {
return (
<View style={styles.container}>
<Text style={styles.textStyle}>No details found</Text>
</View>
);
}

return (
<View style={styles.container}>
<Modal>
<ImageBackground
style={[styles.imageBackground, { width: screenWidth }]}
source={{ uri: publication.Imagen }}
>
<Ionicons style={styles.button} onPress={() => router.back()}
name="arrow-back-circle-outline" color={'white'} size={30}/>


  </ImageBackground>
  <Text style={styles.textStyle}>{publication.User}</Text>
  <Text style={styles.textDescription}>{publication.Descripcion}</Text>
  <Text style={styles.textStyle}>{publication.direccion}</Text>

  <Text style={styles.textStyle}>{publication.Wifi ? 'WiFi: Disponible' : 'WiFi: No disponible'}</Text>

  <Text style={styles.textStyle}>${publication.Valor} CLP /por semana</Text>
  </Modal>
</View>
);
};

export default Details;

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
textStyle: {
color: 'black',
fontWeight: 'bold',
textAlign: 'center',
marginVertical: 10,
},
textDescription: {
color: 'black',
textAlign: 'center',
marginVertical: 10,
},
imageBackground: {
width: '100%',
height: 300,
justifyContent: 'center',
alignItems: 'center',

},
button: {
marginLeft: -350,
padding: 10,
borderRadius: 5,
marginTop: -260
},
buttonText: {
color: 'white',
fontWeight: 'bold',
},
activityIndicator: {
justifyContent: 'center',
padding: 200,
},
});