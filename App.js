import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/Navigators/Stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Store } from './src/Store';
import { Camera } from 'react-native-vision-camera';
// import { Camera } from 'react-native-vision-camera';

const App = () => {



  const [state, setState] = useState()

  useEffect(() => {
    (async () => {

      //Put your logic here

      getPermission()
      checkIfCameraAccessIsGivenOrNot()
    })();
  }, [])

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types",
    'ColorPropType will be removed',
    'Failed prop type',
    'VirtualizedLists should never be nested',
  ]);

  LogBox.ignoreAllLogs();

  const getPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission()
    const newMicrophonePermission = await Camera.requestMicrophonePermission()

  }

  const checkIfCameraAccessIsGivenOrNot = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus()
    console.log('cameraPermission: ', cameraPermission);
  }




  return (
    <Provider store={Store}>
      <PaperProvider>
        <StackNavigator />
      </PaperProvider>
      <FlashMessage position="center" />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
