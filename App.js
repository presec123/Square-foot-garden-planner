import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  AlertScreen,
  CalendarScreen,
  DescriptionScreen,
  PlotScreen,
  SettingScreen,
  VegListScreen,
} from './src/screens';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />

        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="Description"
          options={{
            headerTitleAlign: 'center',

            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: 'red',
          }}
          component={DescriptionScreen}
        />
        <Stack.Screen
          name="Garden 1"
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: 'red',
          }}
          component={PlotScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarItemStyle: {
            borderWidth: 1,
            borderColor: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },

          tabBarActiveTintColor: 'red',
        }}
      />
      <Tab.Screen
        name="Calendar"
        options={{
          tabBarLabel: 'Calendar',
          tabBarItemStyle: {
            borderWidth: 1,
            borderColor: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          tabBarActiveTintColor: 'red',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Plant List"
        options={{
          tabBarLabel: 'Plant list',
          tabBarItemStyle: {
            borderWidth: 1,
            borderColor: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" color={color} size={size} />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          tabBarActiveTintColor: 'red',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
        component={VegListScreen}
      />
      <Tab.Screen
        name="Alerts"
        options={{
          tabBarLabel: 'Alerts',
          tabBarItemStyle: {
            borderWidth: 1,
            borderColor: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" color={color} size={size} />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          tabBarActiveTintColor: 'red',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
        component={AlertScreen}
      />
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: 'Settings',
          tabBarItemStyle: {
            borderWidth: 1,
            borderColor: 'black',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          tabBarActiveTintColor: 'red',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
}
