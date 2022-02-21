import React from "react";
import EditUserForm from "../components/ui/editUserForm";
import Logout from "../components/ui/logout";
const Edit = () => {
    return (
        <>
            <Logout />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3>Редактирование пользователя</h3>
                        <EditUserForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
