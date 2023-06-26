
const {movies} = require("../../../../simple_api/api/mock");

import Image from 'next/image';

import styles from './Movie.module.scss';
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';
import { Counter } from '../Counter';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { increment, decrement } from '@/store/slices/cartSlice';

import type { Movie as MovieObject } from '@/types';

const genreChoices = ['fantasy', 'horror', 'comedy', 'action'] as const;
const genreMapping = {
    'fantasy': 'Фэнтези',
    'horror': 'Хоррор',
    'comedy': 'Комедия',
    'action': 'Экшен',
};

export const Movie: React.FC<{movie: MovieObject}> = ({movie}) => {
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    return <div>
        <div className={styles.movie}>
            <div className={styles.poster}>
                {movie.posterUrl
                    ? <Image 
                        style={{objectFit: "cover"}} 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        width={400} 
                        height={500}
                        />
                    : <ImagePlaceholder width={'400px'} height={'500px'}/>
                }
            </div>
            <div className={styles.about}>
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <h2 className={styles.title}>{movie.title}</h2>

                        <div className={styles.info}>
                            <span><strong>Жанр:</strong> {genreMapping[movie.genre as typeof genreChoices[number]]}</span>
                            <span><strong>Год выпуска:</strong> {movie.releaseYear}</span>
                            <span><strong>Рейтинг:</strong> {movie.rating}</span>
                            <span><strong>Режиссер:</strong> {movie.director}</span>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <Counter
                            value={cart.items[movie.id]}
                            onIncrement={() => {dispatch(increment(movie.id))}}
                            onDecrement={() => {dispatch(decrement(movie.id))}}
                        />
                    </div>
                </div>

                <div className={styles.description}>
                    <h3>Описание</h3>
                    <p>{movie.description}</p>
                </div>
            </div>
        </div>
    </div>
}