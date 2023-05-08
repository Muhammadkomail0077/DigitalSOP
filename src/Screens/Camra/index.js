import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const Camra = ({route}) => {
  // const [data, setData] = useState([])

  if (route.params) {
    const data = route.params;
    console.log('data from add message', data);
  } else {
    console.log('Come From Home screen');
  }

  const Navigation = useNavigation();

  const [loading, setLoading] = useState(null);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const [show, setShow] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = camView === 'back' ? devices.back : devices.front;

  const cameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setLoading(devices);
    console.log(devices);
  }, [devices, route.params]);

  // console.log('devices: ', devices);

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices, route.params]);

  const recordingVideo = () => {
    const rVideo = cameraRef.current.startRecording({
      flash: 'on',
      onRecordingFinished: video => {
        console.log(video.path);
        if (route.params) {
          const data = route.params;
          console.log('data from add message', data);

          let lastarray = data[data.length - 1];

          const details = {
            filename: video.path,
            type: 'video',
            sequence: lastarray.sequence + 1,
            notes:''
          };
          route.params.push(details);
          const detail = route.params;

          console.log('detail after pushing previos data: ', detail);
          Navigation.navigate('AddMessage', detail);
        } else {
          console.log('Come From Home screen');
          const detail = [
            {
              filename: video.path,
              type: 'video',
              sequence: 1,
              notes:''
            },
          ];
          Navigation.navigate('AddMessage', detail);
        }
      },
      onRecordingError: error => console.error(error),
    });
  };

  const stopVideo = async () => {
    await cameraRef.current.stopRecording();
  };

  if (device == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        ref={cameraRef}
      />
      <TouchableOpacity>
        {show === false ? (
          <Foundation
            onPress={() => {
              recordingVideo();
              setShow(true);
            }}
            style={styles.startRec}
            name="record"
            color={'white'}
            size={100}
          />
        ) : (
          true
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        {show === true ? (
          <Ionicons
            onPress={() => {
              stopVideo();
              setShow(false);
              alert('Video Recorded Succesfully');
            }}
            style={styles.stopRec}
            name="ios-stop-circle-outline"
            color={'red'}
            size={100}
          />
        ) : (
          true
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          camView === 'back' ? setCamView('front') : setCamView('back');
        }}>
        <Image
          style={[
            {
              uri: 'https://tse4.mm.bing.net/th?id=OIP.h7XvNR8pB_ZjlvrcSWQ2zQHaHa&pid=Api&P=0',
            },
            styles.imgStyle,
          ]}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    height: 100,
    width: 100,
    color: 'red',
  },
  startRec: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 600,
    left: 150,
  },
  stopRec: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 600,
    left: 140,
  },
});
