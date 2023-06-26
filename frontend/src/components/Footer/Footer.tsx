import React from 'react';

import cn from 'classnames';
import Link from 'next/link';


import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
    return <footer className={styles.footer}>
        <Link href="/faq">
            <div className={styles.faq}>
                Вопросы и ответы
            </div>
        </Link>
        <Link href="/about">
            <div className={styles.about}>
                О нас
            </div>
        </Link>
    </footer>
}