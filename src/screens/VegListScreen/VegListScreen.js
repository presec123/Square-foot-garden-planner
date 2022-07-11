import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import Images from '../../../assets/Images';
import { IconButton, Colors } from 'react-native-paper';

export default function VegListScreen({ navigation }) {
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection('plants');

  useEffect(() => {
    entityRef.onSnapshot(
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
    console.log(entityRef);
  }, []);

  const renderEntity = ({ item }) => {
    return (
      <View style={styles.entityContainer}>
        <Image
          source={Images[item.Name]}
          style={{
            width: 40,
            height: 40,
          }}
          resizeMode="contain"
        />
        <Text style={styles.entityText}>{item.Name}</Text>
        <IconButton
          icon="arrow-right-thick"
          color={Colors.red500}
          size={25}
          onPress={() => {
            navigation.navigate('Description', item);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.formContainer}>
      {entities && (
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
