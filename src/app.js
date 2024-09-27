import { useEffect, useRef, useState } from 'react';
import { FormLayout, FieldLayout } from './components';
import { useStore } from './store';
import { sendFormData } from './service';
import { AppLayout } from './app-layout';

export const App = () => {
    const { getState, getData, updateState, getFieldById, checkValidation } = useStore();

    const [isSubmitFocus, setIsSubmitFocus] = useState(false);
    const submitButtonRef = useRef(null);

    const checkEmail = (value) => {
        if (value === '') {
            return 'Электронная почта не указана';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            return 'Электронная почта должна содержать @ и .';
        }
        return null;
    };

    const checkPassword = (value) => {
        if (value === '') {
            return 'Пароль не указан';
        } else if (value.length < 8) {
            return 'Пароль должен содержать не меньше 8 символов';
        }
        return null;
    };

    const checkRepasswd = (value) => {
        if (value === '') {
            return 'Повторный пароль не указан';
        } else if (value !== password.value) {
            return 'Пароли должны совпадать';
        }
        return null;
    };

    const onChange = (event, checkError, isAutoFocus = false) => {
        const { target } = event;
        const { id, value } = target;

        const field = getFieldById(id);
        const error = checkError(value);

        updateState(id, { ...field, value, error });

        setIsSubmitFocus(isAutoFocus && error === null);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        sendFormData(getData());
    };

    const { email, password, repasswd } = getState();

    const formState = {
        isValid: checkValidation(),
        onSubmit,
        submitButtonRef,
    };

    useEffect(() => {
        if (isSubmitFocus) submitButtonRef.current.focus();
    });

    /* prettier-ignore */
    return (
        <AppLayout>
            <FormLayout {...formState}>
                <FieldLayout field={email} onChangeField={(event) => onChange(event, checkEmail, false)} />
                <FieldLayout field={password} onChangeField={(event) => onChange(event, checkPassword, false)} />
                <FieldLayout field={repasswd} onChangeField={(event) => onChange(event, checkRepasswd, true)} />
            </FormLayout>
        </AppLayout>
    );
};
