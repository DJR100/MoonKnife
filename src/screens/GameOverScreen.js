import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundComponent from '../components/BackgroundComponent';

const GameOverScreen = ({ navigation, route }) => {
  const { score = 0 } = route.params || {};
  
  // Immediately navigate to the home screen with the appropriate modal
  useEffect(() => {
    // Navigate to GameScreen with isGameOver flag
    navigation.replace('GameScreen', { 
      isGameOver: true,
      level: route.params?.level || 1
    });
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});

export default GameOverScreen;
