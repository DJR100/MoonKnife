import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const MoonComponent = ({ size, x, y, rotation }) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transformOrigin: 'center',
        transform: [{ rotate: `${rotation}deg` }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Main moon circle */}
        <Circle cx="50" cy="50" r="45" fill="#FFD700" />
        
        {/* Crater holes */}
        <Circle cx="30" cy="30" r="8" fill="#E6C300" />
        <Circle cx="70" cy="40" r="10" fill="#E6C300" />
        <Circle cx="40" cy="70" r="12" fill="#E6C300" />
        <Circle cx="65" cy="65" r="7" fill="#E6C300" />
      </Svg>
    </View>
  );
};

export default MoonComponent;
