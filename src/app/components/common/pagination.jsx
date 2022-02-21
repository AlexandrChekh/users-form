import React from "react";
import PropTypes from "prop-types";
const Pagination = ({ onIncPage, onDecPage }) => {
    return (
        <nav>
            <ul className="pagination">
                <li className={"page-item"}>
                    <button className="page-link" onClick={onDecPage}>
                        ←
                    </button>
                </li>
                <li className={"page-item"}>
                    <button className="page-link" onClick={onIncPage}>
                        →
                    </button>
                </li>
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    onIncPage: PropTypes.func,
    onDecPage: PropTypes.func
};
export default Pagination;
