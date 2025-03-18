// Game levels data - Advanced Levels (21-30)
// Each level has unique challenges for advanced players

export const advancedLevels = [
  {
    id: 21,
    name: "Double Orbit",
    description: "Two rocks orbit in opposite directions.",
    knivesRequired: 20,
    timeLimit: 30,
    moonSize: 0.8,
    baseRotationSpeed: 1.0,
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
        orbitSpeed: 1.5,
        orbitDirection: 1
      },
      { 
        type: "rock", 
        size: 1.0, 
        x: 0, 
        y: -0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.4,
        orbitSpeed: 2.0,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 22,
    name: "Shield Maze",
    description: "Navigate through a maze of shields.",
    knivesRequired: 22,
    timeLimit: 30,
    moonSize: 0.8,
    baseRotationSpeed: 0.8,
    reversalInterval: 5,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0, y: 0.4, rotation: 0 },
      { type: 'shield', size: 1.2, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 },
      { type: 'shield', size: 1.2, x: 0.2, y: 0.2, rotation: 45 }
    ]
  },
  {
    id: 23,
    name: "Micro Target",
    description: "Extremely small moon with fast, erratic rotation.",
    knivesRequired: 15,
    timeLimit: 30,
    moonSize: 0.5,
    baseRotationSpeed: 1.2,
    minRotationSpeed: 0.8,
    maxRotationSpeed: 3.0,
    speedChangeInterval: 2,
    speedTransitionDuration: 0.5,
    reversalInterval: 0,
    obstacles: []
  },
  {
    id: 24,
    name: "Shield and Rock",
    description: "Shields on the surface with orbiting rocks.",
    knivesRequired: 24,
    timeLimit: 30,
    moonSize: 0.75,
    baseRotationSpeed: 1.0,
    reversalInterval: 4,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'shield', size: 1.2, x: -0.3, y: -0.3, rotation: 225 },
      { 
        type: "rock", 
        size: 1.0, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.3,
        orbitSpeed: 2.0,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 25,
    name: "Quarter Century",
    description: "Special level with extreme challenge.",
    knivesRequired: 25,
    timeLimit: 30,
    moonSize: 0.7,
    baseRotationSpeed: 1.5,
    reversalInterval: 3,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0, y: 0.4, rotation: 0 },
      { type: 'shield', size: 1.2, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 },
      { 
        type: "rock", 
        size: 1.0, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.2,
        orbitSpeed: 1.0,
        orbitDirection: 1
      },
      { 
        type: "rock", 
        size: 1.0, 
        x: 0, 
        y: -0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.5,
        orbitSpeed: 1.5,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 26,
    name: "Asteroid Belt",
    description: "Multiple orbiting rocks at different speeds.",
    knivesRequired: 26,
    timeLimit: 30,
    moonSize: 0.7,
    baseRotationSpeed: 0.8,
    reversalInterval: 0,
    obstacles: [
      { 
        type: "rock", 
        size: 0.8, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.1,
        orbitSpeed: 1.2,
        orbitDirection: 1
      },
      { 
        type: "rock", 
        size: 0.9, 
        x: 0, 
        y: -0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.4,
        orbitSpeed: 1.5,
        orbitDirection: -1
      },
      { 
        type: "rock", 
        size: 1.0, 
        x: 0.3, 
        y: 0, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.7,
        orbitSpeed: 0.7,
        orbitDirection: 1
      }
    ]
  },
  {
    id: 27,
    name: "Shield Fortress",
    description: "Moon surrounded by shields and rocks.",
    knivesRequired: 27,
    timeLimit: 30,
    moonSize: 0.65,
    baseRotationSpeed: 1.0,
    reversalInterval: 2,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0, y: 0.4, rotation: 0 },
      { type: 'shield', size: 1.2, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 },
      { type: 'rock', size: 0.8, x: 0.2, y: 0.2, rotation: 45 },
      { type: 'rock', size: 0.8, x: -0.2, y: -0.2, rotation: 225 }
    ]
  },
  {
    id: 28,
    name: "Speed Demon",
    description: "Extremely fast rotation with quick reversals.",
    knivesRequired: 28,
    timeLimit: 30,
    moonSize: 0.6,
    baseRotationSpeed: 2.0,
    reversalInterval: 1.5,
    obstacles: [
      { type: 'rock', size: 0.8, x: 0.3, y: 0.3, rotation: 45 }
    ]
  },
  {
    id: 29,
    name: "Chaos Theory",
    description: "Random speed changes, reversals, and obstacles.",
    knivesRequired: 29,
    timeLimit: 30,
    moonSize: 0.6,
    baseRotationSpeed: 1.0,
    minRotationSpeed: 0.5,
    maxRotationSpeed: 2.5,
    speedChangeInterval: 1,
    speedTransitionDuration: 0.3,
    reversalInterval: 3,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'shield', size: 1.2, x: -0.3, y: -0.3, rotation: 225 },
      { 
        type: "rock", 
        size: 0.9, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.3,
        orbitSpeed: 2.0,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 30,
    name: "Master of the Moon",
    description: "The ultimate challenge. Conquer the moon!",
    knivesRequired: 30,
    timeLimit: 30,
    moonSize: 0.55,
    baseRotationSpeed: 1.5,
    minRotationSpeed: 0.8,
    maxRotationSpeed: 3.0,
    speedChangeInterval: 2,
    speedTransitionDuration: 0.5,
    reversalInterval: 2,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0, y: 0.4, rotation: 0 },
      { type: 'shield', size: 1.2, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 },
      { 
        type: "rock", 
        size: 0.8, 
        x: 0, 
        y: 0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.2,
        orbitSpeed: 1.5,
        orbitDirection: 1
      },
      { 
        type: "rock", 
        size: 0.8, 
        x: 0, 
        y: -0.3, 
        rotation: 0,
        isOrbiting: true,
        orbitDistance: 1.5,
        orbitSpeed: 2.0,
        orbitDirection: -1
      }
    ]
  }
]; 