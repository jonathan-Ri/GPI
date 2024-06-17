import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Dimensions, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { firebase } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Details = () => {
  const { id } = useLocalSearchParams(); // Obtener el parámetro id de la URL
  const [loading, setLoading] = useState(true);
  const [publication, setPublication] = useState(null);
  const screenWidth = Dimensions.get('screen').width;
  const router = useRouter();

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
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => router.back()}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ImageBackground
              style={[styles.imageBackground, { width: screenWidth }]}
              source={{ uri: publication.Imagen }}
            >
              <Ionicons style={styles.button} onPress={() => router.back()} name="arrow-back-circle-outline" color={'white'} size={30} />
            </ImageBackground>
            <Text style={styles.textDescription}>{publication.Descripcion}</Text>
            <Text style={styles.textStyle}>{publication.direccion}</Text>
            <Text style={styles.textStyle}>{publication.Wifi ? 'WiFi: Disponible' : 'WiFi: No disponible'}</Text>
            <Text style={styles.textStyle}>${publication.Valor} CLP /por semana</Text>
        
          </ScrollView>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomButton}><Text style={styles.fixedButtonText}>Reservar ahora</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100, // Espacio para el botón fijo
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
    position: 'absolute',
    top: 40,
    left: 20,
  },
  activityIndicator: {
    justifyContent: 'center',
    padding: 200,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth:0.2,
    borderColor: 'grey'
    
  },
  fixedButtonText: {
    color: 'white',
    fontFamily: 'rot-b',
    fontSize: 16,
    alignSelf:'center',

    },
  bottomButton:{
    borderWidth: 1,
    height:50,
    width:150,
    backgroundColor: '#004AAD',
    borderRadius: 10,
    alignSelf:'center',
    justifyContent: 'center',



  }
});
