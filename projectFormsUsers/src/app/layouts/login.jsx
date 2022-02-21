import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import { login } from "../mocked-api/auth";
import { AuthContext } from "./../AuthContext";

const Login = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const onFormSubmit = async ({ email, password }) => {
        const user = await login(email, password);
        authContext.setUserInfo(user);
        history.push("/Main?page=1");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3>Вход</h3>

                    <LoginForm onSubmit={onFormSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Login;
