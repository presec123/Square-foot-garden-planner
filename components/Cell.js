import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { firebase } from '.././src/firebase/config';
import Images from '../assets/Images';

export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      containsPlant: false,
      plantData: null,
      plantPlaced: false,
      backgroundColor: '#5d3727',
      plantName: '',
      badCell: false,
      goodCell: false,
    };
  }

  //Retrieve plant data from firebase
  componentDidMount() {
    firebase
      .firestore()
      .collection('plants')
      .get()
      .then((snapshot) => {
        const plantData = [];
        snapshot.forEach(function (doc) {
          const data = doc.data();
          plantData.push(data);
        });
        this.setState({ plantData: plantData });
      });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  //Remove plant from cell ('wipe data')
  onRemove() {
    this.setState({
      backgroundColor: '#5d3727',
      plantName: '',
      containsPlant: false,
      badCell: false,
      plantPlaced: false,
    });
    this.props.onRemove(this.props.x, this.props.y);
  }

  //Send values to grid when plant is placed in cell
  onPlace = (goodNeighbor, badNeighbor, val) => {
    this.setState({
      plantPlaced: val,
      containsPlant: true,
    });
    this.props.onPlace(this.props.x, this.props.y, goodNeighbor, badNeighbor);
  };

  // Get plants date when added to the grid and send to firebase with name + position in grid
  setAlert = (harvestDay, name) => {
    if (name == 'Pumpkin' || name == 'Pea') {
      let seconds = harvestDay * 24 * 60 * 60;
      console.log(seconds);
      firebase.firestore().collection('alerts').add({
        harvestDay: seconds,
        name: name,
        x: this.props.x,
        y: this.props.y,
      });
    }
  };

  removeAlert = (id) => {
    firebase.firestore().collection('alerts').doc(id).delete();
  };

  renderEntity = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <Image
          source={Images[item.Name]}
          style={{
            width: 40,
            height: 40,
            marginTop: 5,
          }}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={{
            width: 225,
            height: 50,
          }}
          key={item}
          onPress={() => {
            this.setState({ plantName: item.Name }, () => {});
            this.setAlert(item.harvestDay, item.Name);
            this.onPlace(item.goodNeighbor, item.badNeighbor, true);
            this.setModalVisible(false);
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              marginTop: 15,
              marginLeft: 35,
            }}
          >
            {item.Name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { modalVisible, plantPlaced, backgroundColor, plantData, plantName } =
      this.state;
    if (!plantPlaced) {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={[
              styles.cell,
              { backgroundColor: backgroundColor },
              { width: this.props.width, height: this.props.height },
            ]}
          ></TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {plantData && (
                  <FlatList
                    data={plantData}
                    renderItem={this.renderEntity}
                    keyExtractor={(item) => item.id}
                  />
                )}

                <Pressable
                  style={[styles.button]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
              this.setState({
                containsPlant: true,
              });
            }}
            style={[
              styles.cell,
              { backgroundColor: backgroundColor },
              { width: this.props.width, height: this.props.height },
            ]}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[styles.cropButton]}
                    onPress={() => {
                      this.onPlace(false),
                        this.onRemove(),
                        this.setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Remove Crop</Text>
                  </TouchableOpacity>
                  {plantData && (
                    <FlatList
                      data={plantData}
                      renderItem={this.renderEntity}
                      keyExtractor={(item) => item.id}
                    />
                  )}

                  <Pressable
                    style={[styles.button]}
                    onPress={() => this.setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Image
              source={Images[plantName + 's']}
              style={{
                width: this.props.width / 1.2,
                height: this.props.height / 1.2,
                flex: 1,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    borderLeftColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: 400,
    width: 290,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderColor: 'red',
    marginTop: 15,
    borderWidth: 1,
    width: 225,
  },
  cropButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#1a1a1a',
    width: 225,
    borderColor: 'red',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    width: 200,
    height: 50,
  },
});
