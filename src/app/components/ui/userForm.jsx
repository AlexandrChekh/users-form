import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import TextField from "../common/textField";
import { fetchAll } from "../../mocked-api/cities";
import SelectField from "../common/selectField";
import { v4 } from "uuid";
import { addUser, fetchUsers } from "../../mocked-api/users";
import { UserContext } from "./../../UserContext";
import { useHistory } from "react-router-dom";

const UserForm = () => {
    const [data, setData] = useState({ name: "", city: "" });
    const [errors, setErrors] = useState({});
    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetchAll().then((data) => setCities(data));
    }, []);

    const userContext = useContext(UserContext);
    const history = useHistory();

    const onAddUser = async (item) => {
        const itemCity = cities.find((x) => {
            return x.name === data.city;
        });
        const editUserItem = {
            id: v4(),
            name: item.name,
            city: itemCity
        };
        await addUser(editUserItem);
        const newUsers = await fetchUsers(1);
        userContext.setUsers(newUsers);
    };

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
        city: yup.string().required("Город обязателен для заполнения"),
        name: yup.string().required("ФИО обязательны для заполнения")
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
        onAddUser(data);
        setData({ name: "", city: "" });
        history.push("/Main?page=1");
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="ФИО:"
                name="name"
                onChange={handleChange}
                value={data.name}
                error={errors.name}
            />

            <SelectField
                label="Город:"
                defaultOption="Choose..."
                options={cities}
                name="city"
                onChange={handleChange}
                value={data.city}
                type="city"
                error={errors.city}
            />

            <button
                type="submit"
                className="btn btn-success w-100 mx-auto m-3 "
                disabled={!isValid}
            >
                Добавить
            </button>
        </form>
    );
};

export default UserForm;
