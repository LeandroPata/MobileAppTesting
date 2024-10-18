// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	getReactNativePersistence,
	initializeAuth,
} from 'firebase/auth/react-native';
//import messaging from '@react-native-firebase/messaging';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};

//PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

// Initialize Firebase
let app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
//const auth = getAuth(app);
const db = getFirestore(app);

//messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//	console.log('Message handled in the background!', remoteMessage);
//});

//const requestUserPermission = async () => {
//	const authStatus = await messaging().requestPermission();
//	const enabled =
//		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//		authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//
//	if (enabled) {
//		console.log('Authorization status:', authStatus);
//	}
//};

//useEffect(() => {
//	if (requestUserPermission()) {
//		messaging()
//			.getToken()
//			.then((token) => {
//				console.log(token);
//			});
//	} else {
//		console.log('Failed token status', authStatus);
//	}

//	messaging().onNotificationOpenedApp(async (remoteMessage) => {
//		console.log(
//			'Notification caused app to open from background state:',
//			remoteMessage.notification
//		);
//	});

//	messaging()
//		.getInitialNotification()
//		.then(async (remoteMessage) => {
//			if (remoteMessage) {
//				console.log(
//					'Notification caused app to open from quit state:',
//					remoteMessage.notification
//				);
//			}
//		});

//	const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//		Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//	});

//	return unsubscribe;
//}, []);

export { auth, db };
