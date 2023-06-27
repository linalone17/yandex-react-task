import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { cartReducer } from "./slices/cartSlice";
import { filtersReducer } from "./slices/filterSlice";
import { movieApi } from "@/services/movieApi";
import { cinemaApi } from "@/services/cinemaApi";
import { reviewApi } from "@/services/reviewApi";

export const store = configureStore({
    reducer: {
        cartReducer,
        filtersReducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [cinemaApi.reducerPath]: cinemaApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer

    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({}).concat([
            movieApi.middleware,
            cinemaApi.middleware,
            reviewApi.middleware
        ])
    ),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
