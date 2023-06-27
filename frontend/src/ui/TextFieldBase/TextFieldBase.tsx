import { DetailedHTMLProps, InputHTMLAttributes, RefObject, forwardRef } from 'react';
import styles from './TextFieldBase.module.scss';


export type TextFieldBaseProps = InputHTMLAttributes<HTMLInputElement>;

export const TextFieldBase = forwardRef<HTMLInputElement, TextFieldBaseProps>((props, ref) => {
    return <input className={styles.input}
            type="text"
            ref={ref}
            {...props}
        />
})