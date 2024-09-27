import { useState } from 'react';

const initialState = {
    email: {
        id: 'email',
        label: 'Ваша электронная почта',
        type: 'email',
        value: '',
        error: null,
    },
    password: {
        id: 'password',
        label: 'Ваш пароль',
        type: 'password',
        value: '',
        error: null,
    },
    repasswd: {
        id: 'repasswd',
        label: 'Повторите пароль',
        type: 'password',
        value: '',
        error: null,
    },
};

export const useStore = () => {
    const [state, setState] = useState(initialState);

    return {
        getState: () => state,
        getData: () =>
            Object.values(state).reduce(
                (obj, field) => ({ ...obj, [field.id]: field.value }),
                {},
            ),
        updateState: (fieldId, newValue) => {
            setState({ ...state, [fieldId]: newValue });
        },
        getFieldById: (fieldId) => state[fieldId],
        checkValidation: () =>
            /* prettier-ignore */
            Object.values(state).every((field) => field.error === null),
    };
};
