import styles from './button.module.css';

export const ButtonLayout = ({ isValid, buttonRef }) => {
    return (
        <button
            ref={buttonRef}
            className={isValid ? styles.btn : styles.btn + ' ' + styles.btn_gray}
            type="submit"
            disabled={!isValid}
        >
            Зарегистрироваться
        </button>
    );
};
