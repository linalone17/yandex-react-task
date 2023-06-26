import { PropsWithChildren, useState } from "react"
import { createPortal } from "react-dom"

import { Button } from "../Button";
import { CloseCross } from "../CloseCross";

import styles from './Modal.module.scss';

type ModalProps = {
    title: string;
    text: string;

    show: boolean;
    onClose: () => void;
    onApprove: () => void;
}

type PortalProps = {
    container: Element | DocumentFragment;
    key?: string | null | undefined;
}

const Portal: React.FC<PropsWithChildren<PortalProps>> = ({children, container, key}) => {
    return <>{createPortal(children, container, key)}</>
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = (
    {show, onApprove, onClose, title, text}
) => {

    return <>{show && <Portal container={document.body}>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <div className={styles.head}>
                        <h2>{title}</h2>
                        <CloseCross width={16} height={16} onClick={onClose}/>
                    </div>
                    <p className={styles.text}>{text}</p>
                </div>
                <div className={styles.buttons}>
                    <Button text={'Да'} variant={'primary'} onClick={onApprove}/>
                    <Button text={'Нет'} variant={'secondary'} onClick={onClose}/>
                </div>
            </div>
        </div>
    </Portal>}</>
}