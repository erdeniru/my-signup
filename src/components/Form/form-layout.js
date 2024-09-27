import { ButtonLayout } from '../../components';
import styles from './form.module.css';

export const FormLayout = ({ isValid, onSubmit, submitButtonRef, children }) => {
    return (
        <form className={styles.signup} onSubmit={onSubmit}>
            <h2 className={styles.signup__title}>Регистрация</h2>
            <div className={styles.signup__content}>{children}</div>
            <ButtonLayout buttonRef={submitButtonRef} isValid={isValid} />
        </form>
    );
};
