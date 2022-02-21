import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
const Logout = () => {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const handleLogout = () => {
        setUserInfo(null);
    };

    return (
        <div className="d-flex justify-content-end">
            <h1 className="btn btn-outline-success m-3">{userInfo.fullName}</h1>
            <button className="btn btn-success m-3" onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
};

export default Logout;
