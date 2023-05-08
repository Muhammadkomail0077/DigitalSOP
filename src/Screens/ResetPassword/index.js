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

export const ResetPassword = ({route}) => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigation = useNavigation();

  const token = route.params;

  console.log('token:', token.token);

  let loginValidationScheme = yup.object().shape({
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });



  const {AuthReducer} = useSelector(state => state);

  console.log('AuthReducer: ', AuthReducer.userData);

  const simpleLogin = value => {
    console.log('Values: ', value);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token.token}`);

    var raw = JSON.stringify({
      password: value.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setLoading(true);
    fetch(`${BASE_URL}/user/reset-password`, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log('res: ', res);
        setLoading(false);
        Alert.alert('Successfull', 'Successfully Change password');
        Navigation.navigate('login');
      })
      .catch(error => {
        setLoading(false);
        alert('Please check your intenet connebtions');
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
                        paddingBottom: '12%',
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
                            Heading={'Reset Password'}
                          />
                        </View>
                        <View>
                          <View style={{marginVertical: '2%'}}>
                            <Input
                              iconFunction={() => setPassHide(!passHide)}
                              rightIcon={true}
                              IconName={
                                passHide ? 'eye-outline' : 'eye-off-outline'
                              }
                              Onchange={handleChange('password')}
                              Onblur={handleBlur('password')}
                              Value={values.password}
                              Pass={passHide ? false : true}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="Password"
                            />
                            {errors.password && touched.password && (
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: 'red',
                                  marginTop: 5,
                                  marginBottom: 5,
                                  marginLeft: 15,
                                }}>
                                {errors.password}
                              </Text>
                            )}
                          </View>

                          <View style={{marginVertical: '2%'}}>
                            <Input
                              iconFunction={() => setPassHide(!passHide)}
                              rightIcon={true}
                              IconName={
                                passHide ? 'eye-outline' : 'eye-off-outline'
                              }
                              Onchange={handleChange('confirmPassword')}
                              Onblur={handleBlur('confirmPassword')}
                              Value={values.confirmPassword}
                              Pass={passHide ? false : true}
                              outline={COLORS.border_color}
                              mode={'outlined'}
                              label="confirmPassword"
                            />
                            {errors.confirmPassword &&
                              touched.confirmPassword && (
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: 'red',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 15,
                                  }}>
                                  {errors.confirmPassword}
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
                            btnText={'Reset Password'}
                            justify={'center'}
                            align={'center'}
                            fontSize={16}
                            radius={5}
                            txtwidth={'100%'}
                            txtColor={COLORS.white}
                            color={
                              isValid ? COLORS.darkMode : COLORS.border_color
                            }
                            enable={!isValid}
                            press={handleSubmit}
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
