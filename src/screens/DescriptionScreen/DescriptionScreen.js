import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import styles from './styles';
import Images from '../../../assets/Images';
export default function DescriptionScreen({ route }) {
  return (
    <ScrollView style={styles.backGrd}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>{route.params.Name}</Text>
        <Image
          source={Images[route.params.Name]}
          style={{
            width: 40,
            height: 40,
            marginTop: 5,
            marginRight: 15,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.descripContainer}>
        <Text style={styles.descripText}> {route.params.description} </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Information</Text>
        <View style={styles.infoPos}>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}>Harvest</Text>
            <Image
              source={require('./DescripImages/harvest.png')}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 3,
              }}
            >
              {route.params.harvest}
            </Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}>Water Req</Text>
            <Image
              source={require('./DescripImages/waterdrop.png')}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 3,
              }}
            >
              {route.params.waterReq}
            </Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}>Weather </Text>
            <Image
              source={require('./DescripImages/sun.png')}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>
              {route.params.weather}
            </Text>
          </View>
        </View>
        <View style={styles.infoPos1}>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}>Depth </Text>
            <Image
              source={require('./DescripImages/line-spacing.png')}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
                marginTop: 3,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                marginTop: 4,
              }}
            >
              {route.params.depth}
            </Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}>Spacing</Text>
            <Image
              source={require('./DescripImages/ruler.png')}
              style={{
                width: 35,
                height: 35,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <Text style={{ color: 'white', fontSize: 12, alignSelf: 'center' }}>
              {route.params.spacing}
            </Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.infoTxt}></Text>
          </View>
        </View>
      </View>
      <View style={styles.companionContainer}>
        <Text style={{ textAlign: 'center', marginTop: 17, color: 'white' }}>
          Companions
        </Text>
        <Image
          source={require('../../../assets/img/Corn.png')}
          style={{
            width: 35,
            height: 35,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/img/Pea.png')}
          style={{
            width: 35,
            height: 35,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/img/Radish.png')}
          style={{
            width: 35,
            height: 35,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/img/Tomato.png')}
          style={{
            width: 35,
            height: 35,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.pestContainer}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 17,
            color: 'white',
            marginLeft: 50,
          }}
        >
          Pest
        </Text>
        <Image
          source={require('../../../assets/img/Snail.png')}
          style={{
            width: 35,
            height: 35,
            marginTop: 10,
            marginLeft: 50,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}
