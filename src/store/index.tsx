import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './APISlice';
import { cartSlice } from './cartSlice';

export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
		api: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
