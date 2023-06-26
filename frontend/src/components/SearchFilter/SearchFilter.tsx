'use client'

import { SelectField } from '@/ui/SelectField';
import { TextField } from '@/ui/TextField';

import styles from './SearchFilter.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { change } from '@/store/slices/filterSlice';

import { useGetCinemasQuery } from '@/services/cinemaApi';

const genreChoices = ['fantasy', 'horror', 'comedy', 'action'] as const;
const genreMapping = {
    'fantasy': 'Фэнтези',
    'horror': 'Хоррор',
    'comedy': 'Комедия',
    'action': 'Экшен',
}

export const SearchFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const cinemasQuery = useGetCinemasQuery(null);
     
    return <div className={styles.searchFilter}>
        <h2 className={styles.header}>Фильтр поиска</h2>
        <div className={styles.filterList}>
            <TextField
                legend={'Название'}
                placeholder={'Введите название'}
                onChange={(event) => {
                    dispatch(change(['title', event.target.value]))
                }}
            />
            <SelectField 
                legend={'Жанр'}
                placeholder={'Выберите жанр'}
                onSelected={(i) => {
                    const value = i !== null ? genreChoices[i] : '';
                    dispatch(change(['genre', value]))
                }}
                choices={genreChoices.map(genre => genreMapping[genre])}
            />
            <SelectField
                legend={'Название'}
                placeholder={'Выберите кинотеатр'}
                onSelected={(i) => {
                    const ids = cinemasQuery.data?.map(e => e.id);
                    const value = i ? ids[i] : '';
                    dispatch(change(['cinema', value]));
                }}
                choices={cinemasQuery.data?.map(e => e.name) || []}
            />
        </div>
    </div>
}