import React, { FC, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Device } from "react-native-ble-plx";

import { useNavigation, NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {

  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{item.item.name}</Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (

    <Modal 
      animationType="slide"
      transparent={false}
      visible={visible}>

          <View style={styles.modalContainer}>
            <View style={styles.halfView}>
              <Text style={styles.headerText}>Tap on a device to connect</Text>
              <TouchableOpacity style={styles.buttonCenter} onPress={() => closeModal()}>
                    <Text style={styles.buttonText}>Go Back!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.halfView}>
              <FlatList
                contentContainerStyle={styles.modalContainerBluetooth}
                data={devices}
                renderItem={renderDeviceModalListItem}
              />
            </View>
          </View>
        
       
      </Modal>
      

    // <Modal
    //   style={modalStyle.modalContainer}
    //   animationType="slide"
    //   transparent={false}
    //   visible={visible}
    // >
    //     <SafeAreaView style={modalStyle.halfView}>
    //       <Text style={modalStyle.modalTitleText}>
    //         Tap on a device to connect
    //       </Text>
    //     </SafeAreaView>

    //     <SafeAreaView style={modalStyle.halfView}>
    //       <FlatList
    //         contentContainerStyle={modalStyle.modalFlatlistContiner}
    //         data={devices}
    //         renderItem={renderDeviceModalListItem}
    //       />
    //     </SafeAreaView>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'scroll',

  },
  modalContainerBluetooth: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'scroll',

  },
  halfView: {
    marginHorizontal: 20,
    marginVertical: 25
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  ctaButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    
  },
  
  list: {
    paddingVertical: 5,
    overflow: 'scroll',
  },
  space: {
    paddingVertical: 30,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23,
    paddingVertical: 30
  },
  button: {
    width: 250,
    height: 60,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
    borderColor: 'lightgrey', //'#FFC107',
    borderRadius: 12,
    borderWidth: 4,
    flexDirection: 'column',
    
  },
  buttonCenter: {
    height: 70,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderColor: 'lightgrey', //'#FFC107',
    borderRadius: 75,
    borderWidth: 4,
    flexDirection: 'row',
    
  },
  textContainer: {
    width: 120,
    backgroundColor: '#fff',
    
  },
  buttonText: {
    fontSize: 20,
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

});

export default DeviceModal;