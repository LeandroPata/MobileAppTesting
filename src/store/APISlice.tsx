import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../data/Constants';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (newOrder) => ({
				url: 'orders',
				method: 'POST',
				body: newOrder,
			}),
		}),
		getOrder: builder.query({
			query: (ref) => `orders/${ref}`,
		}),
		createPaymentIntent: builder.mutation({
			query: (data) => ({
				url: 'payments/intent',
				method: 'POST',
				body: data,
			}),
		}),
		createSetupPaymentIntent: builder.mutation({
			query: (data) => ({
				url: 'payments/setup',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderQuery,
	useCreatePaymentIntentMutation,
	useCreateSetupPaymentIntentMutation,
} = apiSlice;
