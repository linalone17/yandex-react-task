import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

import cn from 'classnames'
type ButtonProps = {
    text: string;
    variant: 'primary' | 'secondary';
} & ButtonAttrs;

type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({text, variant, ...props}) => {
    return <button 
        className={cn(
            styles.button,
            {   
                [styles.primary]: variant === 'primary',
                [styles.secondary]: variant === 'secondary'
            }
            )}
        {...props}
    >{text}</button>
}