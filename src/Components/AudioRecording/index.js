// import React, { useState } from 'react';
// import {View} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import {Button, Text} from 'react-native-paper';
// import  { 
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption, 
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType, 
//  } from 'react-native-audio-recorder-player';


// export const AudioRecording = () => {
//   const audioRecorderPlayer = new AudioRecorderPlayer();
//   const [state, setState] = useState()

//   const onStartRecord = async () => {
//     const result = await audioRecorderPlayer.startRecorder();
//     audioRecorderPlayer.addRecordBackListener(e => {
//       setState({
//         recordSecs: e.currentPosition,
//         recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
//       });
//       return;
//     });
//     console.log(result);
//     console.log('state: ',state);
//   };

//   const onStopRecord = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     audioRecorderPlayer.removeRecordBackListener();
//     setState({
//       recordSecs: 0,
//     });
//     console.log(result);
//     console.log('state: ',state);
//   };



//   return (
//     <>
//       <View>
//         <Button
//           mode="contained"
//           onPress={() => {
//             onStartRecord();
//           }}>
//           onStartRecord
//         </Button>
//         <Button
//           mode="contained"
//           onPress={() => {
//             onStopRecord();
//           }}>
//           onStopRecord
//         </Button>

//       </View>
//     </>
//   );
// };
