import { DetailedHTMLProps, InputHTMLAttributes, RefObject, forwardRef } from 'react';
import styles from './TextInput.module.scss';


export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    return <div>
        <input className={styles.input}
            type="text"
            ref={ref}
            {...props}
        />
    </div>
})