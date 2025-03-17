import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import BackgroundComponent from '../components/BackgroundComponent';
import SwordComponent from '../components/SwordComponent';

const { width, height } = Dimensions.get('window');
const SWORD_SIZE = 60;

const HomeScreen = ({ navigation, route }) => {
  const [selectedSword, setSelectedSword] = useState({
    id: 'standard',
    name: 'Standard',
    color: '#D3D3D3',
    handleColor: '#8B4513',
    knifeType: 'standard'
  });
  
  // Get selected sword from navigation params if available
  useEffect(() => {
    if (route.params?.selectedSword) {
      setSelectedSword(route.params.selectedSword);
    }
  }, [route.params]);
  
  const handleStartGame = () => {
    // Pass the selected sword to the game screen
    navigation.navigate('Game', { selectedSword });
  };
  
  return (
    <View style={styles.container}>
      <BackgroundComponent />
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Moon Strike</Text>
        <Text style={styles.subtitleText}>Throw swords at the moon!</Text>
        
        {/* Display current sword */}
        <View style={styles.swordDisplay}>
          <Text style={styles.swordText}>Knife</Text>
          <View style={styles.swordImageContainer}>
            <SwordComponent
              size={SWORD_SIZE}
              x={SWORD_SIZE/2}
              y={SWORD_SIZE/2}
              rotation={0} // 0 degrees = pointing right
              isThrown={false}
              color={selectedSword.color}
              handleColor={selectedSword.handleColor}
              knifeType={selectedSword.knifeType}
              isSerrated={selectedSword.isSerrated}
              hasFingerWrap={selectedSword.hasFingerWrap}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartGame}
        >
          <Text style={styles.startButtonText}>Start Game</Text>
        </TouchableOpacity>
        
        <Text style={styles.instructionText}>
          Tap to throw swords at the rotating moon.{'\n'}
          Game ends when swords collide.
        </Text>
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
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitleText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  swordDisplay: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: width * 0.7,
    height: 120,
  },
  swordText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginBottom: 30,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  instructionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  swordImageContainer: {
    position: 'relative',
    width: SWORD_SIZE,
    height: SWORD_SIZE,
    marginTop: 5,
  },
});

export default HomeScreen;
