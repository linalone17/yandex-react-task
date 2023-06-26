import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';

import styles from './ReviewCard.module.scss';

import type { Review } from '@/types';

export const ReviewCard: React.FC<{review: Review}> = ({review}) => {
    return <div className={styles.wrapper}>
        <div className={styles.image}>
            <ImagePlaceholder width={'100px'} height={'100px'}/>
        </div>
        <div className={styles.content}>
            <div className={styles.head}>
                <span className={styles.nick}>{review.name}</span>
                <span className={styles.rating}>Оценка: <strong>{review.rating}</strong></span>
            </div>
            <p className={styles.text}>{review.text}</p>
        </div>
    </div>
}