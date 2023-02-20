import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Accelerometer } from 'expo-sensors';

import ConfettiCannon from 'react-native-confetti-cannon';

import { Ionicons } from '@expo/vector-icons';


var workoutNumber = 0;
let rep = 0;
let left = false;
let right = false;

const timeLimit = 10;
const progressBarSize = 350;
const progressBarInnerIncrease = progressBarSize / timeLimit;
var progressBarContinue = true;
var accelerometerDataCollect = true;


export default function WorkoutOngoingPage () {

  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("In progress...");
  const [workouttext, setWorkouttext] = useState("UP");
  const [shoot, setShoot] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progressBarContinue) {
        setProgress(prevProgress => prevProgress + progressBarInnerIncrease);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    //Time out to fire the cannon
    setTimeout(() => {
      setShoot(true);
    }, 10000);
  }, []);


  useEffect(() => {

    if (progress == (progressBarSize)) {
      playSound();
      let totalReps = Math.floor(rep);
      console.log(totalReps)
      setText("Well done! You've completed " + totalReps.toString() + " reps");
      progressBarContinue = false;
      accelerometerDataCollect = false;
    }
  }, [progress]);

  const playSound = async () => {
    // const soundObject = new Audio.Sound();
    // try {
    //   await soundObject.loadAsync(require("./assets/success.mp3"));
    //   await soundObject.playAsync();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const [counter, setCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const startAccelerometer = async () => {
      await Accelerometer.addListener(accelerometerData => {
        const { x, y, z } = accelerometerData;
        
        if (workoutNumber == 0) {
          /*

            Kettlebell Swing Detection (0)

          */
          // Check if phone is tilted towards the floor (Outward Swing)
          if (z > 0.5 && !left && accelerometerDataCollect) { // Check if phone is tilted upwards (Starting Position)
            console.log("Up")
            setWorkouttext("UP")
            setCounter(counter + 1);
            left = true;
            right = false;
            rep += 0.5;
          }
          if (z < -0.5 && !right && accelerometerDataCollect) {
            console.log("Dowm")
            setWorkouttext("DOWN")
            setCounter(counter + 1);
            left = false;
            right = true;
            rep += 0.5;
          } 
        } else if (workoutNumber == 1) {
          /*

            Kettlebell Russian Twist

          */
          // Check if phone is tilted to the left
          if (x < -0.5) {
            console.log("Right")
            setCounter(counter + 1);
            left = false;
            right = true;
          } else if (x > 0.5) { // Check if phone is tilted to the right
            console.log("Left")
            setCounter(counter + 1);
            left = true;
            right = false;
          }
        } else if (workoutNumber == 2) {
          /*

            Kettlebell Unknown Movement

          */
          // Check if phone is tilted to the left
          if (y < -0.5) {
            console.log("Dpwm")
            setCounter(counter + 1);
            left = false;
            right = true;
          } else if (y > 0.5) { // Check if phone is tilted to the right
            console.log("Up")
            setCounter(counter + 1);
            left = true;
            right = false;
          }
        }
      });
    };

    startAccelerometer();

    return () => {
        Accelerometer.removeAllListeners();
      };
    }, [counter, timeLeft]);

  return (
    <View style={styles.container}>
          <View style={styles.halfView}>
            <View style={styles.profile}>
              <Text style={styles.headerText}> 
                {text} 
              </Text>
              <View style={[styles.progressBarOuter, {width: progressBarSize}]}>
                <View style={[styles.progressBarInner, {width: progress}]}/>
              </View>
            </View>
          </View>
          <View style={styles.halfView}>
            <Text style={styles.headerText}> 
              {workouttext} 
            </Text>
          </View>
        {/* <View style={styles.container}>
          <View style={style.accelerometerDataContainer}>
            <Text style={style.text}>Accelerometer is Active</Text>
            <Text>Rep: {rep}</Text>
          </View>
        </View> */}
        {shoot ? (
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        ) : null}
    </View>
  );
};

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
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 27,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
      width: 350,
      height: 210,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderColor: 'lightgrey', //'#FFC107',
      borderRadius: 12,
      borderWidth: 4,
      flexDirection: 'row',
      
    },
    infoContainer: {
      height: 90,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 75,
      color: '#000',
      flexDirection: 'row',
      
    },
    buttonCenter: {
      width: 350,
      height: 110,
      marginVertical: 5,
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
      width: 220,
      backgroundColor: '#fff',
      
    },
    buttonText: {
      fontSize: 20,
      color: 'grey'
    },
    progressBarInner: {
      height: 50,
      flexDirection: "row",
      backgroundColor: '#58CC02',
      borderColor: '#000',
      borderRadius: 25
    },
    progressBarOuter: {
      height: 50,
      flexDirection: "row",
      backgroundColor: 'grey',
      borderColor: '#000',
      borderRadius: 25
    }
});

const style = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  accelerometerDataContainer: {
      padding: 18,
      borderRadius: 10,
      backgroundColor: "#5806f9",
      textDecorationColor: "white",
      fontWeight: "bold"
  },
  header: {
      fontWeight: "bold",
      color: '#fff'

  },
  text: {
      color: '#fff'
  }
  
})
