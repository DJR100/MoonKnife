import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path, G, Circle, Line, Text } from 'react-native-svg';

const SwordComponent = ({ 
  size, 
  x, 
  y, 
  rotation, 
  isThrown, 
  color = '#D3D3D3', 
  handleColor = '#8B4513',
  knifeType = 'standard', // New parameter to determine knife style
  isSerrated = false,
  hasFingerWrap = false
}) => {
  // Scale based on size prop
  const scaleFactor = size / 100;
  
  // Render different knife types based on knifeType parameter
  const renderKnife = () => {
    switch (knifeType) {
      case 'tactical':
        return (
          <>
            {/* Tactical Combat Dagger - updated design */}
            <Path
              d="M50,10 L55,20 L54,55 L46,55 L45,20 L50,10"
              fill={color}
              stroke="#666"
              strokeWidth="1"
            />
            {/* Fuller (blood groove) down center of blade */}
            <Path
              d="M50,15 L50,50"
              fill="none"
              stroke="#888"
              strokeWidth="1"
            />
            {/* Guard */}
            <Rect 
              x="37" y="52" 
              width="26" height="5" 
              rx="1" 
              fill="#333" 
            />
            {/* Black tactical handle with grip texture */}
            <Path
              d="M46,57 L54,57 L55,85 L45,85 L46,57"
              fill="#222"
              stroke="#444"
              strokeWidth="0.5"
            />
            {/* Handle grip texture */}
            <Path
              d="M47,60 L53,60 M47,65 L53,65 M47,70 L53,70 M47,75 L53,75 M47,80 L53,80"
              stroke="#555"
              strokeWidth="0.5"
            />
            {/* Handle pommel */}
            <Rect 
              x="45" y="85" 
              width="10" height="3" 
              rx="1" 
              fill="#333" 
            />
          </>
        );
      
      case 'karambit':
        return (
          <>
            {/* Karambit curved blade based on reference images */}
            <Path
              d="M45,12 C35,20 30,40 45,65 L50,60 C40,25 38,40 50,60 C55,35 50,15 45,12 Z"
              fill={color || "#F8A1FF"}
              stroke="#BBF5FF"
              strokeWidth="1"
            />
            {/* Blade sharp edge highlight */}
            <Path
              d="M47,15 C40,25 38,40 50,60"
              fill="none"
              stroke="#65FFDB"
              strokeWidth="1.5"
              opacity="0.7"
            />
            {/* Black textured handle with grip */}
            <Path
              d="M50,60 L45,65 L45,75 Q48,90 60,80 L50,60"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
            {/* Handle grip texture */}
            <Path
              d="M48,65 L45,67 M49,70 L46,72 M50,75 L48,77"
              stroke="#444"
              strokeWidth="0.5"
            />
            {/* Finger hole with gradient coloring */}
            <Circle
              cx="55"
              cy="85"
              r="8"
              fill="none"
              stroke="#65FFDB"
              strokeWidth="4"
            />
            {/* Finger hole gradient overlay */}
            <Circle
              cx="55"
              cy="85"
              r="8"
              fill="none"
              stroke="#F8A1FF"
              strokeWidth="2"
              opacity="0.7"
            />
          </>
        );
      
      case 'bowie':
        return (
          <>
            {/* Bowie knife blade - longer and thinner */}
            <Path
              d="M50,2 L42,15 L42,55 L58,55 L64,15 L58,8 L50,2"
              fill={color || "#5CB3FF"}
              stroke="#247AFD"
              strokeWidth="1"
            />
            {/* Blade gradient effect */}
            <Path
              d="M50,5 L60,15 L58,45"
              fill="none"
              stroke="#A1EEFF"
              strokeWidth="1.5"
              opacity="0.7"
            />
            {/* Blade fuller (blood groove) */}
            <Path
              d="M50,8 L50,50"
              fill="none"
              stroke="#2E5EFF"
              strokeWidth="1.5"
            />
            {/* Blade edge highlight for sharpness */}
            <Path
              d="M42,15 L42,55"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              opacity="0.8"
            />
            {/* Blade tip sharpness highlight */}
            <Path
              d="M50,2 L42,15"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              opacity="0.8"
            />
            {/* Crossguard */}
            <Path
              d="M40,55 L60,55 L60,58 L40,58 Z"
              fill="#3D3D3D"
              stroke="#222"
              strokeWidth="0.5"
            />
            {/* Handle with finger grooves - slimmer */}
            <Path
              d="M44,58 L56,58 L57,63 L56,68 L57,73 L56,78 L55,85 L45,85 L44,78 L43,73 L44,68 L43,63 L44,58"
              fill={handleColor || "#444"}
              stroke="#222"
              strokeWidth="0.5"
            />
            {/* Handle texture/grip */}
            <Path
              d="M46,61 L54,61 M47,68 L53,68 M46,75 L54,75 M47,82 L53,82"
              stroke="#222"
              strokeWidth="0.5"
            />
            {/* Pommel cap */}
            <Path
              d="M45,85 L55,85 L54,88 L46,88 Z"
              fill="#3D3D3D"
              stroke="#222"
              strokeWidth="0.5"
            />
          </>
        );
      
      case 'butterfly':
        return (
          <>
            {/* Butterfly knife blade - curved shape with blue gradient */}
            <Path
              d="M50,10 C58,20 60,35 55,55 L45,55 C40,35 42,20 50,10"
              fill={color || "#0E87CC"} // Blue color for the blade
              stroke="#0A75B8"
              strokeWidth="1"
            />
            {/* Blade gradient effect */}
            <Path
              d="M50,15 C55,25 56,40 52,50"
              fill="none"
              stroke="#65DBFF"
              strokeWidth="1.5"
              opacity="0.7"
            />
            {/* Blade fuller (blood groove) */}
            <Path
              d="M50,15 L50,50"
              fill="none"
              stroke="#0A75B8"
              strokeWidth="1"
            />
            {/* Handle tang channel */}
            <Rect 
              x="45" y="55" 
              width="10" height="5" 
              fill="#0A75B8" 
            />
            {/* Handle open - left side (balisong) */}
            <Path
              d="M45,55 L40,58 L38,65 L38,72 L36,80 L38,85 L45,88 L45,60"
              fill="#222222"
              stroke="#444"
              strokeWidth="0.5"
            />
            {/* Handle open - right side (balisong) */}
            <Path
              d="M55,55 L60,58 L62,65 L62,72 L64,80 L62,85 L55,88 L55,60"
              fill="#222222"
              stroke="#444"
              strokeWidth="0.5"
            />
            {/* Handle cutouts - left side */}
            <Path
              d="M40,62 L43,62 L43,68 L40,68 M40,72 L43,72 L43,78 L40,78"
              fill="#111"
              stroke="#333"
              strokeWidth="0.5"
            />
            {/* Handle cutouts - right side */}
            <Path
              d="M57,62 L60,62 L60,68 L57,68 M57,72 L60,72 L60,78 L57,78"
              fill="#111"
              stroke="#333"
              strokeWidth="0.5"
            />
            {/* Handle details - horizontal lines */}
            <Path
              d="M38,65 L45,65 M38,75 L45,75 M38,85 L45,85"
              stroke="#888"
              strokeWidth="0.5"
            />
            <Path
              d="M55,65 L62,65 M55,75 L62,75 M55,85 L62,85"
              stroke="#888"
              strokeWidth="0.5"
            />
            {/* Handle pivots */}
            <Circle cx="45" cy="56" r="2" fill="#CCC" stroke="#999" strokeWidth="0.5" />
            <Circle cx="55" cy="56" r="2" fill="#CCC" stroke="#999" strokeWidth="0.5" />
          </>
        );
      
      case 'shank':
        return (
          <>
            {/* Crude sharpened metal blade - toothbrush shank style */}
            <Path
              d="M50,10 L55,15 L57,35 L59,45 L55,55 L45,55 L41,45 L43,35 L45,15 L50,10"
              fill={color || "#A0A0A0"}
              stroke="#666"
              strokeWidth="1"
            />
            {/* Scratches and imperfections on blade */}
            <Path
              d="M48,15 L52,20 M46,25 L50,30 M54,35 L50,40 M52,45 L48,50"
              fill="none"
              stroke="#777"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Crooked blade point */}
            <Path
              d="M50,10 L51,12"
              stroke="#444"
              strokeWidth="0.5"
            />
            {/* Rough wrap binding at base of blade */}
            <Path
              d="M44,50 L56,50 M43,52 L57,52 M44,54 L56,54"
              stroke="#5E4534"
              strokeWidth="1"
            />
            {/* Improvised handle with cleaner wrap */}
            <Path
              d="M45,55 L55,55 L56,58 L57,71 L56,84 L44,84 L43,71 L44,58 L45,55"
              fill={handleColor || "#8B572A"}
              stroke="#5E4534"
              strokeWidth="0.5"
            />
            {/* Prison wrap texture - more consistent */}
            <Path
              d="M44,58 L56,58 M44,61 L56,61 M44,64 L56,64 M44,67 L56,67 M44,70 L56,70 M44,73 L56,73 M44,76 L56,76 M44,79 L56,79 M44,82 L56,82"
              stroke="#5E4534"
              strokeWidth="0.8"
              opacity="0.8"
            />
            {/* Handle details */}
            <Path
              d="M45,62 C47,61 53,61 55,62"
              fill="none"
              stroke="#333"
              strokeWidth="0.5"
            />
            {/* Tape/binding ends */}
            <Path
              d="M44,58 L43,56 M56,58 L57,56 M44,82 L43,84 M56,82 L57,84"
              stroke="#5E4534"
              strokeWidth="0.5"
            />
          </>
        );

      case 'chicken':
        return (
          <>
            {/* Rubber chicken body */}
            <Path
              d="M50,15 C65,18 65,30 60,40 C65,50 65,65 55,75 L45,75 C35,65 35,50 40,40 C35,30 35,18 50,15 Z"
              fill={color || "#FFEB3B"}
              stroke="#E6D335"
              strokeWidth="1"
            />
            {/* Chicken belly highlight */}
            <Path
              d="M50,35 C55,45 55,60 50,70 C45,60 45,45 50,35"
              fill="#FFF59D"
              stroke="none"
            />
            {/* Chicken wing details */}
            <Path
              d="M42,30 C37,35 37,45 43,50 M58,30 C63,35 63,45 57,50"
              fill="none"
              stroke="#E6D335"
              strokeWidth="1"
            />
            {/* Chicken texture/wrinkles */}
            <Path
              d="M45,55 C49,57 51,57 55,55 M45,60 C49,62 51,62 55,60 M45,65 C49,67 51,67 55,65"
              fill="none"
              stroke="#E6D335"
              strokeWidth="0.5"
              opacity="0.7"
            />
            {/* Chicken face */}
            <Circle cx="43" cy="22" r="2.5" fill="#333" />
            <Circle cx="57" cy="22" r="2.5" fill="#333" />
            <Circle cx="43" cy="22" r="0.8" fill="white" />
            <Circle cx="57" cy="22" r="0.8" fill="white" />
            {/* Chicken beak */}
            <Path
              d="M47,25 L50,30 L53,25 Z"
              fill={handleColor || "#FF5722"}
              stroke="#E64A19"
              strokeWidth="0.5"
            />
            {/* Chicken comb/wattle */}
            <Path
              d="M50,15 L48,10 L46,12 L44,10 L42,13 L40,11"
              fill={handleColor || "#FF5722"}
              stroke="#E64A19"
              strokeWidth="0.5"
            />
            {/* Wattle under beak */}
            <Path
              d="M50,30 C48,33 46,32 45,35 C47,34 53,34 55,35 C54,32 52,33 50,30"
              fill={handleColor || "#FF5722"}
              stroke="#E64A19"
              strokeWidth="0.5"
            />
            {/* Chicken neck wrinkles */}
            <Path
              d="M45,35 L55,35 M46,38 L54,38 M45,41 L55,41"
              stroke="#E6D335"
              strokeWidth="0.5"
              opacity="0.8"
            />
            {/* Chicken legs/handle */}
            <Path
              d="M45,75 L45,90 C47,92 53,92 55,90 L55,75"
              fill="#FFEB3B"
              stroke="#E6D335"
              strokeWidth="1"
            />
            {/* Chicken feet */}
            <Path
              d="M45,90 L40,95 M45,90 L45,95 M45,90 L49,95"
              stroke="#FF5722"
              strokeWidth="1"
            />
            <Path
              d="M55,90 L51,95 M55,90 L55,95 M55,90 L60,95"
              stroke="#FF5722"
              strokeWidth="1"
            />
            {/* Silly expression lines */}
            <Path
              d="M47,27 C48,26 52,26 53,27"
              fill="none"
              stroke="#333"
              strokeWidth="0.5"
            />
            {/* Chicken sound effect */}
            {isThrown && (
              <Path
                d="M60,20 L70,15 L75,20 L70,25 Z"
                fill="white"
                stroke="#333"
                strokeWidth="0.5"
              />
            )}
            {isThrown && (
              <Path
                d="M64,20 L66,18 L68,20 L67,22 L64,20 Z"
                fill="white"
                stroke="#333"
                strokeWidth="0.3"
              />
            )}
            {isThrown && (
              <Text
                x="62"
                y="21"
                fontSize="6"
                fill="#333"
                fontWeight="bold"
              >
                SQUEAK!
              </Text>
            )}
          </>
        );
        
      case 'serrated':
        return (
          <>
            {/* Serrated blade */}
            <Path
              d="M50,10 
                L58,20 L54,22 
                L58,30 L54,32 
                L58,40 L54,42 
                L60,55 
                L40,55 Z"
              fill={color}
              stroke="#A9A9A9"
              strokeWidth="1"
            />
            
            {/* Finger-wrap handle */}
            <Path
              d="M45,60 
                L35,65 L35,70 L45,65 
                L45,85 
                L55,85 
                L55,65 L65,70 L65,65 L55,60 
                L45,60
                Z"
              fill={handleColor}
              stroke="#666666"
              strokeWidth="1"
            />
          </>
        );
        
      default: // standard knife
        return (
          <>
            {/* Standard sword blade */}
            <Rect x="45" y="60" width="10" height="30" rx="2" fill={handleColor} />
            <Rect x="35" y="55" width="30" height="8" rx="2" fill="#A9A9A9" />
            <Path
              d="M50,10 L60,55 L40,55 Z"
              fill={color}
              stroke="#A9A9A9"
              strokeWidth="1"
            />
          </>
        );
    }
  };
  
  return (
    <View
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: [{ rotate: `${rotation}deg` }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {renderKnife()}
      </Svg>
    </View>
  );
};

export default SwordComponent;
