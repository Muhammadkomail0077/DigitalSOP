import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../../Screens/Home';
import { Notifications } from '../../Screens/Notifications';
import { Profile } from '../../Screens/Profile';
import { Settings } from '../../Screens/Settings';
import SimpleBottomTab from '../SimpleBottomScreen';
import CurveBottomBar from '../CurveBottomScreen';
import { Login } from '../../Screens/Login';
import { AddMessage } from '../../Screens/AddMessage';
import { AddMoreDetail } from '../../Screens/AddMoreDetail';
import { Camra } from '../../Screens/Camra';
import { Demo } from '../../Screens/InsideSOP';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromAsyncStorage } from '../../Utils/getAndSetDataToAsynStorage';
import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import { InsideDetail } from '../../Screens/InsideDetail';
import CustomBottomSheet from '../../Components/CustomBottomSheet'
import { ForgetPassword } from '../../Screens/ForgetPassword';
import { VerifyEmail } from '../../Screens/VerifyEmail';
import { ResetPassword } from '../../Screens/ResetPassword';

const Stack = createStackNavigator();


export default function StackNavigator() {


  const dispatch = useDispatch();
  React.useEffect(() => {
    getDataFromAsyncStorage('user')
      .then(res => {
        console.log('Response From  async Storage in App.js:', JSON.parse(res));
        dispatch(userDataFromAsyncStorage(JSON.parse(res)));
      })
      .catch(error => console.log('Error From  async Storage :', error));
  }, []);

  const reducerData = useSelector(state => state);
  const { AuthReducer } = reducerData;
  const [userData, setUserData] = React.useState({});

  console.log('authReducer', AuthReducer);
  React.useEffect(() => {
    if (AuthReducer.userData) {
      setUserData(AuthReducer.userData);
    } else {
      setUserData(null);
    }
  }, [AuthReducer]);
  console.log(userData);

  if (!userData.token) return <IsNotUser />;

  return <IsUser />;
}


function IsNotUser() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function IsUser() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="CurveBottomBar" component={CurveBottomBar} />
          <Stack.Screen name="CustomBottomSheet" component={CustomBottomSheet} />
          <Stack.Screen name="InsideDetail" component={InsideDetail} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Camra" component={Camra} />
          <Stack.Screen name="AddMessage" component={AddMessage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SimpleBottomTab" component={SimpleBottomTab} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddMoreDetail" component={AddMoreDetail} />
          <Stack.Screen name="Demo" component={Demo} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}