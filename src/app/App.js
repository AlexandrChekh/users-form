import React, { useState } from "react";
import {
    Switch,
    Redirect,
    Route
} from "react-router-dom/cjs/react-router-dom.min";
import Main from "./layouts/main";
import Login from "./layouts/login";
import User from "./layouts/user";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import Edit from "./layouts/edit";
import SecuredRoute from "./components/common/securedRoute";
import NotFound from "./components/common/notFound";
function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            <UserContext.Provider value={{ users, setUsers }}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <SecuredRoute exact path="/Main" component={Main} />
                        <SecuredRoute path="/Main/:UserId" component={Edit} />
                        <SecuredRoute path="/UserItem" component={User} />
                        <SecuredRoute path="/404" component={NotFound} />

                        <Redirect from="/" to="Main?page=1" />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
