import styles from './CloseCross.module.scss';

import CloseIcon from '@/icons/close.svg?svgr';


type CloseCrossProps = {
    width: number;
    height: number;
    onClick?: () => void;
}

export const CloseCross: React.FC<CloseCrossProps> = ({
    width, height, onClick
}) => {
    return (
        <div className={styles.wrapper}
            onClick={onClick}
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <CloseIcon width={width} height={height} fill={'inherit'}/>
        </div>
    )
}