import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7196/api/' }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => ({
        url: 'ShoppingCart',
        params: {
          userID: userId,
        },
      }),
      providesTags: ['ShoppingCarts'],
    }),
    updateCart: builder.mutation({
      query: ({ userId, itemId, quantity }) => ({
        url: 'ShoppingCart',
        method: 'POST',
        params: { userId: userId, itemId: itemId, quantity: quantity },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
    setCartQuantity: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: 'ShoppingCart/SetCartQuantity',
        method: 'POST',
        params: { cartItemId: cartItemId, quantity: quantity },
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useSetCartQuantityMutation,
} = shoppingCartApi;
export default shoppingCartApi;
