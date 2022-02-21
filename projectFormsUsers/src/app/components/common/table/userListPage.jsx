import React from "react";
import UserPage from "./userPage";
import PropTypes from "prop-types";
const UserListPage = ({
    users,
    onUserClick,
    toggleModal,
    onSort,
    renderSortArrow
}) => {
    return (
        <div>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => onSort("name")}>
                                Фио {renderSortArrow("name")}
                            </th>
                            <th onClick={() => onSort("city")}>
                                Город {renderSortArrow("city")}
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        {users.map((user) => (
                            <UserPage
                                key={user.id}
                                user={user}
                                onUserClick={onUserClick}
                                toggleModal={toggleModal}
                            />
                        ))}
                    </thead>
                </table>
            )}
        </div>
    );
};
UserListPage.propTypes = {
    users: PropTypes.array,
    page: PropTypes.number,
    onUserClick: PropTypes.func,
    toggleModal: PropTypes.func,
    onEdit: PropTypes.func,
    onSort: PropTypes.func,
    renderSortArrow: PropTypes.func
};
export default UserListPage;
