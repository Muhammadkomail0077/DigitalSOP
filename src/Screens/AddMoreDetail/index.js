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
  FlatList,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import BottomSheet from '../../Components/ReusableComponent/BottomSheet';
import Input from '../../Components/ReusableComponent/Input';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import DropDown from 'react-native-paper-dropdown';
import {List} from 'react-native-paper';
import {postRequestWithToken} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const AddMoreDetail = ({route}) => {
  const Navigation = useNavigation();

  const data = route.params;

  console.log('DataWithDescription in Add More Detail: ', data);

  console.log('thumbnail: ', thumbnail);

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer?.userData?.user?.name);

  const refRBSheet2 = useRef(null);
  const refRBSheet1 = useRef(null);

  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    refRBSheet2.current.open();
  }, []);

  const height = Dimensions.get('window').height;
  const FilterHeight = height * 0.9;

  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [title, setTitle] = useState('');

  console.log('title: ', title);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
    setExpanded(false);
  };
  
  const [enable, setEnable] = useState(false);

  const openGallery = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(option, res => {
      console.log(res);
      if (res.assets) {
        console.log(res.assets[0].uri);
        console.log('library Image');
        console.log(res);
        setThumbnail(res.assets[0].uri);
        console.log('thumbnail in camera btn', thumbnail);
        refRBSheet1.current.close();
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const openCamera = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log(res);
      if (res.assets) {
        console.log(res.assets[0].uri);
        console.log('lCamera Img');
        setThumbnail(res.assets[0].uri);
        console.log('thumbnail in camera btn', thumbnail);
        refRBSheet1.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const videoRef = useRef();

  const renderItem = ({item}) => (
    <View
      style={{
        borderRadius: 50,
        margin: '5%',
        flexDirection: 'row',
      }}>
      {item.type == 'image' && (
        <Image
          source={{uri: item.filename}}
          style={{width: 35, height: 50, borderRadius: 15, marginVertical: 5}}
        />
      )}
      {item.type == 'video' && (
        <Video
          source={{uri: item.filename}}
          ref={videoRef}
          onBuffer={() => {}}
          onError={() => {}}
          style={{
            width: 35,
            height: 50,
            borderRadius: 15,
          }}
          resizeMode={'contain'}
        />
      )}
    </View>
  );

  const [loading, setLoading] = useState(false);

  const submitData = () => {
    if (title == '' || title == undefined) {
      alert('Please enter the title');
    } else {
      if (selectedOption == '' || selectedOption == undefined) {
        alert('Please SelectUser');
      } else {
        if (thumbnail == '' || thumbnail == undefined) {
          alert('Please add thumbnail');
        } else {
          console.log('title: ', title);
          console.log('selectedOption: ', selectedOption);
          console.log('thumbnail: ', thumbnail);
          console.log('data: ', data);
          console.log(
            'AuthReducer?.userData?.user?.id: ',
            AuthReducer?.userData?.user?.id,
          );

          const dataSubmit = {
            files: data,
            thumnail: thumbnail,
            doc_name: title,
            users: [AuthReducer?.userData?.user?.id],
          };
          setLoading(true);
          postRequestWithToken(
            `${BASE_URL}/document/mobile_doc`,
            dataSubmit,
            `Bearer ${AuthReducer?.userData.token}`,
          )
            .then(res => {
              setLoading(false);
              console.log('response from api submit data', res);
              alert('Your data is share successfully');
              Navigation.navigate('CurveBottomBar');
            })
            .catch(err => {
              setLoading(false);
              refRBSheet2.current.open();
              console.log('Error from sending', err);
              alert('Something went wront');
            });
        }
      }
    }
  };

  useEffect(() => {
    if (title == '' || title == undefined) {
      //   alert('Please enter the title');
    } else {
      if (selectedOption == '' || selectedOption == undefined) {
        // alert('Please SelectUser');
      } else {
        if (thumbnail == '' || thumbnail == undefined) {
          //   alert('Please add thumbnail');
        } else {
          setEnable(true);
          console.log('enable', enable);
        }
      }
    }
  }, [title, selectedOption, thumbnail]);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  return (
    <>
      <SafeArea>
        <View style={{flex: 1}}>
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
          </ImageBackground>
          <BottomSheet refRBSheets={refRBSheet2} height={FilterHeight}>
            <ScrollView>
              <View style={{marginVertical: '5%'}}>
                <View style={{paddingHorizontal: '8%'}}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={{marginVertical: '5%'}}>
                      <Pressable
                        onPress={() => {
                          Navigation.navigate('CurveBottomBar');
                        }}>
                        <Text style={{color: 'blue'}}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: '9%'}}>
                    <View>
                      {thumbnail ? (
                        <Image
                          source={{uri: thumbnail}}
                          style={{width: 70, height: 70, borderRadius: 20}}
                        />
                      ) : (
                        <Image
                          source={require('../../Assets/Images/addThumbnail/img.png')}
                          style={{width: 70, height: 70}}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ButtonComp
                        btnHeight={55}
                        btnText={'Add Thumbnail'}
                        justify={'center'}
                        align={'center'}
                        fontSize={13}
                        radius={15}
                        txtwidth={'60%'}
                        txtColor={COLORS.white}
                        color={COLORS.darkMode}
                        press={() => {
                          refRBSheet1.current.open();
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <View
                      style={{
                        borderRadius: 50,
                        width: '100%',
                        marginHorizontal: '1%',
                        flexDirection: 'row',
                      }}>
                      <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.url}
                        contentContainerStyle={{flexDirection: 'row'}}
                        extraData={data.length}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: '8%',
                    marginTop: '5%',
                  }}>
                  <Input
                    Onchange={e => {
                      setTitle(e);
                      console.log('title: ', title);
                    }}
                    outline={COLORS.dark}
                    mode={'outlined'}
                    label="D-SOP Title"
                  />
                  <View style={{marginTop: '5%'}}>
                    <List.Section>
                      <List.Accordion
                        style={{
                          backgroundColor: 'white',
                          borderColor: 'blacl',
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                        title={selectedOption ? selectedOption : 'Select User'}
                        expanded={expanded}
                        onPress={handlePress}>
                        <List.Item
                          style={{
                            backgroundColor: 'white',
                            borderColor: 'blacl',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop: 5,
                          }}
                          title={AuthReducer?.userData?.user?.name}
                          onPress={() =>
                            handleOptionPress(AuthReducer?.userData?.user?.name)
                          }
                        />
                      </List.Accordion>
                    </List.Section>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',
                    margin: '8%',
                  }}>
                  <ButtonComp
                    btnwidth={'97%'}
                    btnHeight={56}
                    btnText={'Share'}
                    justify={'center'}
                    align={'center'}
                    fontSize={16}
                    radius={15}
                    txtwidth={'100%'}
                    txtColor={COLORS.white}
                    color={enable == false ? '#d3d3d3' : COLORS.dark}
                    press={() => {
                      submitData();
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </BottomSheet>

          <BottomSheet refRBSheets={refRBSheet1} height={160}>
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
                    openGallery();
                  }}>
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 25,
                      padding: 10,
                    }}>
                    <Icons name="photo-library" color={'#fff'} size={30} />
                  </View>
                </Pressable>
                <Text style={{color: 'black'}}> Gallery</Text>
              </View>
            </View>
          </BottomSheet>
        </View>
      </SafeArea>
    </>
  );
};
