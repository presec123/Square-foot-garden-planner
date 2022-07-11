import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import Calendar from '../../../components/Calendar';

export default function CalendarScreen() {
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
    var plantData = [];
    plantData.push({
      Name: item.Name,
      startIndoor: item.startIndoor,
      endIndoor: item.endIndoor,
      outsideStart: item.outsideStart,
      outsideEnd: item.outsideEnd,
      transplantStart: item.transplantStart,
      transplantEnd: item.transplantEnd,
    });
    return (
      <View style={styles.entityContainer}>
        <Calendar crops={plantData} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}
