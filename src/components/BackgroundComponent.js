import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const BackgroundComponent = () => {
  const { width, height } = Dimensions.get('window');
  
  return (
    <View style={{ position: 'absolute', width, height }}>
      <Svg width={width} height={height}>
        {/* Pure black background */}
        <Rect x="0" y="0" width={width} height={height} fill="#000000" />
      </Svg>
    </View>
  );
};

export default BackgroundComponent;
