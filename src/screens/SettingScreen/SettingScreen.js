import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import styles from './styles';

export default function SettingScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView style={styles.backGrd}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              EasyGrow is a easy to use square foot garden planning tool created
              by Louis Nokes.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>About</Text>
      </Pressable>

      <TouchableOpacity
        style={styles.logButton}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.logText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
