import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  Button,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';

export const SharedSOP = () => {
  const Navigation = useNavigation();

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

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
            source={require('../../Assets/Images/sharedSop/backgroundImg.png')}
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
                backgroundColor: '#EFF1FD',
                marginTop: 40,
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                paddingTop: 15,
                marginBottom: 110,
                // paddingBottom:'50%'
              }}>
              <ScrollView>
                <View style={{marginTop: '5%', width: '100%'}}>
                  <View>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{marginVertical: '5%'}}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          Shared With You
                        </Text>
                        <Text style={{fontSize: 10, color: 'black'}}>
                          Shared Digital SOP Guide
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
                      <View
                        style={{borderRadius: 10, width: '45%', margin: '2%'}}>
                        <Image
                          source={require('../../Assets/Images/HomeScreen/itemImg.png')}
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
                          }}>
                          Digital SOP For User Digital SOP For User
                        </Text>
                      </View>
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
