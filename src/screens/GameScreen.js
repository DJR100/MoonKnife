import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Animated } from 'react-native-reanimated';
import BackgroundComponent from '../components/BackgroundComponent';
import MoonComponent from '../components/MoonComponent';
import SwordComponent from '../components/SwordComponent';
import ObstacleComponent from '../components/ObstacleComponent';
import LevelInfoComponent from '../components/LevelInfoComponent';
import LevelCompleteModal from '../components/LevelCompleteModal';
import GameOverModal from '../components/GameOverModal';
import { levels } from '../data/levels';

const { width, height } = Dimensions.get('window');
const MOON_SIZE = 250;
const SWORD_SIZE = 60;

const GameScreen = ({ navigation, route }) => {
  // Get level from route params or use level 1
  const levelId = route.params?.level || 1;
  const levelData = levels.find(l => l.id === levelId) || levels[0];
  
  // Game state
  const [moonRotation, setMoonRotation] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(levelData.baseRotationSpeed);
  const [targetRotationSpeed, setTargetRotationSpeed] = useState(levelData.baseRotationSpeed);
  const [speedTransitionProgress, setSpeedTransitionProgress] = useState(1);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise
  const [swordPosition, setSwordPosition] = useState({ x: width / 2, y: height - 100 });
  const [stuckSwords, setStuckSwords] = useState([]);
  const [remainingKnives, setRemainingKnives] = useState(levelData.knivesRequired);
  const [lives, setLives] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(levelData.timeLimit);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeThrowingSwords, setActiveThrowingSwords] = useState([]);
  const [directionChangeTimer, setDirectionChangeTimer] = useState(levelData.reversalInterval ? levelData.reversalInterval * 1000 : 0);
  const [obstacles, setObstacles] = useState([]);
  const [speedChangeTimer, setSpeedChangeTimer] = useState(0);
  const [speedRampTimer, setSpeedRampTimer] = useState(levelData.id === 3 ? levelData.speedRampDuration * 1000 : 0);
  const [speedRampComplete, setSpeedRampComplete] = useState(false);

  // Memoize moonCenter to prevent infinite re-renders
  const moonCenter = React.useMemo(() => ({ 
    x: width / 2, 
    y: height / 3 
  }), [width, height]);
  
  const animationRef = useRef(null);
  const gameTimerRef = useRef(null);

  // Get selected sword from route params or use default
  const selectedSword = route.params?.selectedSword || {
    id: 'standard',
    name: 'Standard',
    color: '#D3D3D3',
    handleColor: '#8B4513',
    knifeType: 'standard'
  };
  
  // Add useRef for tracking initialization status
  const preplacedKnivesInitialized = useRef(false);
  
  // Add a ref to track the last shot time
  const lastShotTimeRef = useRef(0);
  
  // Reset initialization when level changes
  useEffect(() => {
    preplacedKnivesInitialized.current = false;
    
    // Reset speed ramp state for Level 3
    if (levelId === 3) {
      setSpeedRampComplete(false);
      setSpeedRampTimer(levelData.speedRampDuration * 1000);
    }
  }, [levelId, levelData]);
  
  // Initialize pre-placed knives and obstacles
  useEffect(() => {
    // Skip if already initialized for this level
    if (preplacedKnivesInitialized.current) return;
    
    // Initialize obstacles
    if (levelData.obstacles && levelData.obstacles.length > 0) {
      // Initialize obstacles with proper positions
      const initialObstacles = levelData.obstacles.map((obstacle, index) => {
        return {
          id: index,
          type: obstacle.type,
          size: obstacle.size,
          initialX: obstacle.x,   // Store original coordinates
          initialY: obstacle.y,
          initialRotation: obstacle.rotation || 0,
          color: obstacle.color
        };
      });
      
      setObstacles(initialObstacles);
    }
    
    // Initialize pre-placed knives if they exist in level data
    if (levelData.preplacedKnives && levelData.preplacedKnives.length > 0) {
      const initialKnives = levelData.preplacedKnives.map((knife, index) => {
        // Convert radial angle to x,y coordinates
        const radialAngle = knife.radialAngle;
        const moonRadius = MOON_SIZE * levelData.moonSize / 2;
        const radialDistance = moonRadius;
        
        const x = moonCenter.x + Math.cos(radialAngle) * radialDistance;
        const y = moonCenter.y + Math.sin(radialAngle) * radialDistance;
        
        // Convert radial angle to degrees for sword rotation
        const angleInDegrees = (radialAngle * 180 / Math.PI + 90) % 360;
        
        return {
          id: `preplaced-${index}`,
          x: x,
          y: y,
          rotation: angleInDegrees,
          swordRotation: angleInDegrees + 180,
          radialDistance: radialDistance,
          radialAngle: radialAngle,
          color: knife.color || selectedSword.color,
          handleColor: knife.handleColor || selectedSword.handleColor,
          knifeType: knife.knifeType || selectedSword.knifeType,
          isSerrated: knife.isSerrated || false,
          hasFingerWrap: knife.hasFingerWrap || false
        };
      });
      
      setStuckSwords(initialKnives);
    }
    
    // Mark as initialized
    preplacedKnivesInitialized.current = true;
  }, [levelData, levelId]);

  // Start game timer
  useEffect(() => {
    if (isLevelComplete || isGameOver) return;
    
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, [isLevelComplete, isGameOver]);

  // Game loop effect
  useEffect(() => {
    if (isLevelComplete || isGameOver) return;

    let lastTime = Date.now();
    
    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Handle direction changes
      setDirectionChangeTimer(prevTimer => {
        if (prevTimer <= 0 && levelData.reversalInterval > 0) {
          // When changing direction, ensure we don't get stuck at a rotation speed of 0
          setRotationDirection(prev => prev * -1);
          
          // Ensure rotation speed is non-zero when direction changes
          if (Math.abs(rotationSpeed) < 0.5) {
            setRotationSpeed(levelData.baseRotationSpeed);
            setTargetRotationSpeed(levelData.baseRotationSpeed);
          }
          
          return levelData.reversalInterval * 1000; // Convert to milliseconds for more accurate timing
        }
        return prevTimer - deltaTime;
      });
      
      // Apply rotation to moon - ensure a minimum rotation amount
      setMoonRotation(prevRotation => {
        const rotationAmount = rotationSpeed * rotationDirection;
        // Ensure a minimum rotation to prevent getting stuck
        const effectiveRotation = Math.abs(rotationAmount) < 0.1 ? 0.1 * Math.sign(rotationAmount) : rotationAmount;
        
        return (prevRotation + effectiveRotation + 360) % 360;
      });
      
      // Update stuck swords positions
      setStuckSwords((prevStuckSwords) => 
        prevStuckSwords.map((sword) => {
          const newRadialAngle = sword.radialAngle + (rotationSpeed * rotationDirection * Math.PI / 180);
          const newX = moonCenter.x + Math.cos(newRadialAngle) * sword.radialDistance;
          const newY = moonCenter.y + Math.sin(newRadialAngle) * sword.radialDistance;
          
          return {
            ...sword,
            x: newX,
            y: newY,
            radialAngle: newRadialAngle,
            rotation: sword.rotation + rotationSpeed * rotationDirection,
            swordRotation: sword.swordRotation + rotationSpeed * rotationDirection
          };
        })
      );
      
      // Process active throwing swords
      const THROW_SPEED = 20;
      setActiveThrowingSwords(prevSwords => {
        const remainingSwords = [];
        let hasCollision = false;
        
        for (const sword of prevSwords) {
          if (hasCollision) break;
          
          // Calculate the target Y position after movement
          const newY = sword.y - THROW_SPEED;
          
          // **** CRITICAL CHANGE: Pre-emptive obstacle collision check ****
          // Check if sword path will intersect with ANY obstacle BEFORE moving the sword
          const willHitObstacle = obstacles.some(obstacle => {
            // Calculate current position for this obstacle based on whether it's orbiting
            let obstacleX, obstacleY;
            
            // Convert relative coordinates to radial angle
            const angleInRadians = Math.atan2(obstacle.initialY, obstacle.initialX);
            
            if (obstacle.isOrbiting) {
              // For orbiting obstacles, calculate their own rotation angle
              // Use a separate angle that's not tied to the moon's rotation
              const orbitSpeed = obstacle.orbitSpeed || levelData.baseRotationSpeed;
              const orbitDirection = obstacle.orbitDirection || 1; // 1 for clockwise, -1 for counterclockwise
              
              // Calculate orbiting angle (FIXED: remove the -1 multiplier)
              const orbitAngle = angleInRadians + (moonRotation * Math.PI / 180 * orbitDirection);
              
              // Moon radius
              const moonRadius = MOON_SIZE * levelData.moonSize / 2;
              
              // Position at the specified orbit distance
              const orbitDistance = moonRadius * (obstacle.orbitDistance || 1.3);
              
              // Calculate position based on orbit
              obstacleX = moonCenter.x + Math.cos(orbitAngle) * orbitDistance;
              obstacleY = moonCenter.y + Math.sin(orbitAngle) * orbitDistance;
            } else {
              // Standard obstacle attached to the moon
              const rotatedAngle = angleInRadians + (moonRotation * Math.PI / 180);
              
              // Moon radius and distance calculation
              const moonRadius = MOON_SIZE * levelData.moonSize / 2;
              const distanceFromMoon = moonRadius * 1.3;
              
              // Calculate position
              obstacleX = moonCenter.x + Math.cos(rotatedAngle) * distanceFromMoon;
              obstacleY = moonCenter.y + Math.sin(rotatedAngle) * distanceFromMoon;
            }
            
            // Test multiple points along the sword's path for collisions
            const steps = 10; // Test 10 points along the path
            for (let i = 0; i <= steps; i++) {
              // Calculate position at this step
              const ratio = i / steps;
              const testY = sword.y - (THROW_SPEED * ratio);
              
              // Distance to obstacle at this step
              const distanceToObstacle = Math.sqrt(
                Math.pow(sword.x - obstacleX, 2) + 
                Math.pow(testY - obstacleY, 2)
              );
              
              // Enhanced hitbox for obstacles - make them more solid
              // Increase hitbox for orbiting obstacles to make them more challenging
              let collisionRadius;
              if (obstacle.isOrbiting) {
                // Much larger hitbox for orbiting obstacles
                const enlargedSize = obstacle.size * 3.0; // Match the visual size
                collisionRadius = SWORD_SIZE + (enlargedSize * 15); 
              } else {
                // Standard hitbox for regular obstacles
                const enlargedSize = obstacle.size * 2.5;
                collisionRadius = SWORD_SIZE * 3 + (enlargedSize * 50);
              }
              
              // If any point along the path collides, return true
              if (distanceToObstacle < collisionRadius) {
                return true;
              }
            }
            return false;
          });
          
          if (willHitObstacle) {
            // Collision with obstacle detected - lose a life
            setLives(prevLives => {
              if (prevLives <= 1) {
                handleGameOver();
                return 0;
              } else {
                return prevLives - 1;
              }
            });
            hasCollision = true;
            continue; // Skip to next sword
          }
          
          // Check if this sword has reached the moon
          const distanceToMoon = Math.sqrt(
            Math.pow(sword.x - moonCenter.x, 2) + 
            Math.pow(newY - moonCenter.y, 2)
          );
          
          if (distanceToMoon < (MOON_SIZE * levelData.moonSize / 2)) {
            // Sword reached the moon - check for collisions with stuck swords
            
            // Check collision with stuck swords
            const collidesWithExistingSword = stuckSwords.some(stuckSword => {
              const crossguardDistance = Math.sqrt(
                Math.pow(sword.x - stuckSword.x, 2) + 
                Math.pow(newY - stuckSword.y, 2)
              );
              
              const crossguardWidth = SWORD_SIZE / 6;
              return crossguardDistance < crossguardWidth;
            });
            
            if (collidesWithExistingSword) {
              // Collision detected - lose a life
              setLives(prevLives => {
                if (prevLives <= 1) {
                  handleGameOver();
                  return 0;
                } else {
                  return prevLives - 1;
                }
              });
              
              hasCollision = true;
            } else {
              // No collision - stick sword to moon
              const angleInRadians = Math.atan2(newY - moonCenter.y, sword.x - moonCenter.x);
              const angleInDegrees = (angleInRadians * 180 / Math.PI + 90) % 360;
              
              // Add new stuck sword with proper properties
              const newSword = {
                id: sword.id,
                x: sword.x,
                y: newY,
                rotation: angleInDegrees,
                swordRotation: angleInDegrees + 180,
                radialDistance: distanceToMoon,
                radialAngle: angleInRadians,
                color: sword.color || selectedSword.color,
                handleColor: sword.handleColor || selectedSword.handleColor,
                knifeType: sword.knifeType || selectedSword.knifeType,
                isSerrated: sword.isSerrated || selectedSword.isSerrated,
                hasFingerWrap: sword.hasFingerWrap || selectedSword.hasFingerWrap
              };
              
              // Add to stuck swords and decrement remaining knives
              setStuckSwords(prev => [...prev, newSword]);
              setRemainingKnives(prev => {
                const newRemaining = prev - 1;
                // Check if level is complete
                if (newRemaining <= 0) {
                  handleLevelComplete();
                }
                return newRemaining;
              });
            }
          } else {
            // Sword still in flight - keep it
            remainingSwords.push({...sword, y: newY});
          }
        }
        
        return hasCollision ? [] : remainingSwords;
      });
      
      // Add this speed variation logic with smooth transitions - skip for Level 1
      setSpeedChangeTimer(prevTimer => {
        // Skip speed variations for Level 1
        if (levelId === 1) return prevTimer;
        
        if (prevTimer <= 0 && levelData.speedChangeInterval) {
          // Generate a new random speed between min and max
          const minSpeed = levelData.minRotationSpeed || levelData.baseRotationSpeed * 0.5;
          const maxSpeed = levelData.maxRotationSpeed || levelData.baseRotationSpeed * 3.0;
          
          // Generate new target speed with regular linear distribution
          const newTargetSpeed = minSpeed + Math.random() * (maxSpeed - minSpeed);
          
          // Instead of immediately changing the speed, set the target and reset transition progress
          setTargetRotationSpeed(newTargetSpeed);
          setSpeedTransitionProgress(0); // Start the transition
          
          return levelData.speedChangeInterval * 1000; // Reset timer (seconds to ms)
        }
        return prevTimer - deltaTime;
      });
      
      // Handle Level 3 speed ramp-up
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
            
            // You could add a visual or audio cue here if desired
            
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
      
      // Handle smooth speed transitions - skip for Level 1
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
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isLevelComplete, 
    isGameOver, 
    levelData.reversalInterval, 
    levelData.baseRotationSpeed,
    levelId, 
    moonCenter // Use memoized moonCenter
  ]);
  
  // Add this useEffect to update navigation params when the level is completed
  useEffect(() => {
    if (isLevelComplete) {
      // Update highest level reached in game state
      const currentHighest = route.params?.highestLevelReached || 1;
      const newHighest = Math.max(currentHighest, levelId + 1);
      navigation.setParams({ highestLevelReached: newHighest });
    }
  }, [isLevelComplete, levelId, navigation, route.params?.highestLevelReached]);
  
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
  
  const handleScreenPress = () => {
    // Check if we can shoot (level not complete, not game over, has knives left)
    if (isLevelComplete || isGameOver || remainingKnives <= 0) {
      return;
    }
    
    // Implement a short cooldown between shots (100ms = 0.1 seconds)
    const currentTime = Date.now();
    if (currentTime - lastShotTimeRef.current < 100) {
      return; // Still in cooldown
    }
    
    // Update last shot time
    lastShotTimeRef.current = currentTime;
    
    // Throw new sword
    const newSword = {
      id: Date.now(),
      x: width / 2,
      y: height - 100,
      rotation: 0,
      color: selectedSword.color,
      handleColor: selectedSword.handleColor,
      knifeType: selectedSword.knifeType,
      isSerrated: selectedSword.isSerrated,
      hasFingerWrap: selectedSword.hasFingerWrap
    };
    
    setActiveThrowingSwords(prev => [...prev, newSword]);
  };
  
  const handleNextLevel = () => {
    const nextLevelId = levelId + 1;
    if (nextLevelId <= levels.length) {
      navigation.replace('GameScreen', { 
        level: nextLevelId,
        selectedSword,
        highestLevelReached: route.params?.highestLevelReached || nextLevelId
      });
    } else {
      // Player completed all levels, go to home screen
      navigation.navigate('Home', { 
        highestLevelReached: levels.length
      });
    }
  };
  
  const handleRetry = () => {
    navigation.replace('GameScreen', { 
      level: levelId,
      selectedSword,
      highestLevelReached: route.params?.highestLevelReached
    });
  };
  
  const handleHomePress = () => {
    navigation.navigate('Home', { 
      highestLevelReached: route.params?.highestLevelReached
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <BackgroundComponent />
        
        {/* Level Info Bar */}
        <LevelInfoComponent
          level={levelId}
          levelName={levelData.name}
          remainingKnives={remainingKnives}
          timeRemaining={timeRemaining}
          lives={lives}
        />
        
        {/* Moon */}
        <View style={styles.gameArea}>
          <View style={[
            styles.moonContainer,
            { 
              width: MOON_SIZE * levelData.moonSize, 
              height: MOON_SIZE * levelData.moonSize,
              top: moonCenter.y - (MOON_SIZE * levelData.moonSize / 2),
              left: moonCenter.x - (MOON_SIZE * levelData.moonSize / 2)
            }
          ]}>
            <MoonComponent size={MOON_SIZE * levelData.moonSize} rotation={moonRotation} />
          </View>
          
          {/* Render obstacles - handle both attached and orbiting obstacles */}
          {obstacles.map((obstacle) => {
            // Convert relative coordinates to radial angle
            const angleInRadians = Math.atan2(obstacle.initialY, obstacle.initialX);
            
            // Handle regular obstacles (attached to moon) vs orbiting obstacles
            let obstacleX, obstacleY, obstacleRotation;
            
            if (obstacle.isOrbiting) {
              // For orbiting obstacles, calculate their own rotation angle
              // Use a separate angle that's not tied to the moon's rotation
              const orbitSpeed = obstacle.orbitSpeed || levelData.baseRotationSpeed;
              const orbitDirection = obstacle.orbitDirection || 1; // 1 for clockwise, -1 for counterclockwise
              
              // Calculate orbiting angle (FIXED: remove the -1 multiplier)
              const orbitAngle = angleInRadians + (moonRotation * Math.PI / 180 * orbitDirection);
              
              // Moon radius
              const moonRadius = MOON_SIZE * levelData.moonSize / 2;
              
              // Position obstacles at the specified orbit distance 
              const orbitDistance = moonRadius * (obstacle.orbitDistance || 1.3);
              
              // Calculate position based on orbit
              obstacleX = moonCenter.x + Math.cos(orbitAngle) * orbitDistance;
              obstacleY = moonCenter.y + Math.sin(orbitAngle) * orbitDistance;
              
              // Rotate the obstacle itself in the opposite direction of the moon
              obstacleRotation = -moonRotation + obstacle.initialRotation;
            } else {
              // Standard obstacle behavior - attached to the moon
              // Apply moon rotation to the angle
              const rotatedAngle = angleInRadians + (moonRotation * Math.PI / 180);
              
              // Moon radius
              const moonRadius = MOON_SIZE * levelData.moonSize / 2;
              
              // Position obstacles further from the moon's surface (1.3 = 30% further)
              const distanceFromMoon = moonRadius * 1.3;
              
              // Calculate position outside moon's surface
              obstacleX = moonCenter.x + Math.cos(rotatedAngle) * distanceFromMoon;
              obstacleY = moonCenter.y + Math.sin(rotatedAngle) * distanceFromMoon;
              
              // Rotate with the moon
              obstacleRotation = moonRotation + obstacle.initialRotation;
            }
            
            // Make obstacles larger (3.0 = 300% larger - triple size)
            const enlargedSize = obstacle.size * 3.0;
            
            return (
              <ObstacleComponent
                key={`obstacle-${obstacle.id}`}
                type={obstacle.type}
                size={enlargedSize}
                x={obstacleX}
                y={obstacleY}
                rotation={obstacleRotation}
                color={obstacle.color || (obstacle.type === 'rock' ? '#777777' : '#AAAAAA')}
              />
            );
          })}
          
          {/* Render stuck swords */}
          {stuckSwords.map((sword) => (
            <SwordComponent
              key={`stuck-sword-${sword.id}`}
              size={SWORD_SIZE * 2}
              x={sword.x}
              y={sword.y}
              rotation={sword.swordRotation}
              isThrown={true}
              color={sword.color}
              handleColor={sword.handleColor}
              knifeType={sword.knifeType}
              isSerrated={sword.isSerrated}
              hasFingerWrap={sword.hasFingerWrap}
            />
          ))}
          
          {/* Render active throwing swords */}
          {activeThrowingSwords.map((sword) => (
            <SwordComponent
              key={`throwing-sword-${sword.id}`}
              size={SWORD_SIZE * 2}
              x={sword.x}
              y={sword.y}
              rotation={0}
              isThrown={true}
              color={sword.color}
              handleColor={sword.handleColor}
              knifeType={sword.knifeType}
              isSerrated={sword.isSerrated}
              hasFingerWrap={sword.hasFingerWrap}
            />
          ))}
        </View>
        
        {/* Ready sword at bottom */}
        {remainingKnives > 0 && (
          <View style={styles.readySwordContainer}>
            <SwordComponent
              size={SWORD_SIZE * 2}
              x={SWORD_SIZE/2}
              y={SWORD_SIZE/2}
              rotation={0}
              isThrown={false}
              color={selectedSword.color}
              handleColor={selectedSword.handleColor}
              knifeType={selectedSword.knifeType}
              isSerrated={selectedSword.isSerrated}
              hasFingerWrap={selectedSword.hasFingerWrap}
            />
          </View>
        )}
        
        {/* Level Complete Modal */}
        {isLevelComplete && (
          <LevelCompleteModal 
            level={levelId}
            levelName={levelData.name}
            onNext={handleNextLevel}
            onRetry={handleRetry}
            onHome={handleHomePress}
          />
        )}
        
        {/* Game Over Modal */}
        {isGameOver && (
          <GameOverModal 
            level={levelId}
            onRetry={handleRetry}
            onHome={handleHomePress}
          />
        )}
        
        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleHomePress}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  moonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readySwordContainer: {
    position: 'absolute',
    bottom: 50,
    left: width / 2 - SWORD_SIZE / 2,
    width: SWORD_SIZE,
    height: SWORD_SIZE,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default GameScreen;