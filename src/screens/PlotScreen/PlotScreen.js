import React, { useEffect, useState, Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Grid from '../../../components/Grid';

class PlotScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#333333' }}>
        <Grid> </Grid>
      </View>
    );
  }
}
export default PlotScreen;
