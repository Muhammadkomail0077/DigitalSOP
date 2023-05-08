// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
// import {Button} from 'react-native-paper';
// import { getDataFromAsyncStorage, setDataToAsyncStorage } from '../../Utils/getAndSetDataToAsynStorage';
// import { showError, showSuccess } from '../../Utils/PopupFunctions';
// import { useDispatch } from 'react-redux';
// import { userDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';

// export const GoogleAuth = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '46326222512-7kra5877ikbr3t6jdufv4plfip9cp71d.apps.googleusercontent.com',
//     });
//   }, []);
//   const onGoogleButtonPress = async () => {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//     // Get the users ID token
//     const {idToken} = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   };
//   const dispatch = useDispatch();

//   return (
//     <View>
//       <Button
//         mode="contained"
//         onPress={() => {
//           onGoogleButtonPress()
//           .then(res => {
//             console.log('Response: ', res);
//             setDataToAsyncStorage('user', JSON.stringify(res));
//             getDataFromAsyncStorage('user')
//             .then(res => {
//               console.log('Response: ', res);
//               showSuccess(`Successfully Done`)
//               dispatch(userDataFromAsyncStorage(JSON.parse(res)));
//             })
//             .catch(error => {
//               console.log('error:', error)
//               showError(`Error:${err}`);
//             })
//           })
//           .catch(err => {
//             console.log('Error :', err);
//             showError(`Error:${err}`);
//           });
//         }}>
//         Google Login
//       </Button>
//     </View>
//   );
// };
