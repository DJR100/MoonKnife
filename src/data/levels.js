// Game levels data
// Each level has unique challenges, increasing difficulty as the player progresses

export const levels = [
  // Beginner Levels (1-10)
  {
    id: 1,
    name: "First Strike",
    description: "The moon spins at a constant fast speed. Time your throws perfectly!",
    knivesRequired: 5,
    timeLimit: 30,
    moonSize: 1.0,
    baseRotationSpeed: 2.5,
    reversalInterval: 0,
    obstacles: []
  },
  {
    id: 2,
    name: "Steady Spin",
    description: "The moon rotates with knives already in place. Navigate around them.",
    knivesRequired: 6,
    timeLimit: 35,
    moonSize: 1.0,
    baseRotationSpeed: 2.5,
    reversalInterval: 0,
    obstacles: [],
    preplacedKnives: [
      { radialAngle: 0.5, color: '#D3D3D3', handleColor: '#8B4513', knifeType: 'standard' },
      { radialAngle: 3.5, color: '#D3D3D3', handleColor: '#8B4513', knifeType: 'standard' }
    ]
  },
  {
    id: 3,
    name: "Small Target",
    description: "A tiny moon that speeds up dramatically after a few seconds.",
    knivesRequired: 5,
    timeLimit: 35,
    moonSize: 0.55,
    baseRotationSpeed: 2.5,
    finalRotationSpeed: 3.75,
    speedRampDuration: 3,
    reversalInterval: 0,
    obstacles: [],
    preplacedKnives: [
      { radialAngle: 1.2, color: '#D3D3D3', handleColor: '#8B4513', knifeType: 'standard' }
    ]
  },
  {
    id: 4,
    name: "Speeding Up",
    description: "The moon rotates at extreme speed - double the previous levels!",
    knivesRequired: 7,
    timeLimit: 40,
    moonSize: 1.0,
    baseRotationSpeed: 5.0,
    reversalInterval: 0,
    obstacles: []
  },
  {
    id: 5,
    name: "First Obstacle",
    description: "A rock orbits the moon in the opposite direction.",
    knivesRequired: 6,
    timeLimit: 40,
    moonSize: 1.0,
    baseRotationSpeed: 2.5,
    reversalInterval: 0,
    obstacles: [
      { 
        type: "rock", 
        size: 1.0, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.2,
        orbitSpeed: 2.5,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 6,
    name: "Rock Challenge",
    description: "A single rock wedged on the surface.",
    knivesRequired: 10,
    timeLimit: 50,
    moonSize: 1.0,
    baseRotationSpeed: 1.0,
    reversalInterval: 5,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.5, y: 0, rotation: 45 }
    ]
  },
  {
    id: 7,
    name: "Precision Aim",
    description: "Slightly smaller moon. Obstacle still present.",
    knivesRequired: 10,
    timeLimit: 45,
    moonSize: 0.95,
    baseRotationSpeed: 0.8,
    reversalInterval: 4,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.5, y: 0, rotation: 45 }
    ]
  },
  {
    id: 8,
    name: "Faster Spin",
    description: "Quick reversals (every 3 sec).",
    knivesRequired: 11,
    timeLimit: 45,
    moonSize: 0.95,
    baseRotationSpeed: 0.9,
    reversalInterval: 3,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.5, y: 0, rotation: 45 }
    ]
  },
  {
    id: 9,
    name: "Obstacle Awareness",
    description: "Two rocks present from the start.",
    knivesRequired: 12,
    timeLimit: 40,
    moonSize: 0.95,
    baseRotationSpeed: 0.9,
    reversalInterval: 3,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 1.0, x: -0.3, y: 0.3, rotation: 135 }
    ]
  },
  {
    id: 10,
    name: "First Real Challenge",
    description: "Smaller moon, faster spin.",
    knivesRequired: 12,
    timeLimit: 40,
    moonSize: 0.9,
    baseRotationSpeed: 1.0,
    reversalInterval: 3,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 1.0, x: -0.3, y: 0.3, rotation: 135 }
    ]
  },

  // Intermediate Levels (11-20)
  {
    id: 11,
    name: "Space Filler",
    description: "Two rocks in permanent locations.",
    knivesRequired: 13,
    timeLimit: 40,
    moonSize: 0.9,
    baseRotationSpeed: 1.0,
    reversalInterval: 3,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 1.0, x: -0.3, y: -0.3, rotation: 225 }
    ]
  },
  {
    id: 12,
    name: "Speeding Up",
    description: "Moon rotates faster, reverses every 2 sec.",
    knivesRequired: 14,
    timeLimit: 40,
    moonSize: 0.9,
    baseRotationSpeed: 1.1,
    reversalInterval: 2,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 1.0, x: -0.3, y: -0.3, rotation: 225 }
    ]
  },
  {
    id: 13,
    name: "Three Rocks",
    description: "More obstacles take up space.",
    knivesRequired: 14,
    timeLimit: 38,
    moonSize: 0.9,
    baseRotationSpeed: 1.1,
    reversalInterval: 2,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0, y: 0.4, rotation: 0 },
      { type: 'rock', size: 1.0, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'rock', size: 1.0, x: -0.35, y: -0.2, rotation: 240 }
    ]
  },
  {
    id: 14,
    name: "Shield Test",
    description: "First metal shield (blocks space).",
    knivesRequired: 15,
    timeLimit: 38,
    moonSize: 0.9,
    baseRotationSpeed: 1.1,
    reversalInterval: 2,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0, y: 0.4, rotation: 0 },
      { type: 'rock', size: 1.0, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 }
    ]
  },
  {
    id: 15,
    name: "Moving Shields",
    description: "Shield shifts slightly when reversing.",
    knivesRequired: 15,
    timeLimit: 35,
    moonSize: 0.9,
    baseRotationSpeed: 1.2,
    reversalInterval: 2,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0, y: 0.4, rotation: 0 },
      { type: 'rock', size: 1.0, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 }
    ]
  }

  // Only showing first 15 levels for brevity - maximum level is 30
];

// Game state template - can be used to initialize game state
export const gameState = {
  currentLevel: 1,
  lives: 3,
  highestLevelReached: 1
}; 