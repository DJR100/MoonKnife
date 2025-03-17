import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LevelInfoComponent = ({ 
  level,
  levelName, 
  remainingKnives, 
  timeRemaining,
  lives
}) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Time color changes based on time remaining
  const getTimeColor = () => {
    if (timeRemaining <= 10) return '#FF3B30'; // Red when less than 10 seconds
    if (timeRemaining <= 20) return '#FFCC00'; // Yellow when less than 20 seconds
    return '#FFFFFF'; // White otherwise
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>LEVEL {level}</Text>
          <Text style={styles.levelNameText}>{levelName}</Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: getTimeColor() }]}>
            {formatTime(timeRemaining)}
          </Text>
        </View>
      </View>
      
      <View style={styles.bottomRow}>
        <View style={styles.knivesContainer}>
          <Text style={styles.infoLabel}>KNIVES</Text>
          <Text style={styles.knifeCount}>{remainingKnives}</Text>
        </View>
        
        <View style={styles.livesContainer}>
          <Text style={styles.infoLabel}>LIVES</Text>
          <View style={styles.livesIcons}>
            {[...Array(3)].map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.lifeIcon, 
                  i < lives ? styles.lifeActive : styles.lifeInactive
                ]} 
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 15,
    zIndex: 10
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  levelContainer: {
    flexDirection: 'column'
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  levelNameText: {
    color: '#CCCCCC',
    fontSize: 14
  },
  timeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  knivesContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    marginBottom: 5
  },
  knifeCount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  livesContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  livesIcons: {
    flexDirection: 'row',
  },
  lifeIcon: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 3
  },
  lifeActive: {
    backgroundColor: '#FF453A'
  },
  lifeInactive: {
    backgroundColor: '#555555'
  }
});

export default LevelInfoComponent; 