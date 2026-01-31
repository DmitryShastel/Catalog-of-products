import styles from './header.module.css'
import {ThemeToggle} from "../../../features/ThemeToggle/ThemeToggle";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                Catalog of products
            </div>
            <nav>
                <ThemeToggle/>
            </nav>
        </header>
    );
};
