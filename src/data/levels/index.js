// Combine and export all level groups
import { beginnerLevels } from './beginnerLevels';
import { intermediateLevels } from './intermediateLevels';
import { advancedLevels } from './advancedLevels';

// Combine all levels into a single array
export const levels = [
  ...beginnerLevels,
  ...intermediateLevels,
  ...advancedLevels
];

// Game state template - can be used to initialize game state
export const gameState = {
  currentLevel: 1,
  lives: 3,
  highestLevelReached: 1
}; 