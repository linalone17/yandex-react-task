'use client';

import { useMemo } from 'react';

import { TicketCard } from '../TicketCard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetMoviesQuery, useGetMoviesByCinemaQuery } from '@/services/movieApi';

import styles from './MovieList.module.scss';

import type { Movie, Filter } from '@/types';

const genreChoices = ['fantasy', 'horror', 'comedy', 'action'] as const;
const genreMapping = {
    'fantasy': 'Фэнтези',
    'horror': 'Хоррор',
    'comedy': 'Комедия',
    'action': 'Экшен',
};

function filter(movie: Movie, filters: Filter[]) {
    return filters.every(filter => {

        if (filter.value === '') return true;

        switch (filter.type) {
            case 'title':
                return movie.title.toLowerCase().includes(filter.value.toLowerCase());
                break;
            case 'genre':
                return movie.genre === filter.value;
                break;
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

    const moviesQuery = useGetMoviesQuery(null, {skip: isBackendFilteringRequired});
    const filteredMoviesQuery = useGetMoviesByCinemaQuery(cinemaFilterValue, {skip: !isBackendFilteringRequired});

    const {
        data,
        isLoading,
        isError
    } = isBackendFilteringRequired ? filteredMoviesQuery : moviesQuery;

    return <div className={styles.movieList}>
        {isError ? (
            <>Упс, произошла ошибка</>
        ) : isLoading ? (
            <>Загрузка</>
        ) : data ? (
            <>{data.map(movie => {

                if (!filter(movie, filters)) return;
                movie = {...movie, genre: genreMapping[movie.genre as typeof genreChoices[number]]};

                return (
                    <TicketCard key={movie.id} movie={movie}/>
                )
            })}</>
        ) : null}
    </div>
}
