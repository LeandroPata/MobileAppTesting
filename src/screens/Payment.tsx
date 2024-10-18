import React, { useState, useContext } from 'react';
import {
	Text,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	Pressable,
} from 'react-native';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import {
	StripeProvider,
	usePaymentSheet,
	useStripe,
} from '@stripe/stripe-react-native';
import { MERCHANT_ID, PUBLISHABLE_KEY } from '../data/Constants';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { useCreatePaymentIntentMutation } from '../store/APISlice';
import { polyfillWebCrypto } from 'expo-standard-web-crypto';

polyfillWebCrypto();

const Payment = () => {
	const axios = require('axios');
	const { v4: uuidv4 } = require('uuid');

	const scheme: any = useContext(ThemeContext);
	const [ready, setReady] = useState(false);
	const { loading } = usePaymentSheet();
	const email = auth.currentUser?.email;

	const [createPaymentIntent] = useCreatePaymentIntentMutation();
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const navigation = useNavigation();

	const total = 999;

	const CLIENT_ID = '';
	const PHONE_NUMBER = '987654321';
	const DESCRIPTION = 'Test Payment';
	const PAYMENT_ID = uuidv4();
	//console.log(PAYMENT_ID);
	const ENDPOINT =
		'https://sandbox.sibspayments.com/sibs/spg/v1/payments/${PAYMENT_ID}/mbway-id/purchase';
	const requestBody = {
		type: 'MBWAY',
		amount: 10,
		currency: 'EUR',
		description: DESCRIPTION,
		redirectUri: 'https://example.com',
		phoneNumber: PHONE_NUMBER,
	};

	const headers = {
		'Content-Type': 'application/json',
		Client_ID: CLIENT_ID,
	};

	const onCheckout = async () => {
		const response = await createPaymentIntent({ amount: total });
		if (response.error) {
			console.error(response.error);
			Alert.alert('Error', 'Response Error');
			return;
		}

		const initResponse = await initPaymentSheet({
			appearance: {
				colors: {
					primary: scheme.button,
					background: scheme.background,
					componentBackground: scheme.background,
					componentDivider: scheme.border,
					primaryText: scheme.text,
					secondaryText: scheme.grey,
					componentText: scheme.text,
					icon: scheme.button,
					placeholderText: scheme.grey,
				},
				shapes: {
					borderRadius: 25,
				},
			},
			merchantDisplayName: 'Me',
			paymentIntentClientSecret: response.data.paymentIntent,
			allowsDelayedPaymentMethods: true,
		});
		if (initResponse.error) {
			console.log(initResponse.error);
			Alert.alert('Error');
		}

		const paymentResponse = await presentPaymentSheet();

		if (paymentResponse.error) {
			Alert.alert('Error code:', paymentResponse.error.message);
			return;
		}
		//setReady(false);
	};

	const buyMBWay = () => {
		axios
			.post(ENDPOINT, requestBody, { headers })
			.then((response) => {
				console.log('Payment initiated:', response.data);
			})
			.catch((error) => {
				console.error('Payment initiation failed: ', error.response.data);
			});
	};

	const testMBWay = async () => {
		try {
			const response = await axios.post(
				'https://sandbox-api.mbway.pt/mbwayapi/purchase',
				{
					amount: 10.0,
					phoneNumber: '987654321',
					description: 'Test',
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error('Payment initiation failed: ', error);
		}
	};

	return (
		<StripeProvider
			publishableKey={PUBLISHABLE_KEY}
			merchantIdentifier={MERCHANT_ID}
		>
			<SafeAreaView
				style={[theme.container, { backgroundColor: scheme.background }]}
			>
				<SafeAreaView style={theme.buttonContainer}>
					<Pressable
						onPress={onCheckout}
						//disabled={loading || !ready}
						style={[
							theme.button,
							loading || !ready
								? { backgroundColor: scheme.buttonDisabled }
								: { backgroundColor: scheme.button },
						]}
					>
						<Text
							style={[
								theme.buttonText,
								loading || !ready
									? { color: scheme.buttonTextDisabled }
									: { color: scheme.buttonText },
							]}
						>
							Card
						</Text>
					</Pressable>
					<Text style={{ color: scheme.text }}>Email: {email}</Text>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.buttonContainer,
						{
							flexDirection: 'row',
							alignItems: 'flex-end',
							top: 200,
						},
					]}
				>
					<TouchableOpacity
						style={[theme.button, { backgroundColor: scheme.button }]}
					>
						<Text
							onPress={() => {
								navigation.navigate('CheckoutTab');
							}}
							style={[theme.buttonText, { color: scheme.buttonText }]}
						>
							Back
						</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</SafeAreaView>
		</StripeProvider>
	);
};

export default Payment;
