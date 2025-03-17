import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GameOverModal = ({ 
  level, 
  onRetry, 
  onHome 
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
        </View>
        
        <View style={styles.levelInfo}>
          <Text style={styles.reachedText}>You reached</Text>
          <Text style={styles.levelText}>Level {level}</Text>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.retryButton]} 
            onPress={onRetry}
          >
            <Text style={styles.buttonText}>TRY AGAIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.homeButton]} 
            onPress={onHome}
          >
            <Text style={styles.buttonText}>HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#222222',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5
  },
  header: {
    marginBottom: 20
  },
  gameOverText: {
    color: '#FF5252',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  levelInfo: {
    alignItems: 'center',
    marginBottom: 30
  },
  reachedText: {
    color: '#CCCCCC',
    fontSize: 16
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5
  },
  buttons: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  retryButton: {
    backgroundColor: '#2196F3'
  },
  homeButton: {
    backgroundColor: '#FF5722'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default GameOverModal; 