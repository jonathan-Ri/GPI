import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Dimensions, TouchableOpacity, Modal, ScrollView, Image } from "react-native";
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
            <View style={styles.bottomContainer}>
            <Text style={styles.textTitulo}>{publication.titulo}</Text>
            <Text style={styles.textPlace}>{publication.tipoResidencia} en {publication.direccion}</Text>
            <View style ={{flexDirection:'row', paddingHorizontal: 10, justifyContent:'center'}}>
            <Text style={styles.textStyle}>{publication.Wifi ? 'Wifi: Si' : 'WiFi: No'}</Text>
            <Text style={styles.textStyle}>{publication.petFriendly ? 'PetFriendly: Si' : 'PetFriendly: No'}</Text>
            <Text style={styles.textStyle}>{publication.cocina ? 'Cocina: Si' : 'C  ocina: No'}</Text>

            </View>
            <Text>Descripción:</Text>
            <Text style={styles.textDescription}>{publication.Descripcion}</Text>
            </View>
            <View style={styles.userContainer}>
              <Image
                  style={styles.image}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/alojavalpo.appspot.com/o/vista-frontal-adorable-nina-joven-sonriente.jpg?alt=media&token=e23f40ea-56ae-4094-9a29-cce049272bc4'}}
              ></Image>
              <View>
              <Text style={{fontFamily: 'rot-m', paddingHorizontal:10}}>María es la dueña</Text>
              <Text style={{fontFamily: 'rot-l', paddingHorizontal:10, fontSize:10}}>SuperAlojo - 2 años alojando</Text>

              </View>
              
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{fontFamily: 'rot-m', fontSize: 15}}>Donde te alojarás</Text>
                <Image
                style ={styles.imageMap}
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/alojavalpo.appspot.com/o/Captura%20de%20Pantalla%202024-06-16%20a%20la(s)%209.53.20%20p.m..png?alt=media&token=eec37071-872b-498e-aa26-786eb27ba8a4'}}>
                </Image>
                </View>
          </ScrollView>
          <View style={styles.bottomView}>
          <Text style={styles.textStyle}>${publication.Valor} CLP</Text>
          <Text style={{fontFamily:'rot-l'}}> /{publication.tiempoAlojo}</Text>

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
    fontFamily: 'rot-b',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal:10,

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
    borderColor: 'grey',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:20
    
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
    borderColor: '#004AAD',
    marginLeft: 30


  },
  textTitulo:{
    fontFamily: 'rot-m',
    fontSize: 25,
  },
  textPlace:{
    fontFamily: 'rot-r',
    fontSize: 15,
    marginTop: 10

  },
  textDescription: {
    fontFamily: 'rot-l',
    fontSize: 12,
    marginTop: 10
  },
  bottomContainer:{
    paddingHorizontal: 30,
    marginTop:10

  },
  userContainer:{
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    marginTop: 20,
    height: 70,
    width: 330,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    
  },
  imageMap:{
    width: 320,
    height: 220,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25
  }
});
