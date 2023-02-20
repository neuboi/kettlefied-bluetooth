import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DeviceModal from './components/DeviceConnectionModal';
import useBLE from './useBLE';

import HomePage from './components/Home';
import Taskbar from './components/Taskbar';
import LeaderboardPage from './components/Leaderboard';
import Header from './components/Header';
import WorkoutOngoingPage from './components/WorkoutOngoing';
import AboutPage from './components/About';
import StatsPage from './components/Stats';
import WorkoutOptionsPage from './components/Workout';

const Stack = createNativeStackNavigator();

export default function App() {
    

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // </View>

    <View style={{ flex: 1 }}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomePage}/>
           <Stack.Screen name="Leaderboard" component={LeaderboardPage}/>
           <Stack.Screen name="WorkoutOngoing" component={WorkoutOngoingPage}/>
           <Stack.Screen name="AboutPage" component={AboutPage}/>
           <Stack.Screen name="Stats" component={StatsPage}/>
           <Stack.Screen name="WorkoutOptions" component={WorkoutOptionsPage}/>
           
          {/*<Stack.Screen name="Stats" component={StatsPage}/>
          <Stack.Screen name="Calendar" component={Calendar}/>

          <Stack.Screen name="WorkoutOptions" component={WorkoutPage}/>
          <Stack.Screen name="WorkoutDescription" component={WorkoutDescriptionPage}/>
          <Stack.Screen name="WorkoutOngoing" component={WorkoutOngoingPage}/>

           */}

        </Stack.Navigator>

        {/* Footer */}
        <View style={styles.footer}>
            <Taskbar></Taskbar>
        </View>

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: "#fff",
      fontSize: 20,
    },
    image: {
      borderRadius: 18,
    },
    imageContainer: {
      margin: 12
    },
    Button: {
      padding: 100
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopColor: 'lightgrey',
      borderTopWidth: 2
    },
    header: {
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 2,
      paddingTop: 15,
  
    },
    footerText: {
      fontSize: 20,
      color: '#fff'
    },
  });