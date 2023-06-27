
import { ChangeEvent } from 'react';

import { TextFieldBase } from '@/ui/TextFieldBase';
import { isNullable } from '@/lib/utils';

import styles from './TextField.module.scss';

type TextFieldProps = {
    defaultValue?: string | number;
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
        <TextFieldBase {...props} />
    </div>
}