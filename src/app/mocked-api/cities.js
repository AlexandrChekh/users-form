import { v4 } from "uuid";
import { resolveAfterTimeout } from "./utils";

export const cities = [
    { id: v4(), name: "Анапа" },
    { id: v4(), name: "Волгоград" },
    { id: v4(), name: "Воронеж" },
    { id: v4(), name: "Краснодар" },
    { id: v4(), name: "Москва" },
    { id: v4(), name: "Сочи" }
];
export const fetchAll = () => resolveAfterTimeout(cities, 500);
