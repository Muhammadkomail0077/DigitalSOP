import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import BottomSheet from '../../Components/ReusableComponent/BottomSheet';
import {Alert, Modal, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import Video from 'react-native-video';
import {FlatList} from 'react-native-gesture-handler';
import {postRequestWithFormData} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const AddMessage = ({route}) => {
  const Navigation = useNavigation();
  const videoRef = useRef();

  const detail = route.params;
  console.log('Detail in Add message: ', detail);

  const {AuthReducer} = useSelector(state => state);

  console.log('reducerData: ', AuthReducer.userData);

  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setData(detail);
  }, [detail]);

  console.log('data: ', data);

  const newArray = data.map((obj, index) => {
    if (index === 0) {
      return {file: obj.filename}; // return the object at the first index
    } else if (index === 1 || index >= 1) {
      return {file: obj.filename}; // create a new object with a modified name property
    } else {
      // return null; // return null for all other indices
    }
  });

  console.log('newArray: ', newArray);
  const formData = new FormData();

  const [loading, setLoading] = useState(false);

  const firstSubmit = () => {
    if (data[data.length - 1].notes == '') {
      if (description == '') {
        Alert.alert('Missing', 'Please Enter the description');
      } else {
        submitDataToFormData();
      }
    } else {
      submitDataToFormData();
      // const updatedData = data.map(item => ({
      //   ...item,
      //   notes: description,
      // }));
      // console.log('updatedData: ', updatedData);

      // newArray.forEach((obj, index) => {
      //   Object.keys(obj).forEach(key => {
      //     const value = obj[key];
      //     formData.append(`file`, value);
      //   });
      // });
      // console.log('formData: ', formData); // Output: FormData object containing the keys and values from the array of objects

      // setLoading(true);
      // postRequestWithFormData(
      //   `${BASE_URL}/files/upload`,
      //   formData,
      //   `Bearer ${AuthReducer?.userData.token}`,
      // )
      //   .then(res => {
      //     setLoading(false);
      //     console.log('response from api submit data', res);
      //     alert('Your data is uploaded successfully');
      //     // Navigation.navigate('CurveBottomBar')
      //   })
      //   .catch(err => {
      //     setLoading(false);
      //     console.log('Error from sending', err);
      //     Alert.alert(
      //       'Network Request Fail',
      //       'something went wrong please check the internet connection',
      //     );
      //   });

      // Navigation.navigate('AddMoreDetail', updatedData);
      //   console.log('Not Empty');
    }
  };

  const submitDataToFormData = () => {
    data[data.length - 1].notes = description;
    newArray.forEach((obj, index) => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        console.log('value.substr(-3): ', value.substr(-3));
        if (value.substr(-3) == 'jpg') {
          formData.append(`file`, {
            uri: value,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
        } else {
          formData.append(`file`, {
            uri: value,
            type: 'video/mp4',
            name: 'video.mp4',
          });
        }
      });
    });
    console.log('formData: ', formData); // Output: FormData object containing the keys and values from the array of objects
    setLoading(true);
    postRequestWithFormData(
      `${BASE_URL}/files/upload`,
      formData,
      `Bearer ${AuthReducer?.userData.token}`,
    )
      .then(res => {
        setLoading(false);
        console.log('response from api submit data', JSON.parse(res));
        // alert('Your data is uploaded successfully');
        let responseData = JSON.parse(res);
        console.log('responseData: ', responseData.data);

        data.forEach((file, index) => {
          file.filename = responseData.data[index];
        });

        console.log('newData after changing from api: ', data);
        Navigation.navigate('AddMoreDetail', data);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error from sending', err);
        Alert.alert(
          'Network Request Fail',
          'something went wrong please check the internet connection',
        );
      });
  };

  const openCamera = () => {
    let lastarray = detail[detail.length - 1];
    console.log('lastarray: ', lastarray.sequence);
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log('res: ', res);
      if (res.assets) {
        console.log('Response:', res.assets[0].uri);
        const newDetail = {
          filename: res.assets[0].uri,
          type: 'image',
          sequence: lastarray.sequence + 1,
          notes: '',
        };
        setData([...data, newDetail]);
        console.log('After adding new image data: ', data);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const renderItem = ({item}) => (
    <View
      style={{
        borderRadius: 50,
        width: '100%',
        marginHorizontal: '5%',
        marginVertical: 10,
      }}>
      {item.type == 'image' && (
        <Image
          source={{uri: item.filename}}
          style={{width: '100%', height: 250, borderRadius: 15}}
        />
      )}
      {item.type == 'video' && (
        <Video
          source={{uri: item.filename}}
          ref={videoRef}
          onBuffer={() => {}}
          onError={() => {}}
          style={{width: '100%', height: 210}}
          resizeMode={'contain'}
        />
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  const plusBtn = async () => {
    if (description == '') {
      Alert.alert('Missing', 'Please Enter the description');
    } else {
      data[data.length - 1].notes = description;
      console.log('data after adding description:', data);
      setDescription('');
      setModalVisible(true);
    }
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
                    setModalVisible(!modalVisible);
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
                    setModalVisible(!modalVisible);
                    Navigation.navigate('Camra', data);
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
      <SafeArea>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../Assets/Images/HomeScreen/backImage.png')}
            style={{height: '100%', width: '100%'}}
            resizeMode={'cover'}>
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
                backgroundColor: '#EFF1FD',
                marginTop: 40,
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                paddingTop: 15,
              }}>
              <ScrollView>
                <View style={{marginTop: '5%', marginBottom: '15%'}}>
                  <View style={{paddingHorizontal: '8%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <View style={{marginVertical: '5%'}}>
                        <Pressable
                          onPress={() => {
                            Navigation.navigate('CurveBottomBar');
                          }}>
                          <Text style={{color: 'blue'}}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column', flex: 1}}>
                      {/* <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.url}
                        extraData={data.length} // re-render when data length changes
                      /> */}
                      <View
                        style={{
                          borderRadius: 50,
                          width: '100%',
                          // marginHorizontal: '1%',
                          marginVertical: 10,
                        }}>
                        {data[data.length - 1]?.type == 'image' && (
                          <Image
                            source={{uri: data[data.length - 1].filename}}
                            style={{
                              width: '100%',
                              height: 250,
                              borderRadius: 15,
                            }}
                          />
                        )}
                        {data[data.length - 1]?.type == 'video' && (
                          <Video
                            source={{uri: data[data.length - 1].filename}}
                            ref={videoRef}
                            onBuffer={() => {}}
                            onError={() => {}}
                            style={{width: '100%', height: 210}}
                            resizeMode={'contain'}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      borderBottomColor: '#000000',
                      borderBottomWidth: 1,
                      marginHorizontal: '8%',
                      borderRadius: 15,
                      marginTop: 10,
                    }}>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={40}
                      placeholder={'Enter Description'}
                      placeholderTextColor={'black'}
                      onChangeText={txt => {
                        setDescription(txt);
                      }}
                      style={{color: 'black'}}
                      value={description}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: 30,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'black',
                        alignItems: 'center',
                        padding: '4%',
                        borderRadius: 10,
                        marginHorizontal: '10%',
                      }}>
                      <Pressable
                        onPress={() => {
                          // setModalVisible(true);
                          plusBtn();
                        }}>
                        <Entypo
                          name={'plus'}
                          size={25}
                          color={'white'}
                          style={{marginHorizontal: '2%'}}
                        />
                      </Pressable>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'black',
                        alignItems: 'center',
                        padding: '4%',
                        borderRadius: 10,
                        marginHorizontal: '10%',
                      }}>
                      <Pressable
                        onPress={() => {
                          // Navigation.navigate('AddMoreDetail')
                          firstSubmit();
                        }}>
                        <Ionicons
                          name={'checkmark-outline'}
                          size={25}
                          color={'white'}
                          style={{marginHorizontal: '2%'}}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </SafeArea>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
