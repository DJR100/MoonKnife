import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { levels } from '../data/levels';
import BackgroundComponent from '../components/BackgroundComponent';

const { width } = Dimensions.get('window');
const LEVELS_PER_ROW = 5;
const BUTTON_SIZE = (width - 80) / LEVELS_PER_ROW;

const LevelSelectionScreen = ({ navigation, route }) => {
  // We'll ignore the highestLevelReached value
  // const { highestLevelReached = 1 } = route.params || {};
  
  const getLevelCategory = (levelNum) => {
    if (levelNum <= 10) return 'Beginner';
    if (levelNum <= 20) return 'Intermediate';
    if (levelNum <= 30) return 'Advanced';
    if (levelNum <= 40) return 'Expert';
    return 'Nightmare';
  };
  
  const getButtonColor = (levelNum) => {
    const category = getLevelCategory(levelNum);
    switch (category) {
      case 'Beginner': return '#4CAF50'; // Green
      case 'Intermediate': return '#2196F3'; // Blue
      case 'Advanced': return '#FF9800'; // Orange
      case 'Expert': return '#F44336'; // Red
      case 'Nightmare': return '#9C27B0'; // Purple
      default: return '#CCCCCC';
    }
  };
  
  const renderLevelButton = (levelNum) => {
    // All levels are now unlocked (isUnlocked is always true)
    const isUnlocked = true;
    
    return (
      <TouchableOpacity
        key={levelNum}
        style={[
          styles.levelButton,
          { backgroundColor: getButtonColor(levelNum) }
        ]}
        disabled={!isUnlocked}
        onPress={() => navigation.navigate('GameScreen', { level: levelNum })}
      >
        <Text style={styles.levelButtonText}>{levelNum}</Text>
      </TouchableOpacity>
    );
  };
  
  const renderLevelCategory = (category, start, end) => {
    const rows = [];
    let currentRow = [];
    
    for (let i = start; i <= end; i++) {
      currentRow.push(renderLevelButton(i));
      
      if (currentRow.length === LEVELS_PER_ROW || i === end) {
        rows.push(
          <View key={`row-${i}`} style={styles.row}>
            {currentRow}
          </View>
        );
        currentRow = [];
      }
    }
    
    return (
      <View key={category} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        {rows}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundComponent />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SELECT LEVEL</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderLevelCategory('Beginner', 1, 10)}
        {renderLevelCategory('Intermediate', 11, 20)}
        {renderLevelCategory('Advanced', 21, 30)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backButton: {
    padding: 10
  },
  backButtonText: {
    color: 'white',
    fontSize: 16
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50
  },
  categoryContainer: {
    marginBottom: 30
  },
  categoryTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  levelButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10
  },
  levelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default LevelSelectionScreen; 