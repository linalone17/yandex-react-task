import { useMemo } from "react";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { Movie, Filter } from "@/types/entities";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api"
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<Movie[], null>({
            query: () => 'movies'
        }),
        getMoviesByCinema: builder.query<Movie[], string>({
            query: (id) => `movies?cinemaId=${id}`  
        }),
        getMovieById: builder.query<Movie, string>({
            query: (id) => `movie?movieId=${id}`
        }),
    })
})

export const {
    useGetMoviesQuery, 
    useGetMoviesByCinemaQuery,
    useGetMovieByIdQuery
} = movieApi;
