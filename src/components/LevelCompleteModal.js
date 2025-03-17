import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LevelCompleteModal = ({ 
  level, 
  levelName, 
  onNext, 
  onRetry, 
  onHome 
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.levelComplete}>LEVEL COMPLETE!</Text>
        </View>
        
        <View style={styles.levelInfo}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.levelNameText}>{levelName}</Text>
        </View>
        
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.nextButton]} 
            onPress={onNext}
          >
            <Text style={styles.buttonText}>NEXT LEVEL</Text>
          </TouchableOpacity>
          
          <View style={styles.smallButtonsRow}>
            <TouchableOpacity 
              style={[styles.smallButton, styles.retryButton]} 
              onPress={onRetry}
            >
              <Text style={styles.smallButtonText}>RETRY</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.smallButton, styles.homeButton]} 
              onPress={onHome}
            >
              <Text style={styles.smallButtonText}>HOME</Text>
            </TouchableOpacity>
          </View>
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
  levelComplete: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  levelInfo: {
    alignItems: 'center',
    marginBottom: 30
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  levelNameText: {
    color: '#CCCCCC',
    fontSize: 16,
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
  nextButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  smallButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  smallButton: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  retryButton: {
    backgroundColor: '#2196F3'
  },
  homeButton: {
    backgroundColor: '#FF5722'
  },
  smallButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default LevelCompleteModal; 