import React, { useRef } from 'react';
import { StyleSheet, View, Text, Animated, PanResponder, TouchableOpacity } from 'react-native';

const CustomBottomSheet = () => {
  const sheetPosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        const dy = gestureState.dy;
        const newSheetPosition = sheetPosition._value + dy;

        // Limit the sheet position to the minimum and maximum allowed values
        const minSheetPosition = 0;
        const maxSheetPosition = 500;
        if (newSheetPosition >= minSheetPosition && newSheetPosition <= maxSheetPosition) {
          sheetPosition.setValue(newSheetPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Snap the bottom sheet to the top or bottom of the screen depending on its position
        const snapThreshold = 250;
        const currentPosition = sheetPosition._value;
        if (currentPosition < snapThreshold) {
          Animated.timing(sheetPosition, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(sheetPosition, {
            toValue: 500,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bottomSheet,
          { transform: [{ translateY: sheetPosition }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>Custom Bottom Sheet</Text>
        <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat purus et arcu feugiat, nec ultrices ipsum tincidunt. Etiam gravida turpis non consectetur rhoncus.</Text>
        <TouchableOpacity onPress={() => console.log('Button pressed')} style={styles.button}>
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});


export default CustomBottomSheet