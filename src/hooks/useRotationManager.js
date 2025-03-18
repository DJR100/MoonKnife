import { useState, useEffect } from 'react';

/**
 * useRotationManager - Manages moon rotation and speed transitions
 * Extracted from GameScreen.js to modularize the codebase
 */
const useRotationManager = (levelData, levelId) => {
  // State for rotation management
  const [moonRotation, setMoonRotation] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(levelData.baseRotationSpeed);
  const [targetRotationSpeed, setTargetRotationSpeed] = useState(levelData.baseRotationSpeed);
  const [speedTransitionProgress, setSpeedTransitionProgress] = useState(1);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise

  // State for timers
  const [directionChangeTimer, setDirectionChangeTimer] = useState(
    levelData.reversalInterval ? levelData.reversalInterval * 1000 : 0
  );
  const [speedChangeTimer, setSpeedChangeTimer] = useState(0);
  const [speedRampTimer, setSpeedRampTimer] = useState(
    levelId === 3 ? levelData.speedRampDuration * 1000 : 0
  );
  const [speedRampComplete, setSpeedRampComplete] = useState(false);

  /**
   * Updates the moon rotation based on current speed and direction
   * @param {number} deltaTime - Time elapsed since last update in ms
   */
  const updateRotation = (deltaTime) => {
    // Apply rotation to moon - ensure a minimum rotation amount
    setMoonRotation(prevRotation => {
      const rotationAmount = rotationSpeed * rotationDirection;
      // Ensure a minimum rotation to prevent getting stuck
      const effectiveRotation = Math.abs(rotationAmount) < 0.1 
        ? 0.1 * Math.sign(rotationAmount) 
        : rotationAmount;
      
      return (prevRotation + effectiveRotation + 360) % 360;
    });
  };

  /**
   * Updates the direction change timer and handles direction reversals
   * @param {number} deltaTime - Time elapsed since last update in ms
   */
  const updateDirectionChange = (deltaTime) => {
    setDirectionChangeTimer(prevTimer => {
      if (prevTimer <= 0 && levelData.reversalInterval > 0) {
        // When changing direction, ensure we don't get stuck at a rotation speed of 0
        setRotationDirection(prev => prev * -1);
        
        // Ensure rotation speed is non-zero when direction changes
        if (Math.abs(rotationSpeed) < 0.5) {
          setRotationSpeed(levelData.baseRotationSpeed);
          setTargetRotationSpeed(levelData.baseRotationSpeed);
        }
        
        return levelData.reversalInterval * 1000; // Convert to milliseconds
      }
      return prevTimer - deltaTime;
    });
  };

  /**
   * Updates speed change timer and handles speed variations
   * @param {number} deltaTime - Time elapsed since last update in ms
   */
  const updateSpeedChange = (deltaTime) => {
    // Skip speed variations for Level 1
    if (levelId === 1) return;
    
    setSpeedChangeTimer(prevTimer => {
      if (prevTimer <= 0 && levelData.speedChangeInterval) {
        // Generate a new random speed between min and max
        const minSpeed = levelData.minRotationSpeed || levelData.baseRotationSpeed * 0.5;
        const maxSpeed = levelData.maxRotationSpeed || levelData.baseRotationSpeed * 3.0;
        
        // Generate new target speed with regular linear distribution
        const newTargetSpeed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        
        // Set the target and reset transition progress
        setTargetRotationSpeed(newTargetSpeed);
        setSpeedTransitionProgress(0); // Start the transition
        
        return levelData.speedChangeInterval * 1000; // Reset timer (seconds to ms)
      }
      return prevTimer - deltaTime;
    });
  };

  /**
   * Handles Level 3 speed ramp-up
   * @param {number} deltaTime - Time elapsed since last update in ms
   */
  const updateSpeedRamp = (deltaTime) => {
    if (levelId === 3 && !speedRampComplete && speedRampTimer > 0) {
      setSpeedRampTimer(prevTimer => {
        const newTimer = prevTimer - deltaTime;
        
        if (newTimer <= 0) {
          // Time to speed up to the final speed
          setRotationSpeed(levelData.finalRotationSpeed);
          setTargetRotationSpeed(levelData.finalRotationSpeed);
          setSpeedRampComplete(true);
          
          // Set a short transition for a smooth increase
          setSpeedTransitionProgress(0.5);
          
          return 0;
        }
        
        // While ramping up, gradually increase the speed
        const elapsedRatio = 1 - (newTimer / (levelData.speedRampDuration * 1000));
        const speedDifference = levelData.finalRotationSpeed - levelData.baseRotationSpeed;
        const currentRampSpeed = levelData.baseRotationSpeed + (speedDifference * elapsedRatio);
        
        setRotationSpeed(currentRampSpeed);
        setTargetRotationSpeed(currentRampSpeed);
        
        return newTimer;
      });
    }
  };

  /**
   * Handles smooth transitions between speeds
   * @param {number} deltaTime - Time elapsed since last update in ms
   */
  const updateSpeedTransition = (deltaTime) => {
    // Skip for Level 1
    if (speedTransitionProgress < 1 && levelId !== 1) {
      // Get transition duration (or default to 2 seconds if not specified)
      const transitionDuration = (levelData.speedTransitionDuration || 2) * 1000; // ms
      
      // Calculate how much to increase the progress based on deltaTime
      const progressIncrement = deltaTime / transitionDuration;
      
      // Update the transition progress
      setSpeedTransitionProgress(prev => {
        const newProgress = Math.min(prev + progressIncrement, 1);
        return newProgress;
      });
      
      // Use easing function for smoother acceleration/deceleration (ease-in-out)
      const eased = speedTransitionProgress < 0.5 
        ? 2 * speedTransitionProgress * speedTransitionProgress 
        : 1 - Math.pow(-2 * speedTransitionProgress + 2, 2) / 2;
      
      // Smoothly interpolate between current and target speeds
      const interpolatedSpeed = rotationSpeed + (targetRotationSpeed - rotationSpeed) * eased;
      
      // Update the actual rotation speed
      setRotationSpeed(interpolatedSpeed);
    }
  };

  /**
   * Reset speed ramp state when level changes
   */
  useEffect(() => {
    if (levelId === 3) {
      setSpeedRampComplete(false);
      setSpeedRampTimer(levelData.speedRampDuration * 1000);
    }
  }, [levelId, levelData]);

  return {
    moonRotation,
    rotationSpeed,
    rotationDirection,
    speedRampComplete,
    setMoonRotation,
    updateRotation,
    updateDirectionChange,
    updateSpeedChange,
    updateSpeedRamp,
    updateSpeedTransition
  };
};

export default useRotationManager; 