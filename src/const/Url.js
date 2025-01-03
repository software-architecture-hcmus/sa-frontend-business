// backend url

import { REFRESH_TOKEN } from "./LocalStorage";

const Url = {
    // LOGIN: "/login",
    // REGISTER: "/register",
    CREATE_EVENT: "/api/v1/events",
    GET_EVENTS: "/api/v1/events",
    GET_EVENT_DETAIL: "/api/v1/events/:id",
    GET_GAME: "/api/v1/games",
    CREATE_GAME: "/api/v1/games",
    GET_GAME_DETAIL: "/api/v1/games/detail/:id",
    GET_DEFAULT_GAME: "/api/v1/games/default",
    GET_NEW_TOKEN: "api/v1/refresh-token",
    DELETE_EVENT: (id) => `api/v1/events/delete/${id}`,
    UPDATE_EVENT: (id) => `api/v1/events/update/${id}`,
    
}

export default Url;