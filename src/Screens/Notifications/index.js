import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ScrollView} from 'react-native-gesture-handler';
import {BASE_URL} from '../../App/api';
import {getRequest} from '../../App/fetch';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-svg';

export const Notifications = () => {
  const [text, onChangeText] = React.useState('Search Questions ');
  const [newText, onText] = useState('Type Messege');
  const [firstSignShow, setFirstSignShow] = useState(true);

  
  const Navigation = useNavigation();
  
  const greaterthaSgn = '>';
  
  const {AuthReducer} = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('Bearer ' + AuthReducer?.userData.token);
      setLoading(true);
      getRequest(`${BASE_URL}/faq`, `Bearer ${AuthReducer?.userData.token}`)
        .then(res => {
          console.log('Response For Notificaton Data:', res);
          setLoading(false);
          if (res.success) {
            setData(res.data);
            console.log('Data from api Notificaton: ', data);
          }
        })
        .catch(err => {
          console.log('Error For Notificaton Data: ', err);
          showError(err);
          setLoading(false);
        });
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  const renderItem = ({item}) => (
    <View
      style={{
        height: 640,
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 66,
        borderTopRightRadius: 23,
        borderTopLeftRadius: 23,
      }}>
      <View></View>
      <View style={styles.paragraph}>
        <View style={styles.thorowcorner}>
          <Text style={styles.secondParagraph}>{item.question}</Text>
          <Text
            style={styles.sign}
            onPress={() => {
              setFirstSignShow(!firstSignShow);
            }}>
            {firstSignShow ? (
              greaterthaSgn
            ) : (
              <Text style={styles.newText}>&#8964;</Text>
            )}
          </Text>
          {!firstSignShow ? (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: 'blue',
                width: 250,
                borderRadius: 8,
                padding: 8,
                marginTop: 20,
                marginLeft: 26,
              }}>
              <Text style={{fontSize: 12}}>{item.answer}</Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          marginTop: -30,
        }}>
        <Text style={styles.faq}>FAQ</Text>
        <View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '12%',
                  marginLeft: 13,
                  padding: '2%',
                  borderRadius: 25,
                }}>
                <Pressable>
                  <Ionicons
                    name={'arrow-back'}
                    size={25}
                    color={'black'}
                    onPress={() => {
                      Navigation.navigate('CurveBottomBar');
                    }}
                  />
                </Pressable>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={data.length}
            contentContainerStyle={{
              width: '100%',
              flexDirection: 'row',
            }}
            style={{width: '100%'}}
            horizontal={true}
            initialNumToRender={0}
          />
          {data.length == 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'grey',
                paddingVertical: 15,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>No Data</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 20,
    marginTop: 30,
    marginLeft: 15,
    width: 310,
    padding: 10,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 8,
    borderBottomColor: 'black',
  },
  paragraph: {
    marginTop: 7,
  },
  firstParagraph: {
    color: 'gray',
    marginTop: 37,
    marginLeft: 30,
  },
  secondParagraph: {
    color: 'gray',
    marginTop: 37,
    marginLeft: 30,
  },
  thirdParagraph: {
    color: 'gray',
    marginTop: 37,
    marginLeft: 30,
  },
  fourthParagraph: {
    color: 'gray',
    marginTop: 37,
    marginLeft: 30,
  },
  fifthparagraph: {
    color: 'gray',
    marginTop: 37,
    marginLeft: 30,
  },
  inputStyle: {
    height: 100,
    width: 270,
    marginTop: 0,
    marginLeft: 30,
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
  textareaText: {
    marginLeft: 12,
    marginTop: -20,
    height: 150,
    borderBottm: 1,
    borderColor: 'black',
    backgroundColor: '#fff',
    color: 'black',
  },
  thorowcorner: {
    position: 'relative',
  },
  sign: {
    color: 'gray',
    fontSize: 25,
    position: 'absolute',
    right: 25,
    top: 30,
  },
  extra: {
    fontSize: 28,
    marginTop: -7,
  },
  newText: {
    fontSize: 25,
    color: 'gray',
    fontWeight: 'bold',
  },
  faq: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    // color:'white'
  },
});
