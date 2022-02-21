import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserForm from "../components/ui/userForm";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import Logout from "../components/ui/logout";
import MainBlock from "../components/common/mainBlock";
import { fetchUsers } from "../mocked-api/users";
const User = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);

    const onBlockClick = async () => {
        const newUsers = await fetchUsers(1);
        userContext.setUsers(newUsers);
        history.push("/Main?page=1");
    };

    return (
        <div className="d-flex">
            <MainBlock onClick={onBlockClick} />

            <div style={{ flex: 15 }}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <h3
                            className="text-black-50 m-3"
                            onClick={onBlockClick}
                        >
                            Пользователи
                        </h3>
                    </div>
                    <Logout />
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 p-4">
                            <h3>Добавление пользователя</h3>
                            <UserForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
User.propTypes = {
    addUser: PropTypes.func
};
export default User;
