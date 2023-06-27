'use client';

import { MovieDetail } from "@/components/MovieDetail";
import { ReviewCard } from "@/components/ReviewCard";
import { useGetMovieByIdQuery } from '@/services/movieApi';
import { useGetReviewsByMovieQuery } from '@/services/reviewApi';

import styles from './styles.module.scss';


export default function MoviePage(context: any) {
    const {movieId} = context.params;
    
    const movieQuery = useGetMovieByIdQuery(movieId);

    const reviewsQuery = useGetReviewsByMovieQuery(movieId);

    if (movieQuery.isError) {
        return {notFound: true}
    }
    
    return <div className={styles.wrapper}>
        {movieQuery.data ? (
            <MovieDetail movie={movieQuery.data}/>
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

