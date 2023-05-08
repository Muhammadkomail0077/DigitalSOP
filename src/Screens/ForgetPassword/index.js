import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, Image, ImageBackground, ScrollView, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useNavigation} from '@react-navigation/native';
import {postRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';
import {
  getDataFromAsyncStorage,
  setDataToAsyncStorage,
} from '../../Utils/getAndSetDataToAsynStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';

export const ForgetPassword = () => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
  });

  const {AuthReducer} = useSelector(state => state);

  console.log('AuthReducer: ', AuthReducer.userData);

  const simpleLogin = value => {
    console.log('Values: ', value);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: value.email.toLowerCase(),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setLoading(true);
    fetch(`${BASE_URL}/user/forget-password`, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log('res: ', res.status);
        if (res.status === 1) {
          setLoading(false);
          Alert.alert('Success', 'Successfully Code Sent to the Email');
          Navigation.navigate('VerifyEmail', {
            email: value.email.toLowerCase(),
          });
        } else {
          alert('No user Found');
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        alert('Please check your intenet connections');
      });
  };

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  return (
    <>
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
            {loading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : (
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{}}>
                    <Image
                      source={require('../../Assets/Images/Login/profileFront.jpg')}
                      style={{width: '100%', height: 300}}
                    />
                  </View>
                  <View style={{backgroundColor: '#95A4C1'}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                        paddingBottom: '50%',
                      }}>
                      <View style={{marginHorizontal: '4%'}}>
                        <View>
                          <Heading
                            Stylefont={'normal'}
                            Fontweight={'700'}
                            Fontsize={18}
                            txtAlign={'center'}
                            p={10}
                            lh={40}
                            Heading={'Forget Password'}
                          />
                        </View>
                        <View>
                          <View style={{marginVertical: '5%'}}>
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
                            btnText={'Forget Password'}
                            justify={'center'}
                            align={'center'}
                            fontSize={16}
                            radius={15}
                            txtwidth={'100%'}
                            txtColor={COLORS.white}
                            color={
                              isValid ? COLORS.darkMode : COLORS.border_color
                            }
                            enable={!isValid}
                            press={handleSubmit}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              color: COLORS.dark,
                              alignContent: 'center',
                              alignSelf: 'center',
                            }}>
                            Want to canceal it ?
                          </Text>
                          <ButtonComp
                            mode={'text'}
                            btnText={'Login'}
                            fontStyle={'bold'}
                            fontSize={11}
                            txtColor={'#6BB5FD'}
                            // color='red'
                            press={() => {
                              Navigation.navigate('login');
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}
          </SafeArea>
        )}
      </Formik>
    </>
  );
};
