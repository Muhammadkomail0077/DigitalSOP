// import React from 'react';
// import {View} from 'react-native';
// import {Button, Text} from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
// import { getDataFromAsyncStorage, setDataToAsyncStorage } from '../../Utils/getAndSetDataToAsynStorage';
// import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
// import { showError, showSuccess } from '../../Utils/PopupFunctions';
// import { useDispatch } from 'react-redux';

// export const FaceBookAuth = () => {
//   const dispatch = useDispatch();

//   const onFacebookButtonPress = async () => {
//     // Attempt login with permissions
//     const result = await LoginManager.logInWithPermissions([
//       'public_profile',
//       'email',
//     ]);

//     if (result.isCancelled) {
//       throw 'User cancelled the login process';
//     }

//     // Once signed in, get the users AccesToken
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       throw 'Something went wrong obtaining access token';
//     }

//     // Create a Firebase credential with the AccessToken
//     const facebookCredential = auth.FacebookAuthProvider.credential(
//       data.accessToken,
//     );

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(facebookCredential);
//   };

//   return (
//     <View>
//       <Button
//         mode="contained"
//         onPress={() => {
//           onFacebookButtonPress()
//             .then(res => {
//               console.log('Response: ', res);
//               setDataToAsyncStorage('user', JSON.stringify(res));
//               getDataFromAsyncStorage('user')
//               .then(res => {
//                 console.log('Response: ', res);
//                 showSuccess(`Successfully Done`)
//                 dispatch(userDataFromAsyncStorage(JSON.parse(res)));
//               })
//               .catch(error => {
//                 console.log('error:', error)
//                 showError(`Error:${error}`);
//               })
//             })
//             .catch(err => {
//               console.log('Error :', err);
//               showError(`Error:${err}`);
//             });
//         }}>
//         Facebook Login
//       </Button>
//     </View>
//   );
// };
