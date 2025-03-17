import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import BackgroundComponent from '../components/BackgroundComponent';

const { width, height } = Dimensions.get('window');

const GameOverScreen = ({ route, navigation }) => {
  const { score } = route.params;
  
  const handleRestart = () => {
    navigation.replace('Game');
  };
  
  return (
    <View style={styles.container}>
      <BackgroundComponent />
      
      <View style={styles.contentContainer}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.scoreText}>Final Score: {score}</Text>
        
        <TouchableOpacity 
          style={styles.restartButton}
          onPress={handleRestart}
        >
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF5252',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  restartButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GameOverScreen;
