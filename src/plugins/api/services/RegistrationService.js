import { API_BASE_URL, fetchData } from '../apiConfig.js';

class RegistrationService {
    constructor() {
    }

    // Создать новую заявку
    async createRegistration(registrationData) {
        return fetchData(`${API_BASE_URL}/registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
        });
    }

}

// Класс для работы с API заявок
const registrationService = new RegistrationService(API_BASE_URL);

// Экспортируем экземпляр
export default registrationService;
