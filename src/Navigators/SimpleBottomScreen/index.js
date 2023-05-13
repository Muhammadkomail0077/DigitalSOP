import * as React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../Screens/Home';
import {Notifications} from '../../Screens/Notifications';
import {Profile} from '../../Screens/Profile';
import {Settings} from '../../Screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SharedSOP} from '../../Screens/SharedSop';
import {Privacy} from '../../Screens/Privacy';
import Contact from '../../Screens/Contact';

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
              iconName = focused ? 'home' : 'home';
              // width = focused ?
            } else if (route.name === 'SharedSOP') {
              iconName = focused
                ? 'ios-share-social-outline'
                : 'ios-share-social-outline';
            } else if (route.name === 'Privacy') {
              iconName = focused ? 'shield-outline' : 'shield-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
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
                <Ionicons
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

          tabBarItemStyle: mark && {
            borderTopWidth: 2,
            borderTopColor: 'black',
          },

          // headerTintColor:COLORS.primary
        })}>
        <Tab.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="SharedSOP"
          component={SharedSOP}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Privacy"
          component={Privacy}
        />
        <Tab.Screen
          options={{headerShown: false}}
          name="Contact"
          component={Contact}
        />
      </Tab.Navigator>
    </>
  );
}
