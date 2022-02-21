import React from "react";
import PropTypes from "prop-types";

const MainBlock = ({ onClick }) => {
    return (
        <div
            className="d-flex justify-content-center bg-dark"
            style={{ flex: 1 }}
        >
            <div onClick={onClick}>
                <div
                    className="bg-success rounded-circle m-2"
                    style={{ height: 50 + "px", width: 50 + "px" }}
                ></div>
                <h6 style={{ fontSize: 10 + "px", color: "white" }}>
                    Пользователи
                </h6>
            </div>
        </div>
    );
};
MainBlock.propTypes = {
    onClick: PropTypes.func
};

export default MainBlock;
