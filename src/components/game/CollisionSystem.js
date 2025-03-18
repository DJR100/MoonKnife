import React from 'react';

/**
 * CollisionSystem - Handles all collision detection in the game
 * Extracted from GameScreen.js to modularize the codebase
 */
export const useCollisionDetection = (moonCenter, moonSize) => {
  /**
   * Check if a sword will collide with an obstacle
   * @param {Object} sword - The sword object
   * @param {Array} obstacles - Array of obstacle objects
   * @param {Number} moonRotation - Current moon rotation in degrees
   * @param {Object} levelData - Current level data
   * @param {Number} SWORD_SIZE - Size of the sword
   * @param {Number} THROW_SPEED - Speed of the thrown sword
   * @returns {Boolean} - True if sword will collide with any obstacle
   */
  const checkObstacleCollision = (sword, obstacles, moonRotation, levelData, SWORD_SIZE, THROW_SPEED) => {
    return obstacles.some(obstacle => {
      // Calculate current position for this obstacle based on whether it's orbiting
      let obstacleX, obstacleY;
      
      // Convert relative coordinates to radial angle
      const angleInRadians = Math.atan2(obstacle.initialY, obstacle.initialX);
      
      if (obstacle.isOrbiting) {
        // For orbiting obstacles, calculate their own rotation angle
        const orbitSpeed = obstacle.orbitSpeed || levelData.baseRotationSpeed;
        const orbitDirection = obstacle.orbitDirection || 1; // 1 for clockwise, -1 for counterclockwise
        
        // Calculate orbiting angle
        const orbitAngle = angleInRadians + (moonRotation * Math.PI / 180 * orbitDirection);
        
        // Moon radius
        const moonRadius = moonSize * levelData.moonSize / 2;
        
        // Position at the specified orbit distance
        const orbitDistance = moonRadius * (obstacle.orbitDistance || 1.3);
        
        // Calculate position based on orbit
        obstacleX = moonCenter.x + Math.cos(orbitAngle) * orbitDistance;
        obstacleY = moonCenter.y + Math.sin(orbitAngle) * orbitDistance;
      } else {
        // Standard obstacle attached to the moon
        const rotatedAngle = angleInRadians + (moonRotation * Math.PI / 180);
        
        // Moon radius and distance calculation
        const moonRadius = moonSize * levelData.moonSize / 2;
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
  };

  /**
   * Check if a sword will collide with the moon
   * @param {Object} sword - The sword object
   * @param {Number} newY - New Y position after movement
   * @param {Object} levelData - Current level data 
   * @returns {Object} - { collides: boolean, distance: number, angle: number }
   */
  const checkMoonCollision = (sword, newY, levelData) => {
    const distanceToMoon = Math.sqrt(
      Math.pow(sword.x - moonCenter.x, 2) + 
      Math.pow(newY - moonCenter.y, 2)
    );
    
    // Check if sword has reached the moon
    if (distanceToMoon < (moonSize * levelData.moonSize / 2)) {
      const angleInRadians = Math.atan2(newY - moonCenter.y, sword.x - moonCenter.x);
      const angleInDegrees = (angleInRadians * 180 / Math.PI + 90) % 360;
      
      return {
        collides: true,
        distance: distanceToMoon,
        angle: angleInRadians,
        angleDegrees: angleInDegrees
      };
    }
    
    return { collides: false };
  };

  /**
   * Check if a sword will collide with any stuck swords
   * @param {Object} sword - The sword object
   * @param {Number} newY - New Y position after movement
   * @param {Array} stuckSwords - Array of stuck sword objects
   * @param {Number} SWORD_SIZE - Size of the sword
   * @returns {Boolean} - True if sword will collide with any stuck sword
   */
  const checkStuckSwordCollision = (sword, newY, stuckSwords, SWORD_SIZE) => {
    return stuckSwords.some(stuckSword => {
      const crossguardDistance = Math.sqrt(
        Math.pow(sword.x - stuckSword.x, 2) + 
        Math.pow(newY - stuckSword.y, 2)
      );
      
      const crossguardWidth = SWORD_SIZE / 6;
      return crossguardDistance < crossguardWidth;
    });
  };

  return {
    checkObstacleCollision,
    checkMoonCollision,
    checkStuckSwordCollision
  };
};

export default useCollisionDetection; 