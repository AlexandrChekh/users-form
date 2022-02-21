import React from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import UserListPage from "./userListPage";

const Table = ({
    users,
    onDecPage,
    onIncPage,
    onUserClick,
    toggleModal,
    onSort,
    renderSortArrow
}) => {
    return (
        <div>
            <UserListPage
                users={users}
                onUserClick={onUserClick}
                toggleModal={toggleModal}
                onSort={onSort}
                renderSortArrow={renderSortArrow}
            />
            <Pagination onIncPage={onIncPage} onDecPage={onDecPage} />
        </div>
    );
};
Table.propTypes = {
    users: PropTypes.array,
    onUserClick: PropTypes.func,
    toggleModal: PropTypes.func,
    onIncPage: PropTypes.func,
    onDecPage: PropTypes.func,
    onSort: PropTypes.func,
    renderSortArrow: PropTypes.func
};
export default Table;
