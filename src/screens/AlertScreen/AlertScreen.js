import React, { Component } from 'react';
import { View, Button, FlatList, Text, ScrollView } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import CountDown from 'react-native-countdown-component';

export default class AlertScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertData: null,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('alerts')
      .get()
      .then((snapshot) => {
        const alertData = [];
        snapshot.forEach(function (doc) {
          const data = doc.data();
          alertData.push(data);
        });
        this.setState({ alertData: alertData });
      });
  }

  renderEntity = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <CountDown
          size={25}
          until={item.harvestDay}
          onFinish={() => alert(item.Name + 'are ready to be harvest')}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: 'black',
            marginTop: 25,
          }}
          digitTxtStyle={{ color: 'black' }}
          timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
          separatorStyle={{ color: 'red' }}
          timeToShow={['D', 'H']}
          timeLabels={{ d: 'Days', h: 'Hours' }}
          showSeparator
        />
        <Text style={{ textAlign: 'center', color: 'white' }}>
          {item.name + 's'}, {item.x}, {item.y}
        </Text>
      </View>
    );
  };
  render() {
    const { alertData } = this.state;
    return (
      <ScrollView style={styles.backGrd}>
        <Button
          color="#1a1a1a"
          title="Refresh"
          onPress={this.componentDidMount()}
        />
        {alertData && (
          <FlatList
            data={alertData}
            renderItem={this.renderEntity}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>
    );
  }
}
