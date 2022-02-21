import React from "react";
import { PropTypes } from "prop-types";
import "./style.css";
const ModalWindow = ({ onRemove, user, toggleModal }) => {
    return (
        <div className="modal-window">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Удаление пользователя:</h5>
                    </div>
                    <div className="modal-body">
                        <p>ФИО: {user.name}</p>
                        <p>Город: {user.city.name}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={toggleModal}
                        >
                            Отмена
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => onRemove(user.id)}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
ModalWindow.propTypes = {
    user: PropTypes.object,
    toggleModal: PropTypes.func,
    onRemove: PropTypes.func
};
export default ModalWindow;
