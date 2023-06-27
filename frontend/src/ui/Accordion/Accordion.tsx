'use client';

import { PropsWithChildren, useState } from "react";

import { DropdownArrow } from "../DropdownArrow/DropdownArrow";

import styles from './Accordion.module.scss';

type AccordionItemProps = {
    title: string;
    content: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({title, content}) => {
    const [isActive, setIsActive] = useState(false);

    return <div className={styles.item}>
        <div className={styles.container} onClick={() => setIsActive(prev => !prev)}>
            <span className={styles.title}>{title}</span>
            <DropdownArrow width={'32px'} height={'32px'} isActive={isActive}/>
        </div>
        {isActive && <p className={styles.content}>{content}</p>}
    </div>
}

export const Accordion: React.FC<PropsWithChildren> = ({children}) => {
    return <div className={styles.accordion}>{children}</div>
}
