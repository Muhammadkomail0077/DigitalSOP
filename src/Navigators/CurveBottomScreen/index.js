import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, TouchableOpacity, View} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home} from '../../Screens/Home';
import {Notifications} from '../../Screens/Notifications';
import {Profile} from '../../Screens/Profile';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './style';
import {launchCamera} from 'react-native-image-picker';
import {SharedSOP} from '../../Screens/SharedSop';
import {Alert, Modal, StyleSheet} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Contact from '../../Screens/Contact';
import {Privacy} from '../../Screens/Privacy';
import {useSelector} from 'react-redux';

const CurveBottomBar = () => {
  const Navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const {AuthReducer} = useSelector(state => state);
  console.log(
    'reducerData in curve Bottom Bar: ',
    AuthReducer.userData.user.role,
  );
  useEffect(() => {
    AuthReducer.userData.user.role == 'admin' && setCircleStatus(true);
  }, []);

  const [circleStatus, setCircleStatus] = useState(false);

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'home':
        icon = 'home';
        screenName = 'Home';
        break;
      case 'sharedSOP':
        icon = 'ios-share-social-outline';
        screenName = 'SOP';
        break;
      case 'Privacy':
        icon = 'shield-outline';
        screenName = 'Privacy';
        break;
      case 'Contact':
        icon = 'newspaper-outline';
        screenName = 'Contact';
        break;
    }

    return (
      <>
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? 'black' : 'grey'}
        />
        <Text style={{fontSize: 10, color: 'black'}}>{screenName}</Text>
      </>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const openCamera = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log('res: ', res);
      if (res.assets) {
        console.log(res);
        console.log('custom bottom bar');
        const detail = [
          {
            filename: res.assets[0].uri,
            type: 'image',
            sequence: 1,
            notes: '',
          },
        ];
        setModalVisible(!modalVisible);
        Navigation.navigate('AddMessage', detail);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: 'flex-start',
                margin: '8%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  marginLeft: 10,
                }}>
                <Pressable
                  onPress={() => {
                    openCamera();
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 25,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icons name="photo-camera" color={'#fff'} size={30} />
                  </View>
                </Pressable>
                <Text style={{color: 'black'}}> Camera</Text>
              </View>
              <View
                style={{
                  marginLeft: 40,
                }}>
                <Pressable
                  onPress={() => {
                    Navigation.navigate('Camra');
                    setModalVisible(!modalVisible);
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 25,
                      padding: 10,
                    }}>
                    <Icons name="videocam" color={'#fff'} size={30} />
                  </View>
                </Pressable>
                <Text style={{color: 'black'}}> Video</Text>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        <CurvedBottomBar.Navigator
          style={{backgroundColor: 'transparent'}}
          strokeWidth={5}
          height={59}
          circleWidth={55}
          bgColor={'#EFF1FD'}
          initialRouteName="home"
          renderCircle={() => (
            <Animated.View style={styles.btnCircle}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisible(true)}>
                <Ionicons
                  name={'add'}
                  style={{fontWeight: 'bold'}}
                  color={'#D2D2DE'}
                  size={30}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}>
          <CurvedBottomBar.Screen
            options={{headerShown: false}}
            name="home"
            position="LEFT"
            component={Home}
          />
          <CurvedBottomBar.Screen
            options={{headerShown: false}}
            name="sharedSOP"
            position="LEFT"
            component={SharedSOP}
          />
          <CurvedBottomBar.Screen
            options={{headerShown: false}}
            name="Privacy"
            component={Privacy}
            position="RIGHT"
          />
          <CurvedBottomBar.Screen
            options={{headerShown: false}}
            name="Contact"
            component={Contact}
            position="RIGHT"
          />
        </CurvedBottomBar.Navigator>
      </View>
    </>
  );
};

export default CurveBottomBar;
