import styles from './DropdownArrow.module.scss';

import ArrowUp from '@/icons/arrow-square-up.svg?svgr';
import ArrowDown from '@/icons/arrow-square-down.svg?svgr';

type DropdownArrowProps = {
    isActive: boolean,
    width: string
    height: string,
}
export const DropdownArrow: React.FC<DropdownArrowProps> = ({isActive, width, height}) => {
    return <div className={styles.icon} style={{width: width, height: height}}>
        {isActive
            ? <ArrowUp width={width} height={height}/>
            : <ArrowDown width={width} height={height}/>
        }
    </div>
}