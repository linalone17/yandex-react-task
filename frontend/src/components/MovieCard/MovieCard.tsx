'use client';

import Image from 'next/image';
import Link from 'next/link';


import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';
import { Counter } from '@/components/Counter';
import { CloseCross } from '@/ui/CloseCross';
import styles from './MovieCard.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { decrement, increment, remove } from '@/store/slices/cartSlice';

import type { Movie } from '@/types/entities';

type MovieCardProps = {
    movie: Movie;
    deletable?: boolean;
    onDelete?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
    movie, onDelete, deletable = false
}) => {

    const cart = useAppSelector((state) => state.cartReducer);
    const dispatch = useAppDispatch();
    
    const count = cart.items[movie.id] ?? 0;
    
    return (
        <div className={styles.movieCard}>
            <div className={styles.wrapper}>
                <Link href={`/movie/${movie.id}`}>
                    <div className={styles.poster}>
                        {movie.posterUrl
                            ? <Image style={{objectFit: "cover"}} src={movie.posterUrl} alt={movie.title} height={120} width={100}/>
                            : <ImagePlaceholder height={'120px'} width={'100px'}/>
                        }
                    </div>
                </Link>

                <div className={styles.description}>
                    <h3>
                        <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
                    </h3>
                    <div className={styles.genre}>{movie.genre}</div>
                </div>

                <div className={styles.controls}>
                    <Counter
                        value={count}
                        onIncrement={() => {
                            dispatch(increment(movie.id))
                        }}
                        onDecrement={() => {
                            if (!cart.items[movie.id]) return;
                            dispatch(decrement({movieId: movie.id, allowRemove: !deletable}))
                        }}
                    />
                    {deletable && 
                        <CloseCross
                            width={20}
                            height={20}
                            onClick={onDelete}
                        />
                    }
                </div>
            </div>
        </div>
    )
}