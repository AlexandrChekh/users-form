import React, { useEffect, useState, useContext } from "react";
import * as yup from "yup";
import TextField from "../common/textField";
import SelectField from "../common/selectField";
import { fetchAll } from "../../mocked-api/cities";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchUser, fetchUsers, editUser } from "../../mocked-api/users";
import { UserContext } from "../../UserContext";
const EditUserForm = () => {
    const userContext = useContext(UserContext);
    const { UserId } = useParams();
    const history = useHistory();
    const [data, setData] = useState({ name: "", city: "" });
    const [cities, setCities] = useState([]);

    const onEditUser = async (item) => {
        const itemCity = cities.find((x) => {
            if (item.city.name) {
                return x.name === data.city.name;
            }
            return x.name === data.city;
        });
        const editUserItem = {
            id: item.id,
            name: item.name,
            city: itemCity
        };
        await editUser(editUserItem);
        const newUsers = await fetchUsers(1);
        userContext.setUsers(newUsers);
    };
    useEffect(() => {
        fetchAll().then((data) => setCities(data));
        fetchUser(UserId).then((x) => {
            setData(x);
        });
    }, []);

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
        onEditUser(data);
        history.push("/Main?page=1");
    };

    if (!data) {
        return null;
    }

    return (
        <>
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
                    value={data.city.name}
                    type="city"
                />
                <button
                    type="submit"
                    className="btn btn-success w-100 mx-auto m-3"
                    disabled={!isValid}
                >
                    Сохранить
                </button>
            </form>

            <Link to="/Main">
                <button type="submit" className="btn btn-success w-100 mx-auto">
                    Отмена
                </button>
            </Link>
        </>
    );
};

export default EditUserForm;
