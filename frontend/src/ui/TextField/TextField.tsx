
import { ChangeEvent } from 'react';

import { TextInput } from '../TextInput/TextInput';
import { isNullable } from '@/lib/utils';

import styles from './TextField.module.scss';

type TextFieldProps = {
    value?: string | number;
    legend?: string | number;
    placeholder?: string;
    changable?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = (
    {legend, ...props}
) => {
    return <div>
        {!isNullable(legend) && <legend className={styles.legend}>{legend}</legend>}
        <TextInput {...props} />
    </div>
}