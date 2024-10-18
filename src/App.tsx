import React, { useState, useEffect, useContext } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { EventRegister } from 'react-native-event-listeners';
import ThemeContext from './context/ThemeContext';
import colors from './assets/colors/colors';
import { getData, storeData } from './storage/asyncStorage';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from './store';
//import messaging from '@react-native-firebase/messaging';
//import { app } from './firebase';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [mode, setMode] = useState(colors.mode);

	useEffect(() => {
		fetchStoredTheme();
		let eventListener: string = EventRegister.addEventListener(
			'changeTheme',
			(data) => {
				setMode(data);
			}
		);
		return () => {
			EventRegister.removeEventListener(eventListener);
		};
	});

	const updateTheme = (newTheme) => {
		let aux;
		if (!newTheme) {
			aux = mode === true ? false : true;
			newTheme = aux;
		}
		setMode(newTheme);
		storeData('activeTheme', newTheme);
	};

	const fetchStoredTheme = async () => {
		try {
			const themeData = await getData('activeTheme');
			if (themeData) {
				updateTheme(themeData);
			}
		} catch ({ message }) {
			alert(message);
		} finally {
			await setTimeout(() => SplashScreen.hideAsync(), 1000);
			SplashScreen.hideAsync();
		}
	};

	return (
		<ThemeContext.Provider value={mode === true ? colors.dark : colors.light}>
			<Provider store={store}>
				<NavigationContainer>
					<AppNavigator />
				</NavigationContainer>
			</Provider>
		</ThemeContext.Provider>
	);
}
