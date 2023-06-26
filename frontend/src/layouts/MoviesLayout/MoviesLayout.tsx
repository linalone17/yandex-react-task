import {FC, PropsWithChildren} from 'react';

import styles from './MoviesLayout.module.scss';

export const MoviesLayout: FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.wrapper}>{children}</div>
}

export const LeftMenu: FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.left}>{children}</div>
}

export const RightMenu: FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.right}>{children}</div>
}