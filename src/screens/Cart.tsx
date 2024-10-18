import React, { useContext } from 'react';
import {
	Text,
	SafeAreaView,
	Image,
	Pressable,
	FlatList,
	View,
	StyleSheet,
	Alert,
} from 'react-native';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/core';
import CartListItem from '../components/CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import { cartSlice, selectTotal } from '../store/cartSlice';
import {
	useCreateOrderMutation,
	useCreatePaymentIntentMutation,
} from '../store/APISlice';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { MERCHANT_ID, PUBLISHABLE_KEY } from '../data/Constants';

const CartTotals = () => {
	const scheme: any = useContext(ThemeContext);
	const total = useSelector(selectTotal);

	return (
		<SafeAreaView style={theme.cartTotalsContainer}>
			<SafeAreaView style={theme.cartRow}>
				<Text style={{ color: scheme.text }}>Total = </Text>
				<Text style={{ color: scheme.text }}>
					{Number(total / 100).toFixed(2)} €
				</Text>
			</SafeAreaView>
		</SafeAreaView>
	);
};

const Cart = () => {
	const scheme: any = useContext(ThemeContext);
	const navigation = useNavigation();

	const total = useSelector(selectTotal);

	const dispatch = useDispatch();

	const cartItems = useSelector((state) => state.cart.items);

	const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

	const [createPaymentIntent] = useCreatePaymentIntentMutation();

	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const onCheckout = async () => {
		const response = await createPaymentIntent({
			amount: total,
		});
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
			paymentIntentClientSecret: response.data.paymentIntent,
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

		onCreateOrder();
	};

	const onCreateOrder = async () => {
		const result = await createOrder({
			items: cartItems,
			total,
			customer: {
				name: 'Eu',
				address: 'My home',
				email: 'testing@test.com',
			},
		});

		Alert.alert('Success', 'Order has been submitted');
		dispatch(cartSlice.actions.clear());
		navigation.navigate('HomeTab');
	};

	return (
		<StripeProvider
			publishableKey={PUBLISHABLE_KEY}
			merchantIdentifier={MERCHANT_ID}
		>
			<SafeAreaView
				style={[theme.container, { backgroundColor: scheme.background }]}
			>
				<SafeAreaView style={{ marginTop: 100 }}>
					<FlatList
						data={cartItems}
						renderItem={({ item }) => <CartListItem cartItem={item} />}
						ListFooterComponent={CartTotals}
					/>
				</SafeAreaView>
				<Pressable
					style={[
						theme.button,
						{ backgroundColor: scheme.button, marginTop: -250 },
					]}
				>
					<Text
						onPress={onCheckout}
						style={[theme.buttonText, { color: scheme.buttonText }]}
					>
						Checkout
					</Text>
				</Pressable>
				<Pressable style={[theme.button, { backgroundColor: scheme.button }]}>
					<Text
						onPress={() => {
							navigation.navigate('CheckoutTab');
						}}
						style={[theme.buttonText, { color: scheme.buttonText }]}
					>
						Back
					</Text>
				</Pressable>
			</SafeAreaView>
		</StripeProvider>
	);
};

export default Cart;
