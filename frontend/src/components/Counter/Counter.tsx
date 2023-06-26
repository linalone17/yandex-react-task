import cn from 'classnames';

import PlusIcon from '@/icons/plus.svg?svgr';
import MinusIcon from '@/icons/plus-1.svg?svgr';

import styles from './Counter.module.scss';

type CounterProps = {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export const Counter: React.FC<CounterProps> = ({
    value, onIncrement, onDecrement
}) => {
    return <div className={styles.counter}>
    <div 
        className={cn(
            {[styles.disabled]: value === 0},
            styles.button
        )}
        onClick={onDecrement}
    >
        <MinusIcon width={"12"} height={"12"} fill={"var(--textTertiary)"}/>
    </div>
    <div>{value}</div>
    <div 
        className={cn(
            {[styles.disabled]: value === 30},
            styles.button
        )}
        onClick={onIncrement}
    >
        <PlusIcon width={"12"} height={"12"} fill={"var(--textTertiary)"}/>
    </div>
</div>
}