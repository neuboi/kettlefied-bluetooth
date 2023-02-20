import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useNavigation, NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


import StreakCounter from '../components/StreakCounter';
import Calendar from './Calendar'

const data = [
  { key: 'Kettlebell Swing', desc: 'Youve done this workout the most!' },
  { key: 'Mon Feb 13', desc: 'You worked out for the longest time on this day!' },
  { key: '1 Hour and 30 Minutes', desc: 'This is the longest youve worked out so far!' },
  { key: '17 Friends', desc: 'Youve shared this app with 30 Friends!' }

];

export default function StatsPage() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity style={styles.button}>
          <View style={styles.textContainer}>
            <Text style={styles.buttonHeader}>{item.key}</Text>
            <Text style={styles.buttonText}>{item.desc}</Text>

          </View>
        </TouchableOpacity>

      );
    };

    return (
        <View style={styles.container}>

          <View style={styles.halfView}>
            <View style={styles.statsHeader}>
              <Text style={styles.headerText}>You're doing great, Stephen!</Text>
              <StreakCounter></StreakCounter>
              <Calendar></Calendar>
            </View>
          </View>
          <View style={styles.halfView}>
            <FlatList
              data={data}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
            />
            <View style={styles.space}>
              <Text></Text>
            </View>
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
  statsHeader: {
    paddingVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23,
    paddingTop: 30
  },
  button: {
    width: 350,
    height: 210,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderColor: 'lightgrey', //'#FFC107',
    borderRadius: 40,
    borderWidth: 4,
    flexDirection: 'row',
    
  },
  textContainer: {
    width: 220,
    backgroundColor: '#fff',
  },
  buttonHeader: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 20,
    color: 'grey'
  },
  
  list: {
    paddingVertical: 5,
    overflow: 'scroll',
  },
  space: {
    paddingVertical: 30,
  },
    text: {
      color: "#000",
      fontSize: 20,
    },
    image: {
      //width: 20,
      //height: 40,
      borderRadius: 18,
    },
    imageContainer: {
      //flex: 1/2,
      margin: 12
      //paddingTop: 58,
    },
    footer: {
      flex: 1/8,
      margin: 12,
      alignItems: 'center',
    },
    Button: {
      padding: 100
    },
    header: {
        fontSize: 25,
        color: "#000",
        fontWeight: 'bold'
    }, 
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e718ca', 
        shadowRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.5,
        borderRadius: 18,
        width: 300,
        padding: 20,
        margin: 8
      }
  });
  