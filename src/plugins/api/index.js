import UsersService from "../api/services/UserService.js";

export const registerServices = (app) => {
    // Предоставляем UserService через provide
    app.provide("usersService", UsersService);
}