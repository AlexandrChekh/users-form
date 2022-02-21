import React from "react";
import { PropTypes } from "prop-types";
const UserPage = ({ user, onUserClick }) => {
    return (
        <>
            <tr className="table-active" onClick={(e) => onUserClick(e, user)}>
                <td>{user.name}</td>
                <td>{user.city.name}</td>
                <td>
                    <i className="bi bi-trash"></i>
                </td>
            </tr>
        </>
    );
};
UserPage.propTypes = {
    user: PropTypes.object,
    onUserClick: PropTypes.func
};
export default UserPage;
