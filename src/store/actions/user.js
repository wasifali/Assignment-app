import { userActionType } from "../actionTypes/userActionType";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { ONBOARDING_SCREEN, WELCOME_SCREEN } from '../../navigation/constant';
import auth from '@react-native-firebase/auth';
import { ToastAndroid, Platform, AsyncStorage } from 'react-native';
import {
  addUserInfo,
  getProfile,
  checkProfile,
  get_FCM_token_and_update_DB,
} from '../../firestore/services';
import { navigationRef } from "../../navigation/RootNavigation";

export const googleSignIn = () => async dispatch => {
  try {

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    GoogleSignin.configure({
      webClientId:
        '762623153364-1tk8drgt3n668cpvbsm5au3uprerc6cg.apps.googleusercontent.com',
    });

    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    ;

    // Sign-in the user with the credential
    const { user, additionalUserInfo, } = await auth().signInWithCredential(googleCredential);
    // console.log('USER: ', additionalUserInfo);

    let isuserExist = await checkProfile(user.uid);

    if (isuserExist == 'new-user') {
      console.log('is-users', isuserExist);
      navigationRef.navigate(ONBOARDING_SCREEN);
    } else {
      navigationRef.navigate(WELCOME_SCREEN);
    }

  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      ToastAndroid.show(
        'Play services not available or outdated',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }

    return error;
  }
};


export const AddUserInfo = (user, userId) => async dispatch => {
  try {
    // dispatch({ type: userActionType.ADD_USER_INFO_LOADING });


    let result = await addUserInfo({
      userName: user.userName,
      age: user.age,
    }, userId);
    //   dispatch({ type: userActionType.ADD_USER_INFO_SUCCESS, payload: 'User Information has been added' });
  } catch (error) {
    // dispatch({ type: userActionType.ADD_USER_INFO_FAILURE, payload: error })
    console.log(error);

  }
};


export const getUserInfo = (uid) => async dispatch => {
  try {
    dispatch({ type: userActionType.GET_USER_INFO_LOADING });
    const results = await getProfile(uid);
    //console.log(results);
    dispatch({ type: userActionType.GET_USER_INFO_SUCCESS, data: results });

  } catch (error) {
    dispatch({ type: userActionType.GET_USER_INFO_SUCCESS, error: error })
  }
};