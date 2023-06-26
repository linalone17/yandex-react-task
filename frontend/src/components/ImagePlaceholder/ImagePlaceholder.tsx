import styles from './ImagePlaceholder.module.scss';

import Icon from '@/icons/photo.svg?svgr';

type ImagePlaceholderProps = {
    width: string;
    height: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({width, height}) => {
    return (
        <div 
            className={styles.imagePlaceholder}
            style={{width, height}}
        >
            <Icon height={"32px"} width={"32px"} fill={'var(--gray3)'}/>
        </div>
    )
}