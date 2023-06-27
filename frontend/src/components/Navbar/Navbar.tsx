'use client';

import React from 'react';

import styles from './Navbar.module.scss';

import CartIcon from '@/icons/basket.svg?svgr';

import Link from 'next/link';
import { useAppSelector } from '@/hooks/useAppSelector';


export const Navbar: React.FC = () => {
    const amount = useAppSelector(state => state.cartReducer.amount);

    return <header className={styles.navbar}>
        <Link href="/movies">
            <div className={styles.logo}>
                Билетопоиск
            </div>
        </Link>
        <Link href="/cart">
            <div className={styles.cart}>
                {amount !== 0 && <div className={styles.amount}>{amount}</div>}
                <CartIcon className={styles.icon} width={'32px'} height={'32px'}/>
            </div>
        </Link>
    </header>
}