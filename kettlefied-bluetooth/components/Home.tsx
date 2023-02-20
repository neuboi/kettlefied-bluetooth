import { StyleSheet, View, Pressable, TouchableOpacity, Text, FlatList, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useNavigation, NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import useBLE from '../useBLE';

const data = [
  { key: 'My Stats', workout: '' },
  { key: 'Most Recent Workout', workout: '' },

];

export default function HomePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    {/*https://www.flaticon.com/free-icon/kettlebell_8205418?term=kettlebell&page=1&position=9&origin=tag&related_id=8205418*/}
    const PlaceholderImage = require('../assets/user_icon.png');
    
    const renderItem = ({ item }:any) => {
      const n = item.workout
      return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(n)}>
          <Ionicons name="md-settings" size={32} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{item.key}</Text>
          </View>
      </TouchableOpacity>
      );
    };

    return (
        <View style={styles.container}>
          <View style={styles.halfView}>
            <View style={styles.profile}>
              <Ionicons name="md-people" size={128} />
              <Text style={styles.headerText}>Welcome Stephen!</Text>
            </View>
          </View>
          <View style={styles.halfView}>
            <FlatList
              data={data}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  halfView: {
    marginHorizontal: 20,
    marginVertical: 25
  },
    button: {
      width: 350,
      height: 110,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 25,
      backgroundColor: '#ffffff',
      borderColor: 'lightgrey', //'#FFC107',
      borderRadius: 12,
      borderWidth: 4,
      flexDirection: 'row',
      
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'whites',
    },
    footerText: {
      fontSize: 20,
      color: '#fff',
    },
    text: {
      color: '#000',
    },
    buttonText: {
      fontSize: 20,
      color: 'grey'
    },
    list: {
      height: 400
    },
    headerText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 23,
    },
    textContainer: {
      width: 220,
      backgroundColor: '#fff',
      
    },
    profile: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20
    }
  });