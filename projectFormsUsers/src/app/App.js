import React, { useState } from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom/cjs/react-router-dom.min";
import Main from "./layouts/main";
import Login from "./layouts/login";
import User from "./layouts/user";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import Edit from "./layouts/edit";
function App() {
    const [userInfo, setUserInfo] = useState(null);
    const [users, setUsers] = useState([]);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            <UserContext.Provider value={{ users, setUsers }}>
                <div>
                    <Switch>
                        {userInfo === null && (
                            <>
                                <Route path="/" exact component={Login} />
                            </>
                        )}
                        {userInfo !== null && (
                            <>
                                <Route exact path="/Main" component={Main} />
                                <Route path="/Main/:UserId" component={Edit} />
                                <Route path="/UserItem" component={User} />

                                <Redirect from="/" to="Main?page=1" />
                            </>
                        )}
                    </Switch>
                </div>
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
