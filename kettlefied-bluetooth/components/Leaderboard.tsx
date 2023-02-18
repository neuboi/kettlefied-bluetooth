import { StyleSheet, View, Pressable, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const data = [
    { key: 'Button 1', desc: 'This is a brief description of each workout' },
    { key: 'Button 2', desc: 'This is a brief description of each workout' },
    { key: 'Button 3', desc: 'This is a brief description of each workout' },
    { key: 'Button 4', desc: 'This is a brief description of each workout' }
  
  ];

  export default function LeaderboardPage({navigation}: any) {
    {/*https://www.flaticon.com/free-icon/user_1077114?term=user&page=1&position=3&origin=search&related_id=1077114*/}
    //const PlaceholderImage = require('./assets/kettleballicon-flaticon.png');

    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity style={styles.button}>
          <Ionicons name="md-settings" size={32} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{item.key}</Text>
            <Text style={styles.buttonText}>{item.desc}</Text>

          </View>
        </TouchableOpacity>

      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>All KettleFied Workouts</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
        <View style={styles.space}>
          <Text></Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 25,
        color: "#000",
        fontWeight: 'bold'
    }, 
    text: {
      color: "#fff",
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#287cd7', 
        shadowRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.5,
        borderRadius: 18,
        width: 300,
        height: 80,
        padding: 20,
        margin: 8
      },


      headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 23,
        paddingVertical: 30
      },
      button: {
        width: 350,
        height: 310,
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
      textContainer: {
        width: 220,
        backgroundColor: '#fff',
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
      }
  });
  