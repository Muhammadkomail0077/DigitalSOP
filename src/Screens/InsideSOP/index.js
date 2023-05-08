import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../App/api';
import {getRequest} from '../../App/fetch';

export const Demo = ({route}) => {
  const lessthan = '<';

  const id = route.params;
  const idPdf = route.params;
  const idvideo = route.params;
  console.log('item: ', id);

  const [loading, setLoading] = useState(false);

  const {AuthReducer} = useSelector(state => state);
  console.log('reducerData: ', AuthReducer.userData);

  const [data, setData] = useState([]);

  //   console.log('data.page[0].note: ', data?.page[0]?.notes);

  useEffect(() => {
    if (id) {
      (async () => {
        console.log('Bearer ' + AuthReducer?.userData.token);
        setLoading(true);

        console.log('Inside SOP Working');
        getRequest(
          `${BASE_URL}/user/mobile/details/${id.id}/${id.type}`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside SOP Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              console.log('Data from api Inside SOP: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      })();
    } else if (idPdf) {
      (async () => {
        console.log('Bearer ' + AuthReducer?.userData.token);
        setLoading(true);

        console.log('Inside SOP Working');
        getRequest(
          `${BASE_URL}/user/mobile/details/${idPdf.id}/${idPdf.type}`,
          `Bearer ${AuthReducer?.userData.token}`,
        )
          .then(res => {
            console.log('Response From Inside SOP Data:', res);
            setLoading(false);
            if (res.status == 1) {
              setData(res.data);
              console.log('Data from api Inside SOP: ', data);
            }
          })
          .catch(err => {
            console.log('Error For dashboard Data: ', err);
            alert(err);
            setLoading(false);
          });
      })();
    }
    console.log('data: ', data);
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  const Navigation = useNavigation()

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <View style={styles.parentView}>
          <Pressable onPress={()=>{Navigation.navigate('CurveBottomBar')}}>
            <Text style={styles.textOne}>{lessthan}</Text>
          </Pressable>
          <Text style={styles.textTwo}>
            {data?.doc_name && data?.doc_name}
            {data?.title && data?.title}
          </Text>
          <Text style={styles.textThree}>Report</Text>
        </View>
        <View style={styles.imageCont}>
          <Image
            style={styles.imageStyle}
            resizeMode={'contain'}
            source={require('../../Assets/Images/Demo/living-room-plants.png')}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // marginTop: '9%',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {data?.page && data.page[0].notes}
            {data?.details && data.details}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
  textOne: {
    color: 'black',
    fontSize: 25,
  },
  textTwo: {
    color: 'black',
    fontSize: 20,
    marginTop: '.5%',
  },
  textThree: {
    color: 'blue',
    fontSize: 14,
    marginTop: '1.5%',
  },
  imageCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2%',
  },
  imageStyle: {
    height: 270,
    width: '95%',
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '7%',
    marginBottom: 15,
  },
  btn: {
    backgroundColor: 'black',
    color: 'white',
    paddingRight: '30%',
    paddingLeft: '30%',
    borderRadius: 6,
    paddingTop: '2.4%',
    paddingBottom: '2.4%',
  },
});
