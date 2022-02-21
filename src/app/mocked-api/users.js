import { v4 } from "uuid";
import { cities } from "./cities";
import { rejectAfterTimeout, resolveAfterTimeout } from "./utils";
import _ from "lodash";

let MOCKED_USERS = [
    { id: v4(), name: "Test test", city: cities[0] },
    { id: v4(), name: "Test test1", city: cities[1] },
    { id: v4(), name: "Test test2", city: cities[2] },
    { id: v4(), name: "Test test3", city: cities[3] }
];

export const fetchUsers = (page) => {
    const pageSize = 4;
    const startIndex = (page - 1) * pageSize;
    const users = MOCKED_USERS;

    return resolveAfterTimeout([...users].splice(startIndex, pageSize), 500);
};

export const fetchUser = (id) => {
    const user = MOCKED_USERS.find((x) => x.id === id);

    if (user) {
        return resolveAfterTimeout(user, 500);
    } else {
        return rejectAfterTimeout(new Error("Not found"), 1000);
    }
};

export const deleteUser = (id) => {
    MOCKED_USERS = MOCKED_USERS.filter((x) => x.id !== id);
    return resolveAfterTimeout(null, 1000);
};
export const editUser = (item) => {
    MOCKED_USERS = MOCKED_USERS.map((x) => {
        if (x.id !== item.id) {
            return x;
        } else {
            return item;
        }
    });

    return resolveAfterTimeout(null, 1000);
};
export const addUser = (item) => {
    MOCKED_USERS.push(item);
    return resolveAfterTimeout(null, 1000);
};
export const sort = (iter, order) => {
    MOCKED_USERS = _.orderBy(MOCKED_USERS, iter, order);
    return resolveAfterTimeout(null, 1000);
};

export default sort;
