import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { Cinema } from "@/types";

export const cinemaApi = createApi({
    reducerPath: 'cinemaApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api/"
    }),
    endpoints: (builder) => ({
        getCinemas: builder.query<Cinema[], null>({
            query: () => 'cinemas'
        }),
    })
})

export const {useGetCinemasQuery} = cinemaApi;