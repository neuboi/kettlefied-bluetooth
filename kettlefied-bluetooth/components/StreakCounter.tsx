import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View } from 'react-native';

export default function StreakCounter() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const currentStreak = await AsyncStorage.getItem('streak');
      if (currentStreak) {
        setStreak(Number(currentStreak) + 1);
        await AsyncStorage.setItem('streak', (Number(currentStreak) + 1).toString());
      } else {
        setStreak(1);
        await AsyncStorage.setItem('streak', '1');
      }
    })();
  }, []);

  return (
    <View>
      <Text>You've opened this app {streak} times!</Text>
    </View>
  );
};

