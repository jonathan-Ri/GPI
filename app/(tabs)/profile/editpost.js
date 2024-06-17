import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity, ImageBackground, Modal, TextInput, Alert } from "react-native";
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import { firebase } from '../../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Details = () => {
  const { id } = useLocalSearchParams(); // Obtener el parámetro id de la URL
  const [loading, setLoading] = useState(true);
  const [publication, setPublication] = useState(null);
  const [description, setDescription] = useState('');
  const [direccion, setDireccion] = useState('');
  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const doc = await firebase.firestore().collection('publicacion').doc(id).get();
        if (doc.exists) {
          setPublication(doc.data());
          setDescription(doc.data().Descripcion);
          setDireccion(doc.data().direccion);

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

  const handleSave = async () => {
    try {
      await firebase.firestore().collection('publicacion').doc(id).update({
        Descripcion: description,
        direccion: direccion

      });
      alert('Datos actualizados con éxito');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert('Error al actualizar los datos');
    }
  };

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
  const handleDelete = async () => {
    try {
      await firebase.firestore().collection('publicacion').doc(id).delete();
      alert('Publicación eliminada con éxito');
      router.back(); // Regresa a la pantalla anterior después de eliminar
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert('Error al eliminar la publicación');
    }
  };
  const confirmDelete = () => {
    Alert.alert(
      "Eliminar publicación",
      "¿Estás seguro de que deseas eliminar esta publicación?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: handleDelete
        }
      ],
      { cancelable: false }
    );
  };

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
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDireccion}
                        value={direccion}
                    />
        <Text style={styles.textStyle}>{publication.Wifi ? 'WiFi: Disponible' : 'WiFi: No disponible'}</Text>
        <Text style={styles.textStyle}>${publication.Valor} CLP /por semana</Text>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={{ color: 'white', fontFamily: 'rot-l' , alignSelf: 'center',}}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteButtonText}>Eliminar Publicación</Text>
        </TouchableOpacity>
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
  textInput: {
    height: 40,
    borderColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '1000%',
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
    marginTop: -260,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityIndicator: {
    justifyContent: 'center',
    padding: 200,
  },
  input: {
    height: 30,
    width: 300,
    borderBottomWidth: 0.8,
    borderRadius: 10,
    padding: 5,
    borderColor: '#004AAD',
    alignSelf:'center',
    marginTop: 0,
    fontFamily: 'rot-l'
},
saveButton: {
    borderRadius: 5,
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#004AAD',
    justifyContent: 'center',
    marginVertical: 10,
},
label: {
    marginHorizontal: 45,
    fontFamily: 'rot-b'
},
deleteButtonText:{
    fontFamily: 'rot-l',
    color:'red',
    fontSize:14
},
deleteButton:{
    alignItems:'center'
}
});
