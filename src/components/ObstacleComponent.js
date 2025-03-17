import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

const ObstacleComponent = ({ type, size, x, y, rotation, color = '#888888' }) => {
  const obstacleSize = size * 30; // Scale the size proportionally
  
  const renderObstacle = () => {
    switch (type) {
      case 'rock':
        return (
          <G rotation={rotation} origin={`${obstacleSize/2}, ${obstacleSize/2}`}>
            {/* Irregular rock shape */}
            <Path
              d={`M ${obstacleSize*0.2} ${obstacleSize*0.3} 
                  Q ${obstacleSize*0.1} ${obstacleSize*0.5}, ${obstacleSize*0.25} ${obstacleSize*0.7} 
                  L ${obstacleSize*0.5} ${obstacleSize*0.9} 
                  Q ${obstacleSize*0.7} ${obstacleSize*0.8}, ${obstacleSize*0.8} ${obstacleSize*0.6} 
                  Q ${obstacleSize*0.9} ${obstacleSize*0.4}, ${obstacleSize*0.7} ${obstacleSize*0.2} 
                  Q ${obstacleSize*0.5} ${obstacleSize*0.1}, ${obstacleSize*0.2} ${obstacleSize*0.3}`}
              fill={color || '#777777'}
              stroke="#555555"
              strokeWidth="1"
            />
            {/* Add some texture details */}
            <Path
              d={`M ${obstacleSize*0.3} ${obstacleSize*0.4} L ${obstacleSize*0.5} ${obstacleSize*0.5}`}
              stroke="#555555"
              strokeWidth="1"
            />
            <Path
              d={`M ${obstacleSize*0.6} ${obstacleSize*0.6} L ${obstacleSize*0.7} ${obstacleSize*0.4}`}
              stroke="#555555"
              strokeWidth="1"
            />
            <Circle cx={obstacleSize*0.4} cy={obstacleSize*0.6} r={obstacleSize*0.05} fill="#555555" />
          </G>
        );
      
      case 'shield':
        return (
          <G rotation={rotation} origin={`${obstacleSize/2}, ${obstacleSize/2}`}>
            {/* Shield base */}
            <Path
              d={`M ${obstacleSize*0.3} ${obstacleSize*0.2} 
                  L ${obstacleSize*0.7} ${obstacleSize*0.2} 
                  Q ${obstacleSize*0.9} ${obstacleSize*0.4}, ${obstacleSize*0.8} ${obstacleSize*0.7} 
                  L ${obstacleSize*0.5} ${obstacleSize*0.9} 
                  L ${obstacleSize*0.2} ${obstacleSize*0.7} 
                  Q ${obstacleSize*0.1} ${obstacleSize*0.4}, ${obstacleSize*0.3} ${obstacleSize*0.2}`}
              fill={color || '#AAAAAA'}
              stroke="#555555"
              strokeWidth="2"
            />
            {/* Shield details */}
            <Circle cx={obstacleSize*0.3} cy={obstacleSize*0.4} r={obstacleSize*0.05} fill="#555555" />
            <Circle cx={obstacleSize*0.7} cy={obstacleSize*0.4} r={obstacleSize*0.05} fill="#555555" />
            <Circle cx={obstacleSize*0.5} cy={obstacleSize*0.6} r={obstacleSize*0.07} fill="#777777" stroke="#555555" strokeWidth="1" />
            <Path
              d={`M ${obstacleSize*0.4} ${obstacleSize*0.3} L ${obstacleSize*0.6} ${obstacleSize*0.3}`}
              stroke="#555555"
              strokeWidth="1"
            />
            <Path
              d={`M ${obstacleSize*0.3} cy={obstacleSize*0.5} L ${obstacleSize*0.7} ${obstacleSize*0.5}`}
              stroke="#555555"
              strokeWidth="1"
            />
          </G>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={{
      position: 'absolute',
      left: x - obstacleSize/2,
      top: y - obstacleSize/2,
      width: obstacleSize,
      height: obstacleSize,
    }}>
      <Svg width={obstacleSize} height={obstacleSize} viewBox={`0 0 ${obstacleSize} ${obstacleSize}`}>
        {renderObstacle()}
      </Svg>
    </View>
  );
};

export default ObstacleComponent; 