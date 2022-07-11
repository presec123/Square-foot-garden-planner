import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { IconButton, Colors } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const entityRef = firebase.firestore().collection('plotsAdded');

  useEffect(() => {
    entityRef.orderBy('createdAt').onSnapshot(
      (querySnapshot) => {
        const newEntities = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        setEntities(newEntities);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const onAddButtonPress = () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      createdAt: timestamp,
      size: 3,
    };
    entityRef
      .add(data)
      .then((_doc) => {
        setEntityText('');
        Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
    setModalVisible(!modalVisible);
  };

  const onDeleteButtonPress = (item) => {
    entityRef.doc(item).delete();
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <IconButton
          icon="trash-can-outline"
          color={Colors.red500}
          size={40}
          onPress={() => {
            onDeleteButtonPress(item.id);
          }}
        />
        <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
          Plot {1 + index}
        </Text>
        <IconButton
          icon="arrow-right-thick"
          color={Colors.red500}
          size={40}
          onPress={() => {
            navigation.navigate('Garden 1', item);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create a plot</Text>
              <TextInput
                style={styles.input}
                placeholder="Size"
                placeholderTextColor="white"
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={onAddButtonPress}
              >
                <Text style={styles.textStyle}>Create</Text>
              </TouchableOpacity>
              <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
      <Pressable
        style={[styles.plotBtn]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Add Plot</Text>
      </Pressable>
    </View>
  );
}
