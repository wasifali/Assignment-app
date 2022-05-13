import React from 'react';
import { View, Text, Button, Image, SafeAreaView, StatusBar } from 'react-native';
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { googleSignIn } from '../store/actions/user';
import { navigationRef } from '../navigation/RootNavigation';
import { useDispatch } from "react-redux";
import { images } from '../utils/images';
import Applogo from '../components/Applogo/Applogo';



const Auth = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E', paddingTop: 50 }}>
            <StatusBar backgroundColor="#1E1E1E" />
            <View style={{ height: 150 }} />
            <Applogo
                imagePath={images.APP_LOGO}
            />
            <View style={{ paddingTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                <GoogleSigninButton
                    size={1}
                    onPress={() => {
                        dispatch(googleSignIn())
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
//
export default Auth;