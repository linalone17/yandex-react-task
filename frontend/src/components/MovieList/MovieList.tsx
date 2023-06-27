'use client';

import { useMemo } from 'react';

import { MovieCard } from '@/components/MovieCard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetMoviesQuery, useGetMoviesByCinemaQuery } from '@/services/movieApi';

import styles from './MovieList.module.scss';

import type { Movie, Filter } from '@/types/entities';

const genreChoices = ['fantasy', 'horror', 'comedy', 'action'] as const;
const genreMapping = {
    'fantasy': 'Фэнтези',
    'horror': 'Хоррор',
    'comedy': 'Комедия',
    'action': 'Экшен',
};

function filterPredicate(movie: Movie, filters: Filter[]) {
    return filters.every(filter => {

        if (filter.value === '') return true;

        switch (filter.type) {
            case 'title':
                return movie.title.toLowerCase().includes(filter.value.toLowerCase());
            case 'genre':
                return movie.genre === filter.value;
            default:
                return true
        }
    })
}


export const MovieList: React.FC = () => {
    const filters = useAppSelector(state => state.filtersReducer.filters);

    const cinemaFilterValue = filters.find(el => el.type === 'cinema')!.value;

    const isBackendFilteringRequired = useMemo(() => {
        if (cinemaFilterValue === '') return false;
        return true;
    }, [cinemaFilterValue]);

    const moviesQuery = useGetMoviesQuery(
        null, 
        {skip: isBackendFilteringRequired}
    )
    const filteredMoviesQuery = useGetMoviesByCinemaQuery(
        cinemaFilterValue, 
        {skip: !isBackendFilteringRequired
    })

    const {
        data,
        isLoading,
        isError
    } = isBackendFilteringRequired ? filteredMoviesQuery : moviesQuery;

    const filteredMovies = data?.filter((movie) => filterPredicate(movie, filters));

    return <div className={styles.movieList}>
        {isError ? (
            <div className={styles.message}>Упс, произошла ошибка</div>
        ) : isLoading ? (
            <div className={styles.message}>Загрузка</div>
        ) : filteredMovies?.length === 0 ? (
            <div className={styles.message}>Ничего не нашлось :(</div>
        ) : filteredMovies ? (
            <>{filteredMovies.map(movie => {
                movie = {...movie, genre: genreMapping[movie.genre as typeof genreChoices[number]]};

                return (
                    <MovieCard key={movie.id} movie={movie}/>
                )
            })}</>
        ) : null}
    </div>
}
