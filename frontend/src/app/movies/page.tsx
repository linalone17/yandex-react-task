'use client';

import React from 'react';

import { MoviesLayout, LeftMenu, RightMenu } from '@/layouts/MoviesLayout/MoviesLayout';
import { SearchFilter } from '@/components/SearchFilter';
import { MovieList } from '@/components/MovieList';

const Movies: React.FC = () => {
    return (
        <MoviesLayout>
            <LeftMenu>
                <SearchFilter/>
            </LeftMenu>
            <RightMenu>
                <MovieList/>
            </RightMenu>
        </MoviesLayout>
    )
}
export default Movies;