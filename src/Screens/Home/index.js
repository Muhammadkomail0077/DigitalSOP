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
  Alert,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import {getRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
// import {showError} from '../../Utils/PopupFunctions';
export const Home = () => {
  const sheetPosition = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dx, dy} = gestureState;
        const isVerticalSwipe = Math.abs(dx) < Math.abs(dy);
        const isTouchInsideBottomSheet =
          evt.nativeEvent.locationY > 0 && evt.nativeEvent.locationY < 500;
        return isVerticalSwipe && isTouchInsideBottomSheet;
      },
      onPanResponderMove: (evt, gestureState) => {
        const dy = gestureState.dy;
        const newSheetPosition = sheetPosition._value + dy;

        // Limit the sheet position to the minimum and maximum allowed values
        const minSheetPosition = 100;
        const maxSheetPosition = 500;
        if (
          newSheetPosition >= minSheetPosition &&
          newSheetPosition <= maxSheetPosition
        ) {
          sheetPosition.setValue(newSheetPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Snap the bottom sheet to the top or bottom of the screen depending on its position
        const snapThreshold = 550;
        const currentPosition = sheetPosition._value;
        if (currentPosition < snapThreshold) {
          Animated.timing(sheetPosition, {
            toValue: 0,
            duration: 550,
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
    }),
  ).current;

  const Navigation = useNavigation();

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [clickValue, setClickValue] = useState('');

  useEffect(() => {
    (async () => {
      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);
      getRequest(
        `${BASE_URL}/user/mobile/dashboard`,
        `Bearer ${AuthReducer?.userData.token}`,
      )
        .then(res => {
          console.log('Response For dashboard Data:', res);
          setLoading(false);
          if (res.status == 1) {
            setData(res.data);
            console.log('Data from api Dashboard: ', data);
          }
        })
        .catch(err => {
          setLoading(false);
          // Alert.alert('Error For dashboard Data: ', err);
          // showError(err);
          alert('internet error');
        });
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  // recentView

  const renderItemRecentView = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Working');
        let id = {id: item.id, type: 'recentView'};
        // Navigation.navigate('Settings', id);
        console.log(item);
        if (item.type == 'video') {
          let idvideo = {id: item.id, type: item.type};
          Navigation.navigate('Settings', idvideo);
        } else {
          let id = {id: item.id, type: item.type};
          Navigation.navigate('Demo', id);
        }
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
  );

  return (
    <>
      <SafeArea>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
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
              ]}
              {...panResponder.panHandlers}>
              <View style={{paddingBottom: 70}}>
                <View style={styles.line} />
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  // {...panResponder.panHandlers}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Recent View
                        </Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <FlatList
                        data={data.recentView}
                        renderItem={renderItemRecentView}
                        keyExtractor={item => item.id}
                        extraData={data.recentView?.length}
                        contentContainerStyle={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        style={{width: '100%'}}
                        horizontal
                        initialNumToRender={0}
                        scrollEnabled
                        nestedScrollEnabled
                      />
                    </View>
                    {data.recentView?.length == 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          No Data
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Images
                        </Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>

                      <View style={{marginVertical: '5%'}}>
                        <Pressable
                          onPress={() => {
                            Navigation.navigate('InsideDetail', {
                              type: 'images',
                            });
                            console.log('press');
                          }}>
                          <Ionicons
                            name={'arrow-forward'}
                            size={20}
                            color={'black'}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}>
                      <FlatList
                        data={data.images}
                        renderItem={renderItemImages}
                        keyExtractor={item => item.length}
                        extraData={data.images?.length}
                        contentContainerStyle={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        style={{width: '100%'}}
                        horizontal
                        initialNumToRender={0}
                        scrollEnabled
                        nestedScrollEnabled
                      />
                    </View>
                    {data.images?.length == 0 && (
                      <Pressable
                        onPress={() => {
                          console.log('working');
                        }}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: 'grey',
                            paddingVertical: 15,
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            No Data
                          </Text>
                        </View>
                      </Pressable>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      {...panResponder.panHandlers}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Mobile Images
                        </Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>
                      <View style={{marginVertical: '5%'}}>
                        <Pressable
                          {...panResponder.panHandlers}
                          onPress={() => {
                            Navigation.navigate('InsideDetail', {
                              type: 'mobileImages',
                            });
                            console.log('press');
                          }}>
                          <Ionicons
                            name={'arrow-forward'}
                            size={20}
                            color={'black'}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <FlatList
                      data={data.mobileImages}
                      renderItem={renderItemMobileImages}
                      keyExtractor={item => item.id}
                      extraData={data.mobileImages?.length}
                      contentContainerStyle={{
                        width: '100%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      style={{width: '100%'}}
                      horizontal
                      initialNumToRender={0}
                      scrollEnabled
                      nestedScrollEnabled
                    />
                    {data.mobileImages?.length == 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          No Data
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>Pdf</Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignSelf: 'center',
                        }}>
                        <View style={{marginVertical: '5%'}}>
                          <Pressable
                            onPress={() => {
                              Navigation.navigate('InsideDetail', {
                                type: 'pdf',
                              });
                              console.log('press');
                            }}>
                            <Ionicons
                              name={'arrow-forward'}
                              size={20}
                              color={'black'}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <FlatList
                        data={data.pdf}
                        renderItem={renderItemPdf}
                        keyExtractor={item => item.id}
                        extraData={data.pdf?.length}
                        contentContainerStyle={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        style={{width: '100%'}}
                        horizontal
                        initialNumToRender={0}
                        scrollEnabled
                        nestedScrollEnabled
                      />
                    </View>
                    {data.pdf?.length == 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          No Data
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>PPT</Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>
                      <View style={{marginVertical: '5%'}}>
                        <Pressable
                          onPress={() => {
                            Navigation.navigate('InsideDetail', {
                              type: 'ppt',
                            });
                            console.log('press');
                          }}>
                          <Ionicons
                            name={'arrow-forward'}
                            size={20}
                            color={'black'}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <FlatList
                        data={data.ppt}
                        renderItem={renderItemPpt}
                        keyExtractor={item => item.id}
                        extraData={data.ppt?.length}
                        contentContainerStyle={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        style={{width: '100%'}}
                        horizontal
                        initialNumToRender={0}
                        scrollEnabled
                        nestedScrollEnabled
                      />
                    </View>
                    {data.ppt?.length == 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          No Data
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Video
                        </Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          All Digital SOP Guide
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            marginVertical: '5%',
                          }}>
                          <Pressable
                            onPress={() => {
                              Navigation.navigate('InsideDetail', {
                                type: 'video',
                              });
                              console.log('Press');
                            }}
                            style={{padding: 5}}>
                            <Ionicons
                              name={'arrow-forward'}
                              size={20}
                              color={'black'}
                              style={{padding: 5}}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <FlatList
                        data={data.video}
                        renderItem={renderItemVideo}
                        keyExtractor={item => item.id}
                        extraData={data.video?.length}
                        contentContainerStyle={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}
                        style={{width: '100%'}}
                        horizontal
                        initialNumToRender={0}
                        scrollEnabled
                        nestedScrollEnabled
                      />
                    </View>
                    {data.video?.length == 0 && (
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: 'grey',
                          paddingVertical: 15,
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          No Data
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
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
    // backgroundColor: 'pink',
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
    // backgroundColor: 'pink',
    // elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  line: {
    height: 1,
    width: '20%',
    alignItems: 'center',
    backgroundColor: '#CFCFCF',
    marginVertical: 10,
    height: 10,
    // marginHorizontal:'40%',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
