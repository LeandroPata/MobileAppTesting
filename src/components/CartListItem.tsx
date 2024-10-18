import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { cartSlice } from '../store/cartSlice';
import ThemeContext from '../context/ThemeContext';
import theme from '../assets/styles/theme';

const CartListItem = ({ cartItem }) => {
	const scheme: any = useContext(ThemeContext);

	const dispatch = useDispatch();

	const increaseQuantity = () => {
		dispatch(
			cartSlice.actions.changeQuantity({
				productId: cartItem.product.id,
				amount: 1,
			})
		);
	};

	const decreaseQuantity = () => {
		dispatch(
			cartSlice.actions.changeQuantity({
				productId: cartItem.product.id,
				amount: -1,
			})
		);
	};

	return (
		<SafeAreaView style={theme.cartItemContainer}>
			<Text
				style={[
					theme.cartItemText,
					{ color: scheme.text, fontSize: 18, alignSelf: 'center' },
				]}
			>
				{cartItem.product.name}
			</Text>
			<SafeAreaView style={theme.cartItemFooter}>
				<Feather
					onPress={decreaseQuantity}
					name='minus-circle'
					size={24}
					color='gray'
				/>
				<Text
					style={[
						theme.cartItemText,
						{ color: scheme.text, marginHorizontal: 10, fontWeight: 'bold' },
					]}
				>
					{cartItem.quantity}
				</Text>
				<Feather
					onPress={increaseQuantity}
					name='plus-circle'
					size={24}
					color='gray'
				/>
				<Text
					style={[
						theme.cartItemText,
						{ color: scheme.text, fontSize: 16, marginLeft: 10 },
					]}
				>
					{Number((cartItem.product.price * cartItem.quantity) / 100).toFixed(
						2
					)}{' '}
					€
				</Text>
			</SafeAreaView>
		</SafeAreaView>
	);
};

export default CartListItem;
