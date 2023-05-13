import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../App/api';
import {getRequest} from '../../App/fetch';

export const Settings = ({route}) => {
  const idvideo = route.params;
  console.log('item: ', idvideo);

  const [loading, setLoading] = useState(false);

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);

      console.log('Inside SOP Working');
      getRequest(
        `${BASE_URL}/user/mobile/details/${idvideo.id}/${idvideo.type}`,
        `Bearer ${AuthReducer?.userData.token}`,
      )
        .then(res => {
          console.log('Response From Inside setting Data:', res);
          setLoading(false);
          if (res.status == 1) {
            setData(res.data);
            console.log('Data from api Inside setting: ', data);
          }
        })
        .catch(err => {
          console.log('Error For dashboard Data: ', err);
          alert(err);
          setLoading(false);
        });
    })();
  }, []);

  
  const Navigation = useNavigation();
  const videoRef = useRef();

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }
  return (
    <View>
      <View style={{margin: 15}}>
        <Button onPress={() => Navigation.navigate('CurveBottomBar')}>
          Back To Home
        </Button>
      </View>
      <View style={{backgroundColor: 'rgb(9, 13, 13)', height: 250}}>
        {/* <Video
          controls={true}
          source={require('../../Assets/Images/video/test-video.mp4')}
          ref={videoRef}
          onBuffer={() => {}}
          onError={() => {}}
          style={{width: '100%', height: 210, position: 'absolute', top: 10}}
          resizeMode={'contain'}
        /> */}
      </View>
      <View>
        <View style={[{backgroundColor: '#fff', height: 50}, styles.shadow]}>
          <Text
            style={{
              color: 'black',
              padding: 2,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 'bold',
              marginTop: 13,
            }}>
            {data?.title}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: '#fff', height: 250, marginTop: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            marginTop: 13,
            marginLeft: 16,
          }}>
          {data?.short_detail} 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.27,
    elevation: 14,
  },
});
