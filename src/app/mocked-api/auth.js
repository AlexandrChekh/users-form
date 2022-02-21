import { rejectAfterTimeout, resolveAfterTimeout } from "./utils";

const WHITELIST_MOCKED_USERS = [
    {
        email: "asdf@mail.ru",
        password: "Qwerty12",
        fullName: "Petrov Petr Petrovich"
    }
];

export const login = async (email, password) => {
    const user = WHITELIST_MOCKED_USERS.find(
        (x) => x.email === email && x.password === password
    );

    if (user) {
        return await resolveAfterTimeout(user, 300);
    } else {
        await rejectAfterTimeout(new Error("User not found"), 300);
    }
};
