'use client'

import { useCallback} from 'react';

import { SelectField } from '@/ui/SelectField';
import { TextField } from '@/ui/TextField';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { change } from '@/store/slices/filterSlice';
import { useGetCinemasQuery } from '@/services/cinemaApi';
import { debounce } from '@/lib/utils';

import styles from './SearchFilter.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';

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
    const filters = useAppSelector(state => state.filtersReducer.filters);

    let genreFilterValue = '', 
        cinemaFilterValue = '', 
        titleFilterValue = '';

    filters.forEach(filter => {
        if (filter.type === 'genre') {
            genreFilterValue = filter.value;
        }

        if (filter.type === 'cinema') {
            cinemaFilterValue = filter.value;
        }

        if (filter.type === 'title') {
            titleFilterValue = filter.value;
        }
    })

    const debouncedDispatch = useCallback(debounce(dispatch, 200), []);
     
    return <div className={styles.searchFilter}>
        <h2 className={styles.header}>Фильтр поиска</h2>
        <div className={styles.filterList}>
            <TextField
                legend={'Название'}
                placeholder={'Введите название'}
                onChange={(event) => {
                    debouncedDispatch(change(['title', event.target.value]))
                }}
                defaultValue={titleFilterValue}
            />
            <SelectField 
                legend={'Жанр'}
                placeholder={'Выберите жанр'}
                value={genreMapping[genreFilterValue as typeof genreChoices[number]] ?? ''}
                onSelected={(i) => {
                    const value = i !== null ? genreChoices[i] : '';
                    dispatch(change(['genre', value]))
                }}
                choices={genreChoices.map(genre => genreMapping[genre])}
            />
            <SelectField
                legend={'Название'}
                placeholder={'Выберите кинотеатр'}
                value={
                    cinemasQuery.data?.find(e => e.id === cinemaFilterValue)?.name ?? ''
                }
                onSelected={(i) => {
                    const ids = cinemasQuery.data?.map(e => e.id);
                    if (!ids) return;
                    const value = i === null ? '' : ids[i];
                    console.log(i);
                    dispatch(change(['cinema', value]));
                }}
                choices={cinemasQuery.data?.map(e => e.name) || []}
            />
        </div>
    </div>
}