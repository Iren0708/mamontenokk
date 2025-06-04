import UsersService from "../api/services/UserService.js";
import RegistrationService from "../api/services/RegistrationService.js";

export const registerServices = (app) => {
    // Предоставляем UserService через provide
    app.provide("usersService", UsersService);
    // Предоставляем RegistrationService через provide
    app.provide("registrationService", RegistrationService);
}