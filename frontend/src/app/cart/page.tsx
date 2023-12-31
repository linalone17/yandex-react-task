'use client';
import { useState } from "react";

import { MovieCard } from "@/components/MovieCard";
import { Modal } from "@/ui/Modal/Modal";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { remove } from "@/store/slices/cartSlice";
import { useGetMoviesQuery } from "@/services/movieApi";

import styles from './styles.module.scss';

import type { MovieId } from "@/types/entities";

export default function Cart() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [ticketToRemove, setTicketToRemove] = useState<MovieId | null>(null);
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const {data, isLoading, isError} = useGetMoviesQuery(null);

    return <div className={styles.wrapper}>
        {cart.amount === 0 ? (
            <div className={styles.empty}>
                Ваша корзина пуста
            </div>
        ) : isError ? (
            <>Упс, произошла ошибка</>
        ) : isLoading ? (
            <>Загрузка...</>
        ) : data ? (<>
            <div className={styles.tickets}>
                {Object.keys(cart.items).map(id => {
                    const movie = data.find((el: any) => el.id === id);
                    
                    if (!movie) return null;
                    return (
                        <div key={id}>
                            <MovieCard 
                                movie={movie} 
                                onDelete={() => {
                                    setShowModal(true);
                                    setTicketToRemove(id)
                                }} 
                                deletable
                            />
                        </div>
                    )
                })}
            </div>
            <div className={styles.total}>
                <div>Итого:</div>
                <div>{cart.amount}</div>
            </div>
            <Modal 
                show={showModal} 
                onClose={() => {setShowModal(false)}}
                onApprove={() => {
                    if (!ticketToRemove) return;
                    dispatch(remove(ticketToRemove));
                    setShowModal(false);
                    setTicketToRemove(null);
                    }}
                title={'Удаление билета'}
                text={'Вы уверены, что хотите удалить билет?'}
            />
        </>) : null}
    </div>
}