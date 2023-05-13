import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  PanResponder,
  Pressable,
} from 'react-native';

const CustomBottomSheet = () => {

  const sheetPosition = useRef(new Animated.Value(0)).current;
  const minSheetPosition = -50; // Adjust this value as per your requirements
  const maxSheetPosition = 100; // Adjust this value as per your requirements

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const dy = gestureState.dy;

        // Limit the sheet position to the minimum and maximum allowed values
        const newSheetPosition = sheetPosition._value + dy;
        if (
          newSheetPosition >= minSheetPosition &&
          newSheetPosition <= maxSheetPosition
        ) {
          sheetPosition.setValue(newSheetPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Snap the bottom sheet to the nearest position (top or bottom)
        const currentPosition = sheetPosition._value;
        if (currentPosition < (minSheetPosition + maxSheetPosition) / 2) {
          Animated.timing(sheetPosition, {
            toValue: minSheetPosition,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(sheetPosition, {
            toValue: maxSheetPosition,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const animatedSheetStyle = {
    transform: [{translateY: sheetPosition}],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bottomSheet, animatedSheetStyle]}>
        <View style={styles.draggableLine} {...panResponder.panHandlers} />
        <Text style={styles.title}>Custom Bottom Sheet</Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat
          purus et arcu feugiat, nec ultrices ipsum tincidunt. Etiam gravida
          turpis non consectetur rhoncus.
        </Text>
        <Pressable
          onPress={() => {
            console.log('preeable');
          }}>
          <Text>Pressable</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  draggableLine: {
    width: '100%',
    height: 10,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    height: '70%',
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
});

export default CustomBottomSheet;
