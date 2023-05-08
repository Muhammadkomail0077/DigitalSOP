import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
  FlatList,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import {getRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const InsideDetail = ({route}) => {
  const sheetPosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only set the pan responder if the user is swiping up
        // return gestureState.dy < 0;
        true;
      },
      onPanResponderMove: (evt, gestureState) => {
        const dy = gestureState.dy;
        const newSheetPosition = sheetPosition._value + dy;

        // Limit the sheet position to the minimum and maximum allowed values
        const minSheetPosition = 1000;
        const maxSheetPosition = 300;
        if (
          newSheetPosition >= minSheetPosition &&
          newSheetPosition <= maxSheetPosition
        ) {
          sheetPosition.setValue(newSheetPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const dy = gestureState.dy;
        const vy = gestureState.vy;

        // If the sheet is dragged up, snap it to the top position
        if (dy < 0 && sheetPosition._value > -150) {
          Animated.timing(sheetPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        // If the sheet is dragged down, snap it to the bottom position
        else if (dy > 0 && sheetPosition._value < 150) {
          Animated.timing(sheetPosition, {
            toValue: 150,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        // If the sheet is released with a velocity, snap it to the top or bottom position
        else if (vy < -0.5) {
          Animated.timing(sheetPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (vy > 0.5) {
          Animated.timing(sheetPosition, {
            toValue: 150,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
        // If the sheet is released without a velocity, snap it to the nearest position
        else {
          const value = sheetPosition._value;
          if (value >= 75) {
            Animated.timing(sheetPosition, {
              toValue: 150,
              duration: 200,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.timing(sheetPosition, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        }
      },
    }),
  ).current;

  const type = route.params;

  console.log('type: ', type.type);

  const Navigation = useNavigation();

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    (async () => {
      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);
      if (type.type == 'pdf') {
        console.log('pdf working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/pdf`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              if (res.data.pdf.length == 0) {
                console.log('nUll');
                setEmpty(true);
              }
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      } else if (type.type == 'video') {
        console.log('video working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/video`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              if (res.data.video.length == 0) {
                console.log('nUll');
                setEmpty(true);
              }
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      } else if (type.type == 'images') {
        console.log('images working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/images`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              if (res.data.images.length == 0) {
                console.log('null');
                setEmpty(true);
              }
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      } else if (type.type == 'mobileImages') {
        console.log('mobileImages working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/mobileImages`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              if (res.data.mobileImages.length == 0) {
                console.log('nUll');
                setEmpty(true);
              }
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            showError(err);
            setLoading(false);
          });
      } else if (type.type == 'recentView') {
        console.log('recentView working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/recentView`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              console.log('res.data: ', res.data);
              if (res.data.recentView == []) {
                console.log('nUll');
                setEmpty(true);
              }
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      } else if (type.type == 'ppt') {
        console.log('ppt working');
        getRequest(
          `${BASE_URL}/user/mobile/dashboard/ppt`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside Detail Data:', res);
            setLoading(false);
            if (res.status == 1) {
              if (res.data.ppt.length == 0) {
                console.log('nUll');
                setEmpty(true);
              }
              setData(res.data);
              console.log('Data from api Inside Detail: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      }
    })();
    console.log('data: ', data);
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }


  const renderItemImages = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let id = {id: item.id, type: 'mobileImages'};
        Navigation.navigate('Demo', id);
        console.log(item);
      }}>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: '1%',
          width: 150,
          marginVertical: '2%',
        }}>
        <Image
          source={require('../../Assets/Images/HomeScreen/backImage.png')}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 10,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: 'black',
            backgroundColor: '#d3d3d3',
          }}>
          {item.doc_name ? item.doc_name : item.shortDetails}
        </Text>
      </View>
    </Pressable>
  );
  const renderItemMobileImages = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let id = {id: item.id, type: 'mobileImages'};
        Navigation.navigate('Demo', id);
        console.log(item);
      }}>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: '1%',
          width: 150,
          marginVertical: '2%',
        }}>
        <Image
          source={require('../../Assets/Images/HomeScreen/backImage.png')}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 10,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: 'black',
            backgroundColor: '#d3d3d3',
          }}>
          {item.doc_name ? item.doc_name : item.shortDetails}
        </Text>
      </View>
    </Pressable>
  );
  const renderItemPdf = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let idPdf = {id: item.id, type: 'pdf'};
        Navigation.navigate('Demo', idPdf);
        console.log(item);
      }}>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: '1%',
          width: 150,
          marginVertical: '2%',
        }}>
        <Image
          source={require('../../Assets/Images/HomeScreen/backImage.png')}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 10,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: 'black',
            backgroundColor: '#d3d3d3',
          }}>
          {item.doc_name ? item.doc_name : item.shortDetails}
        </Text>
      </View>
    </Pressable>
  );
  const renderItemPpt = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let id = {id: item.id, type: 'ppt'};
        Navigation.navigate('Settings', id);
        console.log(item);
      }}>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: '1%',
          width: 150,
          marginVertical: '2%',
        }}>
        <Image
          source={require('../../Assets/Images/HomeScreen/backImage.png')}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 10,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: 'black',
            backgroundColor: '#d3d3d3',
          }}>
          {item.doc_name ? item.doc_name : item.shortDetails}
        </Text>
      </View>
    </Pressable>
  );
  const renderItemVideo = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let idvideo = {id: item.id, type: 'video'};
        Navigation.navigate('Settings', idvideo);
        console.log(item);
      }}>
      <View
        style={{
          borderRadius: 10,
          marginHorizontal: '1%',
          width: 150,
          marginVertical: '2%',
        }}>
        <Image
          source={require('../../Assets/Images/HomeScreen/backImage.png')}
          style={{
            width: '100%',
            height: 100,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 10,
            backgroundColor: COLORS.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            color: 'black',
            backgroundColor: '#d3d3d3',
          }}>
          {item.details}
        </Text>
      </View>
    </Pressable>
  )
  

  return (
    <>
      <SafeArea>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'pink',
          }}>
          <ImageBackground
            source={require('../../Assets/Images/HomeScreen/backImage.png')}
            style={{height: '100%', width: '100%'}}>
            <View style={{margin: '5%'}}>
              {/* Header */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={() => {
                    Navigation.navigate('Profile');
                  }}>
                  <View>
                    <Image
                      source={require('../../Assets/Images/ProfileImage/profileIcon.png')}
                      style={{width: 30, height: 30}}
                    />
                  </View>
                </Pressable>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'700'}
                    Fontsize={14}
                    Heading={'Digital-SOP'}
                    txtAlign={'center'}
                    as={'center'}
                    c={COLORS.white}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <Pressable
                      onPress={() => {
                        console.log('press');
                      }}>
                      <Ionicons
                        name={'search'}
                        size={20}
                        color={'white'}
                        style={{
                          flexDirection: 'column-reverse',
                          justifyContent: 'center',
                          marginHorizontal: '1%',
                        }}
                      />
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => {
                        console.log('press');
                      }}>
                      <Ionicons
                        name={'ios-notifications'}
                        size={20}
                        color={'white'}
                        style={{marginHorizontal: '2%'}}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginHorizontal: '8%',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                Industrial Training
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  marginHorizontal: '20%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit
              </Text>
            </View>
            <Animated.View
              style={[
                styles.bottomSheet,
                {transform: [{translateY: sheetPosition}]},
                // {backgroundColor:'white'}
              ]}
              {...panResponder.panHandlers}>
              <ScrollView>
                {/* ================= */}
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    data={
                      data.images
                        ? data.images
                        : data.mobileImages
                        ? data.mobileImages
                        : data.pdf
                        ? data.pdf
                        : data.ppt
                        ? data.ppt
                        : data.video
                        ? data.video
                        : data.recentView
                    }
                    renderItem={
                      data.images
                        ? renderItemImages
                        : data.mobileImages
                        ? renderItemMobileImages
                        : data.pdf
                        ? renderItemPdf
                        : data.ppt
                        ? renderItemPpt
                        : data.video
                        ? renderItemVideo
                        : null
                    }
                    keyExtractor={item => item.length}
                    contentContainerStyle={{
                      width: '100%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                    style={{width: '100%'}}
                    horizontal
                    initialNumToRender={0}
                    scrollEnabled
                    nestedScrollEnabled
                  />
                </View>
                {empty && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      backgroundColor: 'grey',
                      paddingVertical: 40,
                      marginVertical: 250,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      No Data Found
                    </Text>
                  </View>
                )}
              </ScrollView>
              {/* ================= */}
            </Animated.View>
          </ImageBackground>
        </View>
      </SafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'pink',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 650,
    alignContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});
