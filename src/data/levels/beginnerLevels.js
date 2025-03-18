// Game levels data - Beginner Levels (1-10)
// Each level has unique challenges for beginners

export const beginnerLevels = [
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
    timeLimit: 30,
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
    timeLimit: 30,
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
    timeLimit: 30,
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
    timeLimit: 30,
    moonSize: 1.0,
    baseRotationSpeed: 3.75,
    reversalInterval: 0,
    obstacles: [
      { 
        type: "spaceship", 
        size: 1.0, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.2,
        orbitSpeed: 3.75,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 6,
    name: "Pendulum Moon",
    description: "The moon slows to a stop before changing direction. Time your throws carefully!",
    knivesRequired: 10,
    timeLimit: 30,
    moonSize: 1.0,
    baseRotationSpeed: 3.75,
    minRotationSpeed: 0.1,
    maxRotationSpeed: 3.75,
    speedChangeInterval: 1,
    speedTransitionDuration: 1.5,
    reversalInterval: 5,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.5, y: 0, rotation: 45 }
    ]
  },
  {
    id: 7,
    name: "Full Circle Reversal",
    description: "Moon changes direction after each full rotation. Quick reflexes required!",
    knivesRequired: 10,
    timeLimit: 30,
    moonSize: 0.95,
    baseRotationSpeed: 4.2,
    reversalInterval: 0,
    fullRotationReversal: true,
    rotationThreshold: 360,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0.5, y: 0, rotation: 45 }
    ]
  },
  {
    id: 8,
    name: "Asteroid Field",
    description: "Navigate through three rotating asteroids. Precise timing is crucial!",
    knivesRequired: 11,
    timeLimit: 30,
    moonSize: 0.95,
    baseRotationSpeed: 3.75,
    reversalInterval: 3,
    obstacles: [
      { type: 'rock', size: 0.8, x: 0, y: 0.4, rotation: 0 },
      { type: 'rock', size: 0.8, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'rock', size: 0.8, x: -0.35, y: -0.2, rotation: 240 }
    ]
  },
  {
    id: 9,
    name: "Tiny Target, Orbiting Threat",
    description: "A small moon with a single orbiting asteroid. Hit the narrow target while avoiding the obstacle!",
    knivesRequired: 9,
    timeLimit: 30,
    moonSize: 0.55,
    baseRotationSpeed: 3.75,
    reversalInterval: 0,
    obstacles: [
      { 
        type: "spaceship", 
        size: 0.8,
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.2,
        orbitSpeed: 3.75,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 10,
    name: "Direction Shift",
    description: "Fast moon changes spin direction frequently. Master both clockwise and counter-clockwise patterns!",
    knivesRequired: 10,
    timeLimit: 30,
    moonSize: 0.9,
    baseRotationSpeed: 4.2,
    reversalInterval: 2,
    forceDirectionChange: true,
    rotationDirection: 1,
    obstacles: [
      { type: 'rock', size: 0.8, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 0.8, x: -0.3, y: 0.3, rotation: 135 }
    ]
  }
]; 