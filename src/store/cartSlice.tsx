// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import cart from '../data/cart';

const initialState = {
	items: cart,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		changeQuantity: (state, action) => {
			const { productId, amount } = action.payload;
			const cartItem = state.items.find(
				(item) => item.product.id === productId
			);
			if (cartItem) {
				cartItem.quantity += amount;
			}

			if (cartItem.quantity <= 0) {
				state.items = state.items.filter((item) => item !== cartItem);
			}
		},
		clear: (state) => {
			state.items = [];
		},
	},
});

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectTotal = (state) =>
	state.cart.items.reduce(
		(sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
		0
	);

const cartSelector = (state) => state.cart;
