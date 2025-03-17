import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Animated } from 'react-native-reanimated';
import BackgroundComponent from '../components/BackgroundComponent';
import MoonComponent from '../components/MoonComponent';
import SwordComponent from '../components/SwordComponent';

const { width, height } = Dimensions.get('window');
const MOON_SIZE = 250;
const SWORD_SIZE = 60;
const MIN_ROTATION_SPEED = 1.0; // 60 degrees/second (1.0 per frame at 60fps)
const MAX_ROTATION_SPEED = 5.0; // 300 degrees/second (5.0 per frame at 60fps)
const THROW_SPEED = 20;

const GameScreen = ({ navigation, route }) => {
  const [moonRotation, setMoonRotation] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(MIN_ROTATION_SPEED);
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for counter-clockwise
  const [isChangingDirection, setIsChangingDirection] = useState(false);
  const [directionChangeTimer, setDirectionChangeTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [swordPosition, setSwordPosition] = useState({ x: width / 2, y: height - 100 });
  const [stuckSwords, setStuckSwords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [targetRotationSpeed, setTargetRotationSpeed] = useState(MIN_ROTATION_SPEED);
  const [activeThrowingSwords, setActiveThrowingSwords] = useState([]);

  const moonCenter = { x: width / 2, y: height / 3 };
  const animationRef = useRef(null);

  // Get selected sword from route params or use default
  const selectedSword = route.params?.selectedSword || {
    id: 'standard',
    name: 'Standard',
    color: '#D3D3D3',
    handleColor: '#8B4513'
  };

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    let lastTime = Date.now();
    
    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Smooth rotation speed transitions
      setRotationSpeed(prevSpeed => {
        if (isChangingDirection) {
          // Faster deceleration
          return prevSpeed * 0.9; // 10% reduction per frame
        } else {
          // More immediate speed changes
          const speedChange = (Math.random() - 0.5 + 0.2) * 0.2; // Larger random changes
          const newSpeed = prevSpeed + speedChange;
          // Keep speed within bounds
          return Math.min(MAX_ROTATION_SPEED, Math.max(MIN_ROTATION_SPEED, newSpeed));
        }
      });

      // Update target speed less frequently
      setDirectionChangeTimer(prevTimer => {
        if (prevTimer <= 0) {
          if (isChangingDirection && rotationSpeed < 0.1) {
            setIsChangingDirection(false);
            setRotationDirection(prev => prev * -1);
            // Set a new target speed when changing direction
            setTargetRotationSpeed(MIN_ROTATION_SPEED + Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED));
            return Math.floor(Math.random() * 5000) + 4000; // Next change in 4-9 seconds
          } else if (!isChangingDirection) {
            // Occasionally update target speed even without direction change
            setTargetRotationSpeed(MIN_ROTATION_SPEED + Math.random() * (MAX_ROTATION_SPEED - MIN_ROTATION_SPEED));
            // Occasionally decide to change direction
            if (Math.random() < 0.3) {
              setIsChangingDirection(true);
            }
            return Math.floor(Math.random() * 2000) + 2000; // Speed adjustment every 2-4 seconds
          }
        }
        return prevTimer - deltaTime;
      });
      
      // Apply rotation
      setMoonRotation(prevRotation => 
        (prevRotation + rotationSpeed * rotationDirection + 360) % 360
      );
      
      // Update the position of stuck swords to follow the moon rotation
      setStuckSwords((prevStuckSwords) => 
        prevStuckSwords.map((sword) => {
          // Calculate the new radial angle based on moon rotation
          const newRadialAngle = sword.radialAngle + (rotationSpeed * Math.PI / 180);
          
          // Calculate new position based on the stored distance and updated angle
          const newX = moonCenter.x + Math.cos(newRadialAngle) * sword.radialDistance;
          const newY = moonCenter.y + Math.sin(newRadialAngle) * sword.radialDistance;
          
          return {
            ...sword,
            x: newX,
            y: newY,
            radialAngle: newRadialAngle,
            rotation: (sword.rotation + rotationSpeed) % 360,
            swordRotation: (sword.swordRotation + rotationSpeed) % 360
          };
        })
      );
      
      // Process each active sword separately with proper collision detection
      setActiveThrowingSwords(prevSwords => {
        // Make a copy we can modify as we go
        const remainingSwords = [];
        let gameEnded = false;
        
        // Process each sword
        for (const sword of prevSwords) {
          if (gameEnded) break;
          
          const newY = sword.y - THROW_SPEED;
          
          // Check if this sword has reached the moon
          const distanceToMoon = Math.sqrt(
            Math.pow(sword.x - moonCenter.x, 2) + 
            Math.pow(newY - moonCenter.y, 2)
          );
          
          if (distanceToMoon < MOON_SIZE / 2) {
            // Sword reached the moon - check for collisions with stuck swords
            const collidesWithExistingSword = stuckSwords.some(stuckSword => {
              // Use the crossguard collision logic we defined
              const crossguardDistance = Math.sqrt(
                Math.pow(sword.x - stuckSword.x, 2) + 
                Math.pow(newY - stuckSword.y, 2)
              );
              
              const crossguardWidth = SWORD_SIZE / 6;
              return crossguardDistance < crossguardWidth;
            });
            
            if (collidesWithExistingSword) {
              // Collision detected - game over
              handleGameOver();
              gameEnded = true;
              break;
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
              
              // Add to stuck swords and increment score
              setStuckSwords(prev => [...prev, newSword]);
              setScore(prevScore => prevScore + 1);
            }
          } else {
            // Sword still in flight - keep it
            remainingSwords.push({...sword, y: newY});
          }
        }
        
        return gameEnded ? [] : remainingSwords;
      });
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    
    // Clean up animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameOver, stuckSwords]);
  
  const handleSwordHitMoon = (x, y) => {
    // Calculate the angle at which the sword hit the moon
    const angleInRadians = Math.atan2(y - moonCenter.y, x - moonCenter.x);
    const angleInDegrees = (angleInRadians * 180 / Math.PI + 90) % 360;
    
    // Calculate the sword's crossguard position (slightly back from the tip)
    // The crossguard is positioned about 10 units back from the tip along the sword's direction
    const crossguardOffsetDistance = 10;
    const crossguardX = x - Math.sin(angleInRadians) * crossguardOffsetDistance;
    const crossguardY = y - Math.cos(angleInRadians) * crossguardOffsetDistance;
    
    // Check for collision with existing swords using the crossguard area
    const collidesWithExistingSword = stuckSwords.some((sword) => {
      // Calculate the other sword's crossguard position
      const otherSwordRadians = sword.rotation * Math.PI / 180;
      const otherCrossguardX = sword.x - Math.sin(otherSwordRadians) * crossguardOffsetDistance;
      const otherCrossguardY = sword.y - Math.cos(otherSwordRadians) * crossguardOffsetDistance;
      
      // Calculate distance between crossguards (rectangular area)
      const crossguardDistance = Math.sqrt(
        Math.pow(crossguardX - otherCrossguardX, 2) + 
        Math.pow(crossguardY - otherCrossguardY, 2)
      );
      
      // Crossguard width (width of the rectangular part)
      const crossguardWidth = SWORD_SIZE / 6; // Approximately the width of the crossguard
      
      // Collision occurs if crossguards overlap
      return crossguardDistance < crossguardWidth;
    });
    
    if (collidesWithExistingSword) {
      // Game over
      handleGameOver();
      return;
    }
    
    // Place the sword exactly where it hit the moon's surface
    // Instead of using a fixed distance from center, use the actual hit coordinates
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - moonCenter.x, 2) + 
      Math.pow(y - moonCenter.y, 2)
    );
    
    // Create the sword at the exact hit position
    const newSword = {
      id: Date.now(),
      x: x,
      y: y,
      rotation: angleInDegrees,
      swordRotation: angleInDegrees + 180,
      radialDistance: distanceFromCenter,
      radialAngle: angleInRadians,
      color: selectedSword.color,
      handleColor: selectedSword.handleColor,
      knifeType: selectedSword.knifeType,
      isSerrated: selectedSword.isSerrated,
      hasFingerWrap: selectedSword.hasFingerWrap
    };
    
    setStuckSwords((prevSwords) => [...prevSwords, newSword]);
    setScore((prevScore) => prevScore + 1);
  };
  
  const handleGameOver = () => {
    setGameOver(true);
    setTimeout(() => {
      navigation.navigate('GameOver', { score });
    }, 1000);
  };
  
  const throwSword = () => {
    if (!gameOver) {
      const newSword = {
        id: Date.now(),
        x: width / 2,
        y: height - 100,
        // Add color properties from the selected sword
        color: selectedSword.color,
        handleColor: selectedSword.handleColor,
        knifeType: selectedSword.knifeType,
        isSerrated: selectedSword.isSerrated,
        hasFingerWrap: selectedSword.hasFingerWrap
      };
      
      setActiveThrowingSwords(prevSwords => [...prevSwords, newSword]);
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={throwSword}>
      <View style={styles.container}>
        <BackgroundComponent />
        
        <MoonComponent 
          size={MOON_SIZE} 
          x={moonCenter.x} 
          y={moonCenter.y} 
          rotation={moonRotation} 
        />
        
        {/* Render all stuck swords */}
        {stuckSwords.map((sword) => (
          <SwordComponent
            key={sword.id}
            size={SWORD_SIZE}
            x={sword.x}
            y={sword.y}
            rotation={sword.swordRotation}
            isThrown={false}
            color={sword.color || selectedSword.color}
            handleColor={sword.handleColor || selectedSword.handleColor}
            knifeType={sword.knifeType || selectedSword.knifeType}
            isSerrated={sword.isSerrated || selectedSword.isSerrated}
            hasFingerWrap={sword.hasFingerWrap || selectedSword.hasFingerWrap}
          />
        ))}
        
        {/* Render all active throwing swords */}
        {activeThrowingSwords.map((sword) => (
          <SwordComponent
            key={sword.id}
            size={SWORD_SIZE}
            x={sword.x}
            y={sword.y}
            rotation={0}
            isThrown={true}
            color={sword.color || selectedSword.color}
            handleColor={sword.handleColor || selectedSword.handleColor}
            knifeType={sword.knifeType || selectedSword.knifeType}
            isSerrated={sword.isSerrated || selectedSword.isSerrated}
            hasFingerWrap={sword.hasFingerWrap || selectedSword.hasFingerWrap}
          />
        ))}
        
        {/* Always render the ready sword at the bottom */}
        <SwordComponent
          size={SWORD_SIZE}
          x={width / 2}
          y={height - 100}
          rotation={0}
          isThrown={false}
          color={selectedSword.color}
          handleColor={selectedSword.handleColor}
          knifeType={selectedSword.knifeType}
          isSerrated={selectedSword.isSerrated}
          hasFingerWrap={selectedSword.hasFingerWrap}
        />
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000033',
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  scoreText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameScreen; 