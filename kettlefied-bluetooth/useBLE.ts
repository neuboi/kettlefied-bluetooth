import * as ExpoDevice from "expo-device" 

import base64 from "react-native-base64";

const UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const CHARACTERISTIC = "0000ffe1-0000-1000-8000-00805f9b34fb";

import { useMemo, useState } from  "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleError, BleManager, Characteristic, Device } from "react-native-ble-plx"

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevice: Device[];
    connectToDevice: (deviceId: Device) => Promise<void>;
    connectedDevice: Device | null;
    heartRate: number;
    disconectFromDevice(): void;
}

function useBLE(): BluetoothLowEnergyApi {
    const bleManager = useMemo(() => new BleManager(), [])
    const [allDevice, setAllDevices] = useState<Device[]>([])
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    
    // DATA COLLECTION --------------------------------------------------
        const [heartRate, setHeartRate] = useState<number>(0);
    // DATA COLLECTION --------------------------------------------------

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Scan Permission",
                message: "App requires Bluetooth Scanning",
                buttonPositive: "OK",
            }
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Connection Permission",
                message: "App requires Bluetooth Connecting",
                buttonPositive: "OK",
            }
        );
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "File Location",
                message: "App requires fine location",
                buttonPositive: "OK",
            }
        );
        
        return (
            bluetoothScanPermissions === "granted" &&
            bluetoothConnectPermission === "granted" &&
            bluetoothFineLocationPermission == "granted"
        );
    };

    const requestPermissions = async () => {
        if(Platform.OS == "android") {
            if((ExpoDevice.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "File Location",
                        message: "App requires fine location",
                        buttonPositive: "OK",
                    }
                )
                return granted == PermissionsAndroid.RESULTS.granted;
            } else {
                const isAndroid31PermissionGranted = await requestAndroid31Permissions();
                return isAndroid31PermissionGranted;
            }
        } else {
            return true;
        }
    }

    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const scanForPeripherals = () =>
        console.log("Scanning")
        bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.log(error);

        }
        if (device && device.name == "HMSoft") {
            console.log("Device: " , device?.name)
            setAllDevices((prevState: Device[]) => {
            if (!isDuplicateDevice(prevState, device)) {
                return [...prevState, device];
            }
            return prevState;
            });
        }
        });

    const connectToDevice = async (device: Device) => {
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id)
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();
            startStreamingData(deviceConnection)
        } catch (e) {
            console.log("ERROR IN CONNECTIOn", e);
        }
    };
    
    const onUpdate =(
        error: BleError | null,
        characteristic: Characteristic | null
        ) => {
            console.log("Running onUpdate")

            if (error) {
                console.log("Error Detected")
                console.log(characteristic?.value)

                console.log(error);
                return
            } else if (!characteristic?.value) {
                console.log("No Data Recieved")
                return
            }
            
            // Data Stored In this Variable
            console.log("Value: " + base64.decode(characteristic.value))

    }

    const startStreamingData = async(device: Device) => {
        if(device) {
            console.log("Device Found and Attempting Streamning")
            console.log(device.name)
            console.log(device.id)
            device.monitorCharacteristicForService(
                UUID,
                CHARACTERISTIC,
                onUpdate
            )

        } else {
            console.log("No Device Connected")
        }
    }

    const disconectFromDevice = () => {
        if(connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            setHeartRate(0);
        }
    }

    return {
        scanForPeripherals,
        requestPermissions,
        allDevice,
        connectToDevice,
        connectedDevice,
        heartRate,
        disconectFromDevice,
    }
}

export default useBLE;