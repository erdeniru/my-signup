import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormLayout, FieldLayout } from './components';
import { useStore } from './store';
import { sendFormData } from './service';
import { AppLayout } from './app-layout';

const fieldsScheme = yup.object().shape({
    email: yup
        .string()
        .required('Электронная почта не указана')
        .matches(/\S+@\S+\.\S+/, 'Электронная почта должна содержать @ и .'),
    password: yup
        .string()
        .required('Пароль не указан')
        .min(8, 'Пароль должен содержать не меньше 8 символов'),
    repasswd: yup
        .string()
        .required('Повторный пароль не указан')
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const App = () => {
    const { getState, getData, checkValidation } = useStore();

    const [isSubmitFocus, setIsSubmitFocus] = useState(false);
    const submitButtonRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: getData(),
        resolver: yupResolver(fieldsScheme),
    });

    const onSubmit = (formData) => {
        sendFormData(formData);
    };

    const { email, password, repasswd } = getState();
    email.error = errors.email ? errors.email.message : null;
    password.error = errors.password ? errors.password.message : null;
    repasswd.error = errors.repasswd ? errors.repasswd.message : null;

    const formState = {
        isValid: checkValidation(),
        onSubmit: handleSubmit(onSubmit),
        submitButtonRef,
    };

    if (!isSubmitFocus) setIsSubmitFocus(checkValidation());

    useEffect(() => {
        if (isSubmitFocus) submitButtonRef.current.focus();
    });

    /* prettier-ignore */
    return (
        <AppLayout>
            <FormLayout {...formState}>
                <FieldLayout field={email} registerField={register} />
                <FieldLayout field={password} registerField={register} />
                <FieldLayout field={repasswd} registerField={register} />
            </FormLayout>
        </AppLayout>
    );
};
