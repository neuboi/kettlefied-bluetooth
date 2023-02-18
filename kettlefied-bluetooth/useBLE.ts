import * as ExpoDevice from "expo-device" 

import { useMemo, useState } from  "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx"

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevice: Device[];
}

function useBLE(): BluetoothLowEnergyApi {
    const bleManager = useMemo(() => new BleManager(), [])
    const [allDevice, setAllDevices] = useState<Device[]>([])

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
        if (device && device.name != null) {
            console.log("Device: " , device?.name)
            setAllDevices((prevState: Device[]) => {
            if (!isDuplicateDevice(prevState, device)) {
                return [...prevState, device];
            }
            return prevState;
            });
        }
        });

    return {
        scanForPeripherals,
        requestPermissions,
        allDevice
    }
}

export default useBLE;