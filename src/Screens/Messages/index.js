import React from 'react';
import {FlatList, Pressable, ScrollView, View} from 'react-native';
import MessageList from '../../Components/MessageList';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {Searchbar} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
import {Divider} from 'react-native-paper';

function Messages({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const dummyMsg = [
    {
      avatar: require('../../Assets/Images/avatar.png'),
      userName: 'Emelia & Lara',
      chatUser: 'Emelia',
      recentMsg: 'Hey! How are you long time no meetup?',
      color: 'red',
      messageAgo: '20 min',
      unread: true,
      unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/5.png'),
      userName: 'Abigalla | Lara',
      chatUser: 'Lara',
      recentMsg: 'Typing ...',
      color: 'orange',
      messageAgo: '20 min',
      unread: false,
      //   unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/3.png'),
      userName: 'Emelia & Lara',
      chatUser: 'Emelia',
      recentMsg: 'Nice to meet you',
      messageAgo: '20 min',
      color: COLORS.primary,
      unread: true,
      unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/4.png'),
      userName: 'Emelia & Lara',
      chatUser: 'Jamie',
      recentMsg: 'Great I will write later',
      messageAgo: '20 min',
      color: 'blue',
      unread: true,
      unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/1.png'),
      userName: 'Emelia & Lara',
      chatUser: 'You',
      recentMsg: 'Hey! How are you long time no meetup?',
      color: COLORS.txt_color,
      messageAgo: '50 min',
      unread: false,
      //   unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/2.png'),
      userName: 'John & Emmi',
      chatUser: 'John',
      recentMsg: 'Hey! What’s up, long time..',
      messageAgo: '20 min',
      color: 'red',
      unread: false,
      //   unreadMsg: '5',
    },
    {
      avatar: require('../../Assets/Images/5.png'),
      userName: 'Emelia & Lara',
      chatUser: 'Emelia',
      recentMsg: 'Hey! How are you long time no meetup?',
      messageAgo: '20 min',
      color: 'blue',
      unread: true,
      unreadMsg: '2',
    },
  ];

  return (
    <SafeArea>
      <ScrollView>
        <View
          style={{
            margin: '4%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <ButtonComp
              mode={'outlined'}
              justify={'center'}
              align={'center'}
              btnHeight={65}
              icon={'chevron-back'}
              radius={15}
              // rightMargin={'5%'}
              // leftMargin={'5%'}
              // topMargin={'5%'}
              Borderwidth={1}
              press={() => navigation.goBack()}
            />
            <Heading
              Stylefont={'normal'}
              Fontweight={'700'}
              Fontsize={27}
              txtAlign={'center'}
              ml={'3%'}
              p={10}
              Heading={'Messages'}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                backgroundColor: COLORS.bgcolor,
                borderRadius: 15,
                elevation: 2,
              }}
            />
          </View>
          <FlatList
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            data={dummyMsg}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginTop: 30,
                    // alignSelf: 'center',
                  }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('chat', {
                        userName: item.userName,
                        avatar: item.avatar,
                      })
                    }>
                    <MessageList
                      avatar={item.avatar}
                      userName={item.userName}
                      chatUser={item.chatUser}
                      msg={item.recentMsg}
                      ago={item.messageAgo}
                      unread={item.unread}
                      unreadMsg={item.unreadMsg}
                      color={item.color}
                    />
                  </Pressable>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: 20,
                    }}>
                    <Divider
                      style={{
                        width: '90%',
                        borderColor: COLORS.border_color,
                        shadowColor: COLORS.dark,
                        borderWidth: 1,
                      }}
                    />
                  </View>
                </View>

                // <View
                //   style={{
                //     flexGrow: 1,
                //     alignItems: 'center',
                //   }}>
                //   <FriendsCard bgImg={item.bgImg} para={item.name} />
                // </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
}

export default Messages;