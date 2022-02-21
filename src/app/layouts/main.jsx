import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import MainBlock from "../components/common/mainBlock";
import ModalWindow from "../components/common/modalWindow/modalWindow";
import Table from "../components/common/table/table";
import Logout from "../components/ui/logout";
import { fetchUsers, deleteUser, sort } from "../mocked-api/users";
import { UserContext } from "../UserContext";
export function useQuery() {
    const { search } = useLocation();

    return search
        .replace("?", "")
        .split("=")

        .reduce((res, current, index, arr) => {
            if (index % 2 === 0) {
                return { ...res, [current]: arr[index + 1] };
            }

            return res;
        }, {});
}

const Main = () => {
    const userContext = useContext(UserContext);
    const { page } = useQuery();
    const history = useHistory();
    const [userItem, setDeleteUSer] = useState("");
    const [modalActive, setModalActive] = useState(false);

    const currentPage = Number(page);
    const onMainPage = async () => {
        const newUsers = await fetchUsers(1);
        userContext.setUsers(newUsers);
        history.push("/Main?page=1");
    };
    const removeUser = async (id) => {
        await deleteUser(id);
        toggleModal();
        onMainPage();
    };
    useEffect(() => {
        fetchUsers(page).then((x) => userContext.setUsers(x));
    }, []);

    const onUserClick = (e, user) => {
        if (e.target.className === "bi bi-trash") {
            return toggleModal(user);
        }
        history.push(`Main/${user.id}`);
    };
    const toggleModal = (item) => {
        setModalActive(!modalActive);

        if (item) {
            setDeleteUSer(item);
        }
    };

    const onIncPage = async () => {
        const newUsers = await fetchUsers(currentPage + 1);
        userContext.setUsers(
            newUsers.length > 0 ? newUsers : userContext.users
        );
        history.push(
            `/Main?page=${newUsers.length > 0 ? currentPage + 1 : currentPage}`
        );
    };
    const onDecPage = async () => {
        const newUsers = await fetchUsers(
            currentPage === 1 ? 1 : currentPage - 1
        );
        userContext.setUsers(newUsers);
        history.push(`/Main?page=${currentPage === 1 ? 1 : currentPage - 1}`);
    };
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const renderSortArrow = (item) => {
        if (sortBy.iter === item) {
            if (sortBy.order === "asc") {
                return <i className="bi bi-caret-up-fill"></i>;
            } else {
                return <i className="bi bi-caret-down-fill"></i>;
            }
        } else {
            return <i className="bi bi-caret-down-fill"></i>;
        }
    };
    const onSort = async (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc"
            }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
        await sort([sortBy.iter], [sortBy.order]);
        onMainPage();
    };
    return (
        <div className="d-flex">
            <MainBlock onClick={onMainPage} />

            <div style={{ flex: 12 }}>
                <Logout />
                <div className="m-5">
                    <Link to="/UserItem">
                        <div className="btn btn-success" role="button">
                            Добавить пользователя{" "}
                        </div>
                    </Link>
                    {userContext.users.length > 0 && (
                        <Table
                            users={userContext.users}
                            page={Number(page)}
                            onUserClick={onUserClick}
                            toggleModal={toggleModal}
                            onIncPage={onIncPage}
                            onDecPage={onDecPage}
                            onSort={onSort}
                            renderSortArrow={renderSortArrow}
                        />
                    )}
                </div>
                {modalActive && (
                    <ModalWindow
                        onRemove={removeUser}
                        user={userItem}
                        toggleModal={toggleModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Main;
