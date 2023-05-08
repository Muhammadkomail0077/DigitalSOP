// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const CameraScreen = () => {
//   const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
//   const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
//   const cameraRef = useRef(null);

//   const toggleCameraType = () => {
//     setCameraType(cameraType === RNCamera.Constants.Type.back
//       ? RNCamera.Constants.Type.front
//       : RNCamera.Constants.Type.back);
//   };

//   const toggleFlashMode = () => {
//     setFlashMode(flashMode === RNCamera.Constants.FlashMode.off
//       ? RNCamera.Constants.FlashMode.torch
//       : RNCamera.Constants.FlashMode.off);
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <RNCamera
//         ref={cameraRef}
//         style={{ flex: 1 }}
//         type={cameraType}
//         flashMode={flashMode}
//         captureAudio={false}
//       />
//       <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>
//         <TouchableOpacity onPress={toggleCameraType}>
//           <Text style={{ color: 'white', fontSize: 18, margin: 16 }}>Flip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={takePicture}>
//           <Text style={{ color: 'white', fontSize: 18, margin: 16 }}>Take Picture</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={toggleFlashMode}>
//           <Text style={{ color: 'white', fontSize: 18, margin: 16 }}>Flash</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CameraScreen;
