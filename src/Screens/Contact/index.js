import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, List, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../App/api';
import {postRequest, postRequestWithToken} from '../../App/fetch';
import COLORS from '../../Assets/Style/Color';
import DropdownComponent from '../../Components/ReusableComponent/DropDown';

const Contact = () => {
  const [name, setName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [value, setValue] = React.useState('');

  const {AuthReducer} = useSelector(state => state);

  console.log('AuthReducer: ', AuthReducer.userData);

  const handleSubmit = async () => {
    if (enable) {
      const data = {
        firstName: name,
        lastName: lname,
        email: email,
        mobile: mobile,
        discription: value,
        site: valueSite,
        issue: valueOption,
        type: 'mobile',
      };
      console.log('data:', data);

      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);
      postRequestWithToken(
        `${BASE_URL}/user/contactUs`,
        data,
        `Bearer ${AuthReducer?.userData.token}`,
      )
        .then(res => {
          console.log('Response For dashboard Data:', res);
          setLoading(false);
          alert(res.message);
          setName('');
          setLName('');
          setEmail('');
          setMobile('');
          setValue('');
          setValueSite('');
          setValueOption('');
        })
        .catch(err => {
          setLoading(false);
          alert(err);
        });
    } else {
      Alert.alert('Missing', 'Please Complete the form');
    }
  };

  const dataSite = [
    {label: 'Admin', value: 'Admin'},
    {label: 'User', value: 'User'},
  ];

  const dataOption = [
    {label: 'Technical', value: 'Technical'},
    {label: 'Network Problem', value: 'networkProblem'},
  ];

  const [valueSite, setValueSite] = useState(null);
  const [valueOption, setValueOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (name == '' || name == undefined) {
    } else {
      if (lname == '' || lname == undefined) {
      } else {
        if (email == '' || email == undefined) {
        } else {
          if (mobile == '' || mobile == undefined) {
          } else {
            if (value == '' || value == undefined) {
            } else {
              if (valueSite == '' || valueSite == undefined) {
              } else {
                if (valueOption == '' || valueOption == undefined) {
                } else {
                  setEnable(true);
                  console.log('enable', enable);
                }
              }
            }
          }
        }
      }
    }
  }, [name, lname, email, mobile, value, valueSite, valueOption]);
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }
  return (
    // <SafeAreaView>
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#f6f6f6', marginBottom: 100}}>
        <View style={styles.headerBox}>
          <Image
            style={styles.imgStyle}
            source={require('../../Assets/Images/contact/contact.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.box}>
          <TextInput
            label="First Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={lname}
            onChangeText={setLName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Mobile No"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
          <View style={{marginVertical: '1%', marginRight: '15%'}}>
            <DropdownComponent
              data={dataSite}
              defaultValue={'Site'}
              value={valueSite}
              setValue={setValueSite}
            />
          </View>
          <View style={{marginVertical: '1%', marginRight: '15%'}}>
            <DropdownComponent
              data={dataOption}
              defaultValue={'Select Options'}
              value={valueOption}
              setValue={setValueOption}
            />
          </View>
          <TextInput
            label="Type your message here"
            value={value}
            onChangeText={text => setValue(text)}
            multiline
            numberOfLines={5}
            style={styles.textInput}
          />
          <Button
            style={{
              backgroundColor: enable == false ? '#d3d3d3' : COLORS.dark,
              color: COLORS.white,
              width: '85%',
              marginTop: '4%',
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
          </Button>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f6f6f6',
  },
  imgStyle: {
    height: 100,
    width: '60%',
    borderRadius: 50,
  },
  box: {
    height: 650,
    width: '100%',
    backgroundColor: '#f0eef3',
    marginTop: '5%',
    borderRadius: 55,
    paddingLeft: '13%',
    paddingTop: '6%',
  },
  input: {
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
    width: '85%',
  },
  textInput: {
    backgroundColor: '#fff',
    width: '85%',
    height: 120,
  },
});

export default Contact;
