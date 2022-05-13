import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getProfile } from '../firestore/services';
import { googleSignIn } from './src/store/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import Auth from './Auth';
import InputField from '../components/InputField';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../navigation/RootNavigation';
import { HOME_SCREEN } from '../navigation/constant';
const Welcome = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.user);
    const [errors, setErrors] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        fullname: "",
        age: "",
    });


    //

    useEffect(async () => {
        const userId = auth().currentUser.uid;
        const results = await getProfile(userId);
        setContactInfo({ fullname: results._data.userName, age: results._data.age });
        return results;
    }, []);


    const _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            RootNavigation.navigationRef.navigate(HOME_SCREEN);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={{
            flex: 1, backgroundColor:
                '#1E1E1E'
        }}>
            <View style={{ height: 100, marginHorizontal: 20 }}>
                <Text style={{ color: '#FFF', paddingTop: 20, fontWeight: 'bold' }}>Full Name*</Text>
                <InputField
                    value={contactInfo.fullname}
                    placeholderTextColor="#FFF"
                    name="fullname"
                    style={{
                        borderColor: '#FFF',
                        borderWidth: 1,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: '5%',
                        fontWeight: 'bold',
                        marginVertical: '2%',
                        paddingVertical: '2%',
                        color: '#FFF'
                    }}
                    editable={false}
                    returnKeyType="next"
                />
            </View>

            <View style={{ height: 100, marginHorizontal: 20 }}>
                <Text style={{ color: '#FFF', paddingTop: 20, fontWeight: 'bold' }}>Age*</Text>
                <InputField
                    value={contactInfo.age}
                    placeholderTextColor="#FFF"
                    name="age"
                    style={{
                        borderColor: '#FFF',
                        borderWidth: 1,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        paddingHorizontal: '5%',
                        fontWeight: 'bold',
                        marginVertical: '2%',
                        paddingVertical: '2%',
                        color: '#FFF'
                    }}
                    editable={false}
                />

            </View>
            <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
                <Button
                    title='Logout'
                    style={{ borderRadius: 50 / 2 }}
                    color="#912A23"
                    onPress={_signOut}
                />
            </View>
        </View>
    );
}

export default Welcome;

//alignItems: 'center', justifyContent: 'center'