import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7196/api/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'Auth/Register',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'Auth/Login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
export default authApi;
