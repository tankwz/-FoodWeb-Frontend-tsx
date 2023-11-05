import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7196/api/' }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (orderDetail) => ({
        url: 'order',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: orderDetail,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrdersByUserId: builder.query({
      query: (userId) => ({
        url: 'order',
        params: {
          userId: userId,
        },
      }),
      providesTags: ['Orders'],
    }),
    getOrderByOrderId: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ['Orders'],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: 'order/' + orderDetails.orderHeadId,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: orderDetails,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useUpdateOrderHeaderMutation,
  useNewOrderMutation,
  useGetOrderByOrderIdQuery,
  useGetOrdersByUserIdQuery,
} = orderApi;
export default orderApi;
