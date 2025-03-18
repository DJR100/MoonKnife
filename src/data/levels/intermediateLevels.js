// Game levels data - Intermediate Levels (11-20)
// Each level has unique challenges for intermediate players

export const intermediateLevels = [
  {
    id: 11,
    name: "Space Filler",
    description: "Two rocks in permanent locations.",
    knivesRequired: 13,
    timeLimit: 30,
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
    timeLimit: 30,
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
    timeLimit: 30,
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
    timeLimit: 30,
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
    timeLimit: 30,
    moonSize: 0.9,
    baseRotationSpeed: 1.2,
    reversalInterval: 2,
    obstacles: [
      { type: 'rock', size: 1.0, x: 0, y: 0.4, rotation: 0 },
      { type: 'rock', size: 1.0, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 }
    ]
  },
  {
    id: 16,
    name: "Faster Rotation",
    description: "Increased speed with shield obstacles.",
    knivesRequired: 16,
    timeLimit: 30,
    moonSize: 0.85,
    baseRotationSpeed: 1.3,
    reversalInterval: 2,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'shield', size: 1.2, x: -0.3, y: -0.3, rotation: 225 }
    ]
  },
  {
    id: 17,
    name: "Speed Variation",
    description: "Moon speeds up and slows down at random intervals.",
    knivesRequired: 16,
    timeLimit: 30,
    moonSize: 0.85,
    baseRotationSpeed: 1.0,
    minRotationSpeed: 0.5,
    maxRotationSpeed: 2.0,
    speedChangeInterval: 3,
    speedTransitionDuration: 1,
    reversalInterval: 0,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0.3, y: 0.3, rotation: 45 },
      { type: 'rock', size: 1.0, x: -0.3, y: -0.3, rotation: 225 }
    ]
  },
  {
    id: 18,
    name: "Triple Challenge",
    description: "Three shields and variable speed.",
    knivesRequired: 17,
    timeLimit: 30,
    moonSize: 0.85,
    baseRotationSpeed: 1.0,
    minRotationSpeed: 0.5,
    maxRotationSpeed: 2.0,
    speedChangeInterval: 3,
    speedTransitionDuration: 1,
    reversalInterval: 0,
    obstacles: [
      { type: 'shield', size: 1.2, x: 0, y: 0.4, rotation: 0 },
      { type: 'shield', size: 1.2, x: 0.35, y: -0.2, rotation: 120 },
      { type: 'shield', size: 1.2, x: -0.35, y: -0.2, rotation: 240 }
    ]
  },
  {
    id: 19,
    name: "Orbiting Rock",
    description: "Rock orbits the moon as shields protect the surface.",
    knivesRequired: 18,
    timeLimit: 30,
    moonSize: 0.85,
    baseRotationSpeed: 1.0,
    minRotationSpeed: 0.5,
    maxRotationSpeed: 2.0,
    speedChangeInterval: 3,
    reversalInterval: 0,
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
        orbitDistance: 1.2,
        orbitSpeed: 1.5,
        orbitDirection: -1
      }
    ]
  },
  {
    id: 20,
    name: "Intermediate Master",
    description: "Shields, orbiting rock, and quick reversals.",
    knivesRequired: 20,
    timeLimit: 30,
    moonSize: 0.8,
    baseRotationSpeed: 1.2,
    reversalInterval: 3,
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
  }
]; 