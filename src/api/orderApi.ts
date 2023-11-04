import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7196/api/' }),
  // tagTypes: [''],
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
    }),
  }),
});

export const { useNewOrderMutation } = orderApi;
export default orderApi;
