import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Home } from '../../Screens/Home';
import { Notifications } from '../../Screens/Notifications';
import { Profile } from '../../Screens/Profile';
import { Settings } from '../../Screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function SimpleBottomTab({navigation}) {

    const [mark, setMark] = React.useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            let width;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              // width = focused ?
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'calendar-month' : 'calendar-month-outline';
              // mark = focused ? setMark(true):setMark(false)
              // focused ? setMark == true : setMark == false
            } else if (route.name === 'Profile') {
              iconName = focused ? 'cards-heart' : 'cards-heart-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'segment' : 'segment';
            }

            return (
              <View
                style={
                  focused
                    ? {
                        borderTopColor: '#000',
                        borderTopWidth: 2,
                        flex: 1,
                        width: '60%',
                      }
                    : {
                        borderTopColor: '#000',
                        borderTopWidth: 0,
                        flex: 1,
                        width: '60%',
                      }
                }>
                <Icon
                  name={iconName}
                  style={{top: 10, textAlign: 'center'}}
                  size={28}
                  color={focused ? 'blue' : 'grey'}
                />
              </View>
            );
          },
          tabBarActiveTintColor: '#000',
          // tabBarInactiveTintColor: 'coral',
          // tabBarInactiveTintColor: '',
          tabBarShowLabel: false,

          tabBarItemStyle: mark
            && {
                borderTopWidth: 2,
                borderTopColor: 'black',
              }
            

          // headerTintColor:COLORS.primary
        })}>
        <Tab.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Notifications"
          component={Notifications}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    </>
  );
}
