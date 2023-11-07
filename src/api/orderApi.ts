import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tankwzfoodwebapiz.azurewebsites.net/api/',
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem('token');
      token && headers.append('Authorization', 'Bearer ' + token);
    },
  }),
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
      query: ({ userId, searchString, status, page, size }) => ({
        url: 'order',
        params: {
          ...(userId && { userId }),
          ...(searchString && { searchString }),
          ...(status && { status }),
          ...(page && { page }),
          ...(size && { size }),
        },
      }),
      transformResponse(apiReponse: { result: any }, meta: any) {
        return {
          apiReponse,
          totalRecords: meta.response.headers.get('x-orderfilterpage'),
        };
        //x-orderfilterpage 	{"CurrentPage":1,"HowManyRecords":10,"ForTotal":48}
      },
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
