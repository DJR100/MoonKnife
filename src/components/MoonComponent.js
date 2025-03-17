import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const MoonComponent = ({ size, rotation }) => {
  // Scale crater sizes based on moon size
  const craterScale = size / 100;
  
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G rotation={rotation} origin="50, 50">
          {/* Main moon circle */}
          <Circle cx="50" cy="50" r="45" fill="#FFD700" />
          
          {/* Crater holes */}
          <Circle cx="30" cy="30" r="8" fill="#E6C300" />
          <Circle cx="70" cy="40" r="10" fill="#E6C300" />
          <Circle cx="40" cy="70" r="12" fill="#E6C300" />
          <Circle cx="65" cy="65" r="7" fill="#E6C300" />
          <Circle cx="25" cy="55" r="6" fill="#E6C300" />
        </G>
      </Svg>
    </View>
  );
};

export default MoonComponent;
