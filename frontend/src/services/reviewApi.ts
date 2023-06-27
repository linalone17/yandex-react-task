import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { Review } from "@/types/entities";

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api/"
    }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], null>({
            query: () => 'reviews'
        }),
        getReviewsByMovie: builder.query<Review[], string>({
            query: (id) => `reviews?movieId=${id}`
        }),
        
    })
})

export const {useGetReviewsQuery, useGetReviewsByMovieQuery} = reviewApi;