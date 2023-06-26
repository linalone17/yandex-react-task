import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Filter, FilterType} from '@/types';


type FiltersState = {
    filters: Filter[]
}

const initialState: FiltersState = {
    filters: [
        {
            type: 'title',
            value: ''
        },
        {
            type: 'genre',
            value: ''
        },
        {
            type: 'cinema',
            value: ''
        }
    ]
}

export const filters = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<[FilterType, string]>) => {
            const [type, value] = action.payload;
            state.filters.find(el => el.type === type)!.value = value;
        }
    }

})

export const {
    change
} = filters.actions;

export const filtersReducer = filters.reducer;
