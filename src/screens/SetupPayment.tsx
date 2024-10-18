import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { MERCHANT_ID, PUBLISHABLE_KEY } from '../data/Constants';
import { useCreateSetupPaymentIntentMutation } from '../store/APISlice';
import { useDispatch } from 'react-redux';

const SetupPayment = () => {
	const navigation = useNavigation();
	const scheme: any = useContext(ThemeContext);

	const dispatch = useDispatch();

	const [createSetupPaymentIntent] = useCreateSetupPaymentIntentMutation();

	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const onSetup = async () => {
		const response = await createSetupPaymentIntent({});
		if (response.error) {
			Alert.alert('Error', 'Error');
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
			merchantDisplayName: 'Euzinho da Silva',
			setupIntentClientSecret: response.data.paymentIntent,
		});
		if (initResponse.error) {
			console.log(initResponse.error);
			Alert.alert('Error', 'Error');
			return;
		}

		const paymentResponse = await presentPaymentSheet();

		if (paymentResponse.error) {
			Alert.alert(
				`Error code: ${paymentResponse.error.code}`,
				paymentResponse.error.message
			);
			return;
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
					<TouchableOpacity
						onPress={onSetup}
						style={[theme.button, { backgroundColor: scheme.button }]}
					>
						<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
							Card
						</Text>
					</TouchableOpacity>
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
								navigation.navigate('SettingsTab');
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

export default SetupPayment;
