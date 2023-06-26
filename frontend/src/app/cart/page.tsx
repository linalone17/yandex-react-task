'use client';
import { useState } from "react";

import { TicketCard } from "@/components/TicketCard";
import { Modal } from "@/ui/Modal/Modal";

import styles from './styles.module.scss';
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { remove } from "@/store/slices/cartSlice";
import { useGetMoviesQuery } from "@/services/movieApi";
import type { MovieId } from "@/types";

export default function Cart() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [ticketToRemove, setTicketToRemove] = useState<MovieId | null>(null);
    const cart = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const {data, isLoading, isError} = useGetMoviesQuery(null);

    return <div className={styles.wrapper}>
        {isError ? (
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
                            <TicketCard 
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