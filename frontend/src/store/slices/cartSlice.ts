import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { strictEqual } from 'assert';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage';
import type { MovieId } from '@/types/types';


type CartState = {
    items: {
        [movieId: MovieId]: number;
    };
    amount: number;
}

const initialState: CartState = {
    items: {},
    amount: 0
}

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clear: (state) => {
            state.items = {};
            state.amount = 0;
        },
        increment: (state, action: PayloadAction<MovieId>) => {
            const movieId = action.payload;
            
            if (!(movieId in state.items)) {
                state.items[movieId] = 1;
                state.amount += 1;
                return;
            }
            
            if (state.items[movieId] > 29) return;

            state.items[movieId] += 1;
            state.amount += 1;

        },
        decrement: (state, action: PayloadAction<MovieId | {movieId: MovieId, allowRemove: boolean}>) => {

            let movieId, allowRemove;
            if (typeof action.payload === 'string') {
                movieId = action.payload;
                allowRemove = false;
            } else {
                movieId = action.payload.movieId;
                allowRemove = action.payload.allowRemove;
            }

            if (state.items[movieId] < 1) return;
            if (state.items[movieId] === 1 && allowRemove) {
                state.amount -= 1;
                delete state.items[movieId];
                return;
            }

            state.items[movieId] -= 1;
            state.amount -= 1;
        },
        remove: (state, action: PayloadAction<MovieId>) => {
            state.amount -= state.items[action.payload];
            delete state.items[action.payload];
        }
    }

})

export const {
    clear,
    increment,
    decrement,
    remove
} = cart.actions;
export const cartReducer = cart.reducer;
