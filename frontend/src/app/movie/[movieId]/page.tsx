'use client';

import type { NextPageContext } from "next";

import { Movie } from "@/components/Movie";
import { ReviewCard } from "@/components/ReviewCard";

import styles from './styles.module.scss';

import { useGetMovieByIdQuery } from '@/services/movieApi';
import { useGetReviewsByMovieQuery } from '@/services/reviewApi';


export default function MoviePage(context: any) {
    const {movieId} = context.params;
    
    const movieQuery = useGetMovieByIdQuery(movieId);

    const reviewsQuery = useGetReviewsByMovieQuery(movieId);

    if (movieQuery.isError) {
        return {notFound: true}
    }
    
    return <div className={styles.wrapper}>
        {movieQuery.data ? (
            <Movie movie={movieQuery.data}/>
        ) : null}
        {reviewsQuery.data ? (
            <div className={styles.reviews}>
                {reviewsQuery.data.map(item => {
                    return <ReviewCard review={item}/>
                })}
            </div>
        ) : null}
    </div>
}

