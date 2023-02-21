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

    const {
        requestPermissions,
        scanForPeripherals,
        allDevice,
        connectedDevice,
        connectToDevice,
        heartRate,
        disconectFromDevice
      } = useBLE();
    
      const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    
      const hideModal = () => {
        setIsModalVisible(false);
      };
    
      const openModal = async () => {
        scanForDevices();
        setIsModalVisible(true);
      };
    
      const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) {
          scanForPeripherals();
        }
      }

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
        onPress={() => navigation.navigate("Leaderboard")}
      >
        <Ionicons name="md-list-outline" size={32} />
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate('Stats')}
      >
        <Ionicons name="md-star" size={32} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate('WorkoutOptions')}
      >
        <Ionicons name="md-barbell-outline" size={32} />
      </TouchableOpacity> 
      
      
      <View>
        {connectedDevice ? (
        <>
            {/* <Text>{heartRate}</Text>                     */}
            {/* <Text>Connected to Kettlefied!: Your Heart Rate Is:</Text>
            <Text> {heartRate} bpm</Text> */}
            <TouchableOpacity
            style={styles.taskbarButton}
            onPress={disconectFromDevice}
            >
                <Ionicons name="md-stop-outline" size={32} />
            </TouchableOpacity>
        </>
        ) : (
            // <Text>D</Text>
            <TouchableOpacity
            style={styles.taskbarButton}
            onPress={openModal}
            >
                <Ionicons name="md-bluetooth" size={32} />
            </TouchableOpacity>
        )}
      </View>

      
      <TouchableOpacity
        style={styles.taskbarButton}
        onPress={() => navigation.navigate("AboutPage")}
      >
        <Ionicons name="md-settings" size={32} />
      </TouchableOpacity>


      <DeviceModal
          closeModal={hideModal}
          visible={isModalVisible}
          connectToPeripheral={connectToDevice}
          devices={allDevice}
      />




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
