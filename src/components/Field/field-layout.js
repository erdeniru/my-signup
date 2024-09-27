import styles from './field.module.css';

export const FieldLayout = ({ field, registerField }) => {
    const { id, label, type, error } = field;

    /* prettier-ignore */
    return (
        <div className={styles['field-box']}>
            <div className={styles.field}>
                <label className={styles.field__label} htmlFor={id}>{label}</label>
                <input
                    className={styles.field__input + (error ? ' ' + styles.border_red : '')}
                    type={type}
                    id={id}
                    name={id}
                    {...registerField(id)}
                />
            </div>
            <div className={styles.field__message}>
                {error && <span className={styles.color_red}>{error}</span>}
            </div>
        </div>
    );
};
