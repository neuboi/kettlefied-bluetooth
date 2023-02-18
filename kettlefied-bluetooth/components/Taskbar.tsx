import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation, NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


import DeviceModal from './DeviceConnectionModal';
import useBLE from '../useBLE';


export default function Taskbar() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    return (
    <View style={styles.taskbarContainer}>

      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="md-home" size={32} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate("WorkoutOngoing")}
      >
        <Ionicons name="md-people" size={32} />
      </TouchableOpacity>

    {/* 
      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate('Stats')}
      >
        <Ionicons name="md-settings" size={32} />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate('WorkoutOptions')}
      >
        <Ionicons name="md-heart" size={32} />
      </TouchableOpacity> */}

    </View>
  );
};

const styles = StyleSheet.create({
  taskbarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 40,
  },
  taskbarButton: {
    alignIetms: 'space-between',
    justifyContent: 'flex-start',
    marginHorizontal: 30
  },
  taskbarButtonText: {
    color: '#000',
    fontSize: 12,
    marginTop: 0,
  },
});
