import React, {FC} from 'react';
import styles from './Header.module.scss';

export interface HeaderProps {
    headerText: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {

    const {headerText} = props;

    return (
        <div className={styles.Header}>
            <div className={styles.headerImage}>
                <h1>{headerText}</h1>
            </div>
        </div>
    )
}

export default Header;
