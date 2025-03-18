import React from 'react';
import ObstacleComponent from '../ObstacleComponent';

/**
 * ObstacleRenderer - Renders all obstacles in the game
 * Extracted from GameScreen.js to modularize the codebase
 */
const ObstacleRenderer = ({ 
  obstacles, 
  moonRotation, 
  moonCenter, 
  moonSize, 
  levelData 
}) => {
  return (
    <>
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
          
          // Calculate orbiting angle
          const orbitAngle = angleInRadians + (moonRotation * Math.PI / 180 * orbitDirection);
          
          // Moon radius
          const moonRadius = moonSize * levelData.moonSize / 2;
          
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
          const moonRadius = moonSize * levelData.moonSize / 2;
          
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
    </>
  );
};

export default ObstacleRenderer; 