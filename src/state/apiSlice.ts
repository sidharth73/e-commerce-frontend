import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../constants.ts";

const baseQuery = fetchBaseQuery({ baseUrl: BACKEND_URL });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product'],
    endpoints: builder => ({})
})