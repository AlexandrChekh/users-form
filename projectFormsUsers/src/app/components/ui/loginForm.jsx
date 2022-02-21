import React, { useState, useEffect } from "react";
import TextField from "../common/text-field";
import { PropTypes } from "prop-types";
import * as yup from "yup";
const LoginForm = ({ onSubmit }) => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /[A-Z]+/g,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(/\d+/g, "Пароль должен содержать хотя бы одну цифру")
            .matches(
                /.{8,}/g,
                "Пароль должен состоять минимум из 8-ми символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно. Пример: user@user.user")
    });
    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Логин"
                name="email"
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                name="password"
                onChange={handleChange}
                value={data.password}
                type="password"
                error={errors.password}
            />

            <button
                type="submit"
                className="btn btn-success w-100 mx-auto m-3"
                disabled={!isValid}
            >
                Войти
            </button>
        </form>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

export default LoginForm;
