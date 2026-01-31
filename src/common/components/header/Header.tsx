import styles from './header.module.css'
import {ThemeToggle} from "../../../features/themeToggle/ThemeToggle";
import {Input} from "../../../shared/components/ui/input/Input";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                Catalog of products
            </div>
            <Input/>
            <ThemeToggle/>
        </header>
    );
};
