import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { useNavigation, NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


import DeviceModal from './DeviceConnectionModal';
import useBLE from '../useBLE';

export default function Header() {
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
        <View style={styles.header}>
            <Text style={styles.headerText}>KettleFied | YOLO Status</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Ionicons name="md-settings" size={32} />
            </TouchableOpacity> */}

            {/* <TouchableOpacity
                onPress={connectedDevice ? disconectFromDevice : openModal}
            >
                <Ionicons name="md-bluetooth" size={32} />
            </TouchableOpacity> */}

            <View>
                {connectedDevice ? (
                <>
                    <Text>{heartRate}</Text>                    
                    {/* <Text>Connected to Kettlefied!: Your Heart Rate Is:</Text>
                    <Text> {heartRate} bpm</Text> */}
                    <TouchableOpacity
                    onPress={disconectFromDevice}
                    >
                        <Ionicons name="md-bluetooth" size={32} />
                    </TouchableOpacity>
                </>
                ) : (
                    // <Text>D</Text>
                    <TouchableOpacity
                    onPress={openModal}
                    >
                        <Ionicons name="md-bluetooth" size={32} />
                    </TouchableOpacity>
                )}
            </View>

            {/* <TouchableOpacity
                onPress={connectedDevice ? disconectFromDevice : openModal}
            >
                <Text>
                {connectedDevice ? "Disconnect" : "Connect"}
                </Text>
            </TouchableOpacity> */}

            

            <DeviceModal
                closeModal={hideModal}
                visible={isModalVisible}
                connectToPeripheral={connectToDevice}
                devices={allDevice}
            />
            
            {/* <Text>
                {connectedDevice ? "Disconnect" : "Connect"}
            </Text>
            <Text>{heartRate}</Text> */}
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
      justifyContent: 'flex-start',
      marginHorizontal: 30
    },
    taskbarButtonText: {
      color: '#000',
      fontSize: 12,
      marginTop: 0,
    },
    headerText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      paddingBottom: 10
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      flex: 1,
      paddingTop: 0
  
      
    }
  });
  
  