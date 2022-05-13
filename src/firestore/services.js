import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {
    USERS,
    NOTIFICATIONS,
} from './constants';

const userRef = firestore().collection(USERS);
const notificationRef = firestore().collection(NOTIFICATIONS);

/**
 * @description add user info.
 * @property {object} payload- user and uid request parameters.
 * @returns {object} Success/Error Message.
 */
export const addUserInfo = async (user, uid) => {
    try {
        return await userRef.doc(uid).set({
            userName: user.userName,
            age: user.age,
        });
    } catch (error) {
        return error;
    }
};

/**
* @description get user profile.
* @property {object} payload- uid parameters.
* @returns {object} Success/Error Message.
*/
export const getProfile = async uid => {
    try {
        return await userRef.doc(uid).get();
    } catch (error) {
        return error;
    }
};

/**
* @description check profile exist or not.
* @property {object} payload- uid parameters.
* @returns {object} Success/Error Message.
*/
export const checkProfile = async (uid) => {
    try {
        let data = await userRef.doc(uid).get();
        if (data.data() == undefined) {
            // let res = await addUser(user, uid);
            return 'new-user';
        } else {
            return 'existing-user';
        }
    } catch (error) {
        return error;
    }
};

/**
* @description send push notification.
* @property {object} payload- token, title, body, image request parameters.
* @returns {object} Success/Error Message.
*/
export const send_push_notification = async (token, title, body, image) => {
    /** Server Key (Firebase -> Project -> Settings -> Cloud Messaging -> Server Key **/
    let key =
        'AAAAslK62vI:APA91bGZhS9kZBRNczFqZruLwTqvrlY87vGL1tIudftTM8F5ZoYNxL60SjzZhaTDXKHLmhtsfSVPZrV07OwZKaPTIu8Ck4YUShtLevT-6YKARZV8Hhkj9QKjxNiWkay9lWoPDpcDOXV8';

    return fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            Authorization: 'key=' + key,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: token,
            notification: {
                title,
                body,
                android_channel_id: '500',
                image,
                // image:
                //   'https://firebasestorage.googleapis.com/v0/b/alst-5ea0d.appspot.com/o/ALST%2Fprofile-img%2Fimages.jpeg?alt=media&token=a216f116-5729-421f-9e89-e0e28369cddb',
                priority: 'high',
                // android_channel_id: 'high-priority',
                sound: 'default',
            },
            // data: {
            //   Nick: 'Mario',
            //   Room: 'PortugalVSDenmark',
            // },
        }),
    })
        .then(response => response)
        .catch(error => error);
};

/**
* @description get FCM Token & Update Database.
* @returns {object} Success/Error Message.
*/
export const get_FCM_token_and_update_DB = async () => {
    try {
        let token = await messaging().getToken();

        // Assume user is already signed in
        const userId = auth().currentUser.uid;

        let response = await databaseRef.doc(userId).update({
            // tokens: firestore.FieldValue.arrayUnion(token),
            token,
        });

        // console.log('Update FCM token in db >>>', response);

        return 'Success';
    } catch (error) {
        return error;
    }
};