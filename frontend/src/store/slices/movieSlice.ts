import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Movie} from '@/types';

type MoviesState = {
    movies: Movie[];
}

const initialState: MoviesState = {
    movies: []
}

export const movies = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Movie | Movie[]>) => {
            const movies = Array.isArray(action.payload) ? action.payload : [action.payload];
            movies.push(...movies);
        },
        put: (state, action: PayloadAction<Movie | Movie[]>) => {
            const movies = Array.isArray(action.payload) ? action.payload : [action.payload];

            state.movies = movies;
        }
    }

})

export const {
    add,
    put
} = movies.actions;

export const moviesReducer = movies.reducer;
