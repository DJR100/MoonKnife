import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import BackgroundComponent from '../components/BackgroundComponent';
import SwordComponent from '../components/SwordComponent';

const { width, height } = Dimensions.get('window');
const SWORD_SIZE = 120;

// Define different sword types
const swordTypes = [
  {
    id: 'standard',
    name: 'Standard',
    color: '#D3D3D3', // Light gray
    handleColor: '#8B4513', // Brown
    knifeType: 'standard'
  }
];

const SwordSelectionScreen = ({ navigation, route }) => {
  const [selectedSwordIndex, setSelectedSwordIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleSelect = () => {
    // Pass the selected sword back to the home screen
    navigation.navigate('Home', { selectedSword: swordTypes[selectedSwordIndex] });
  };

  const renderSwordItem = ({ item, index }) => (
    <View style={styles.swordItemContainer}>
      <Text style={styles.swordName}>{item.name}</Text>
      <View style={styles.swordPreview}>
        <View style={styles.swordImageContainer}>
          <SwordComponent
            size={SWORD_SIZE}
            x={SWORD_SIZE/2}
            y={SWORD_SIZE/2}
            rotation={0}
            isThrown={false}
            color={item.color}
            handleColor={item.handleColor}
            knifeType={item.knifeType}
            isSerrated={item.isSerrated}
            hasFingerWrap={item.hasFingerWrap}
          />
        </View>
      </View>
    </View>
  );

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setSelectedSwordIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <BackgroundComponent />
      
      <Text style={styles.title}>Select Your Sword</Text>
      
      <FlatList
        ref={flatListRef}
        data={swordTypes}
        renderItem={renderSwordItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={styles.carouselContainer}
      />
      
      {/* Pagination dots */}
      <View style={styles.pagination}>
        {swordTypes.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              index === selectedSwordIndex && styles.paginationDotActive
            ]} 
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 60,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  swordItemContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  swordName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  swordPreview: {
    width: SWORD_SIZE * 1.5,
    height: SWORD_SIZE * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  swordImageContainer: {
    position: 'relative',
    width: SWORD_SIZE,
    height: SWORD_SIZE,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 5,
  },
  paginationDotActive: {
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    elevation: 5,
  },
  selectButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SwordSelectionScreen; 