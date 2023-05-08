import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Heading from '../../Components/ReusableComponent/Heading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../Assets/Style/Color';
import {useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';

export const Profile = () => {
  const Navigation = useNavigation();

  const [state, setState] = useState('up');

  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
    console.log('press');
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: '#EFF1FD',
        }}>
        {/* Header */}
        <View
          style={{
            margin: '7%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{backgroundColor: 'white', padding: '2%', borderRadius: 25}}>
            <Pressable
              onPress={() => {
                Navigation.navigate('CurveBottomBar');
              }}>
              <Ionicons name={'arrow-back'} size={25} color={'black'} />
            </Pressable>
          </View>
          <Heading
            Stylefont={'normal'}
            Fontweight={'700'}
            Fontsize={14}
            Heading={'Digital-SOP'}
            txtAlign={'center'}
            as={'center'}
            c={COLORS.dark}
          />
          <Text></Text>
        </View>

        {/* Center */}
        <View
          style={{
            backgroundColor: '#6C7BC8',
            marginHorizontal: '7%',
            padding: '3%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{paddingTop: '5%'}}>
            <Image
              source={require('../../Assets/Images/ProfileImage/profileIcon.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: COLORS.white, fontSize: 11}}>
              {AuthReducer.userData.user.name}
            </Text>
            <Text style={{color: COLORS.white, fontSize: 11}}>
              {AuthReducer.userData.user.email}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <View>
              <Pressable
                onPress={() => {
                  state == 'up' ? setState('down') : setState('up');
                  console.log(state);
                }}>
                <Ionicons
                  name={state == 'up' ? 'arrow-forward' : 'arrow-down-sharp'}
                  size={20}
                  color={'white'}
                  style={{
                    marginTop: 50,
                    padding: 5,
                    backgroundColor: '#7886D3',
                    borderRadius: 25,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Bottom */}

        {state == 'up' ? (
          <>
            <View
              style={{
                backgroundColor: '#F7F8FF',
                margin: '7%',
                padding: '5%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <View>
                  <MaterialCommunityIcons
                    name={'database'}
                    size={20}
                    color={'black'}
                    style={{
                      backgroundColor: '#E1E6FF',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      padding: '5%',
                      borderRadius: 15,
                    }}
                  />
                </View>
                <View style={{paddingVertical: '10%'}}>
                  <Text style={{fontSize: 10, alignSelf: 'center',color:'black'}}>
                    QUIZES
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  Navigation.navigate('Notifications');
                }}>
                <View>
                  <View>
                    <AntDesign
                      name={'questioncircleo'}
                      size={20}
                      color={'black'}
                      style={{
                        backgroundColor: '#E1E6FF',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        padding: '5%',
                        borderRadius: 15,
                      }}
                    />
                  </View>
                  <View style={{paddingVertical: '10%'}}>
                    <Text style={{fontSize: 10, alignSelf: 'center',color:'black'}}>FAQ</Text>
                  </View>
                </View>
              </Pressable>

              <View>
                <View>
                  <MaterialIcons
                    name={'report'}
                    size={20}
                    color={'black'}
                    style={{
                      backgroundColor: '#E1E6FF',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      padding: '5%',
                      borderRadius: 15,
                    }}
                  />
                </View>
                <View style={{paddingVertical: '10%'}}>
                  <Text style={{fontSize: 10, alignSelf: 'center',color:'black'}}>
                    Reports
                  </Text>
                </View>
              </View>

              <View>
                <View>
                  <Ionicons
                    name={'settings-outline'}
                    size={20}
                    color={'black'}
                    style={{
                      backgroundColor: '#E1E6FF',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      padding: '5%',
                      borderRadius: 15,
                    }}
                  />
                </View>
                <View style={{paddingVertical: '10%'}}>
                  <Text style={{fontSize: 10, alignSelf: 'center',color:'black'}}>
                    Setting
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                margin: '7%',
                padding: '5%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
              }}>
              {/* <Text>Down</Text> */}
              <Formik
                initialValues={{email: '', password: ''}}
                validateOnMount={true}
                onSubmit={values => {
                  simpleLogin(values);
                  // console.log("values",values);
                }}
                validationSchema={loginValidationScheme}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <SafeArea>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        {/* Header 1 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Heading
                            Stylefont={'normal'}
                            Fontweight={'700'}
                            Fontsize={10}
                            Heading={'Personal Detail'}
                            txtAlign={'center'}
                            as={'center'}
                            c={COLORS.dark}
                          />
                          <View>
                            <Pressable
                              onPress={() => {
                                console.log('press');
                              }}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  alignSelf: 'center',
                                  color: '#6BB5FD',
                                }}>
                                Edit
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                        {/* Sub Header 1 */}
                        <View
                          style={{
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}>
                          <Image
                            source={require('../../Assets/Images/ProfileImage/photoOfPerson.png')}
                            style={{width: 60, height: 60}}
                            resizeMode={'cover'}
                          />
                        </View>
                        {/* center Inputs */}
                        <View>
                          <View style={{marginVertical: '3%'}}>
                            <Input
                              Onchange={handleChange('name')}
                              Onblur={handleBlur('name')}
                              Value={values.name}
                              // Keyboard={'name'}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="Name"
                            />
                            {errors.name && touched.name && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.name}
                              </Text>
                            )}
                          </View>
                          <View style={{marginVertical: '3%'}}>
                            <Input
                              Onchange={handleChange('email')}
                              Onblur={handleBlur('email')}
                              Value={values.email}
                              Keyboard={'email-address'}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="Email address"
                            />
                            {errors.email && touched.email && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.email}
                              </Text>
                            )}
                          </View>
                          <View style={{marginVertical: '3%'}}>
                            <Input
                              Onchange={handleChange('phoneNumber')}
                              Onblur={handleBlur('phoneNumber')}
                              Value={values.phoneNumber}
                              Keyboard={'number'}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="Phone Number"
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.phoneNumber}
                              </Text>
                            )}
                          </View>
                          <View style={{marginVertical: '3%'}}>
                            <Input
                              Onchange={handleChange('role')}
                              Onblur={handleBlur('role')}
                              Value={values.role}
                              // Keyboard={'role'}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="Role"
                            />
                            {errors.role && touched.role && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.role}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'row',
                            marginVertical: '4%',
                          }}>
                          <ButtonComp
                            btnwidth={'97%'}
                            btnHeight={56}
                            btnText={'Save'}
                            justify={'center'}
                            align={'center'}
                            fontSize={16}
                            radius={20}
                            txtwidth={'100%'}
                            txtColor={COLORS.white}
                            color={COLORS.darkMode}
                            press={handleSubmit}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </SafeArea>
                )}
              </Formik>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
