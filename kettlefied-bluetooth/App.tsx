import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DeviceModal from './components/DeviceConnectionModal';
import useBLE from './useBLE';

export default function App() {

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
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <View>
        {connectedDevice ? (
          <>
            <Text>Connected to Kettlefied!: Your Heart Rate Is:</Text>
            <Text> {heartRate} bpm</Text>
          </>
        ) : (
          <Text>
            Please connect to a Kettlefied Device!
          </Text>
        )}
      </View>



      <TouchableOpacity
        onPress={connectedDevice ? disconectFromDevice : openModal}
      >
        <Text style={styles.ctaButton}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevice}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: "center",
  },
});
