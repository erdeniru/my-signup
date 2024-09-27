import styles from './app.module.css';

export const AppLayout = ({ children }) => {
    return <main className={styles.app}>{children}</main>;
};
