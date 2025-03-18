import { useState, useEffect, useRef } from 'react';

/**
 * useGameStateManager - A hook to manage game state transitions
 * Extracted from GameScreen.js to modularize the codebase
 */
const useGameStateManager = (
  levelData, 
  navigation, 
  route, 
  setLives, 
  setTimeRemaining,
  setRemainingKnives,
  setIsLevelComplete,
  setIsGameOver
) => {
  // Game timers and animation refs
  const gameTimerRef = useRef(null);
  const animationRef = useRef(null);

  // Method to handle level completion
  const handleLevelComplete = () => {
    // Clear timers
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    setIsLevelComplete(true);
  };
  
  // Method to handle game over
  const handleGameOver = () => {
    // Clear timers
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    
    setIsGameOver(true);
  };

  // Method to proceed to next level
  const handleNextLevel = () => {
    const levelId = route.params?.level || 1;
    const nextLevelId = levelId + 1;
    const selectedSword = route.params?.selectedSword;
    
    if (nextLevelId <= 30) { // Assuming max level is 30
      navigation.replace('GameScreen', { 
        level: nextLevelId,
        selectedSword,
        highestLevelReached: route.params?.highestLevelReached || nextLevelId
      });
    } else {
      // Player completed all levels, go to home screen
      navigation.navigate('Home', { 
        highestLevelReached: 30 // All levels completed
      });
    }
  };
  
  // Method to retry current level
  const handleRetry = () => {
    const levelId = route.params?.level || 1;
    const selectedSword = route.params?.selectedSword;
    
    navigation.replace('GameScreen', { 
      level: levelId,
      selectedSword,
      highestLevelReached: route.params?.highestLevelReached
    });
  };
  
  // Method to go back to home screen
  const handleHomePress = () => {
    navigation.navigate('Home', { 
      highestLevelReached: route.params?.highestLevelReached
    });
  };

  // Update highest level reached when level is completed
  useEffect(() => {
    const levelId = route.params?.level || 1;
    const isLevelComplete = false; // Default state
    
    if (isLevelComplete) {
      // Update highest level reached in game state
      const currentHighest = route.params?.highestLevelReached || 1;
      const newHighest = Math.max(currentHighest, levelId + 1);
      navigation.setParams({ highestLevelReached: newHighest });
    }
  }, [route.params?.level, navigation, route.params?.highestLevelReached]);

  return {
    handleLevelComplete,
    handleGameOver,
    handleNextLevel,
    handleRetry,
    handleHomePress,
    gameTimerRef,
    animationRef
  };
};

export default useGameStateManager; 