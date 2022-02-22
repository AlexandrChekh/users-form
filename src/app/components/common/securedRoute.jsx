import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const SecuredRoute = (props) => {
    const { userInfo } = useContext(AuthContext);

    if (userInfo) {
        return <Route {...props} />;
    }

    return <Redirect to={"/"} />;
};

export default SecuredRoute;
