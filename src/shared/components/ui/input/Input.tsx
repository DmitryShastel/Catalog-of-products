import styles from './input.module.css'

export const Input = ({ label, ...props }) => {
    return (
        <label className={styles.label}>
            <span>{label}</span>
            <input className={styles.inputField} {...props} />
        </label>
    );
};

