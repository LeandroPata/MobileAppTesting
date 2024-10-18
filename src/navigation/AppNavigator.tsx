import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import Payment from '../screens/Payment';
import SetupPayment from '../screens/SetupPayment';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Home'
				component={TabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Cart'
				component={Cart}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Payment'
				component={Payment}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='SetupPayment'
				component={SetupPayment}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Profile'
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
