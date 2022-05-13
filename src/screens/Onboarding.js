import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { AddUserInfo } from '../store/actions/user';
import InputField from '../components/InputField';
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../navigation/RootNavigation';
import Loader from '../components/Loader';
import Auth from './Auth';
const Onboarding = () => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        fullname: "",
        age: "",
      });


    const _handleChange = event => {
        const { name, text } = event;
        if (name == 'fullname') {
            if (text == '') {
                setErrors({ ...errors, fullnameError: 'Full name is required' });
            } else {
                setErrors({ ...errors, fullnameError: null, error: null });
            }
        } else if (name == 'age') {
            if (text === '') {
                setErrors({ ...errors,ageError: 'Age is required' });
            } else {
                setErrors({ ...errors,ageError: null, error: null });
            }
        }

        setContactInfo({...contactInfo, [name]: text});
    }

    return (
        <View style={{
            flex: 1, backgroundColor:
                '#1E1E1E'
        }}>
            {/* <Loader loading={loading}/> */}
            <View style={{ height: 100, marginHorizontal: 20 }}>
                <Text style={{ color: '#FFF', paddingTop: 20, fontWeight: 'bold' }}>Full Name*</Text>
                <InputField
                    placeholder="Enter your full name*"
                    placeholderTextColor="#FFF"
                    name="fullname"
                    onChange={_handleChange}
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
                    returnKeyType="next"
                />
                <Text style={{color: 'red'}}>{errors.fullnameError &&  errors.fullnameError}</Text>
            </View>

            <View style={{ height: 100, marginHorizontal: 20 }}>
                <Text style={{ color: '#FFF', paddingTop: 20, fontWeight: 'bold' }}>Age*</Text>
                <InputField
                    placeholder="Enter your age*"
                    placeholderTextColor="#FFF"
                    onChange={_handleChange}
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
                    keyboardType="numeric"
                />

            </View>
            <Text style={{color: 'red', marginHorizontal: 20, fontSize: 16}}>{ errors.error && errors.error}</Text>
            <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
                <Button
                    title='Submit'
                    style={{ borderRadius: 50 / 2 }}
                    color="#912A23"
                    onPress={() => {
                      if(contactInfo.fullname != '' && contactInfo.age != ''){
                            const userId = auth().currentUser.uid;
                             dispatch(AddUserInfo({
                                userName: contactInfo.fullname,
                                age: contactInfo.age,
                             }, userId));
                      }else{
                        setErrors({ error: 'All fields is required' });
                      }
                    }}
                />
            </View>
        </View>
    );
}

export default Onboarding;

