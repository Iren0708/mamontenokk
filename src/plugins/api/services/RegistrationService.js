import { fetchData } from '../apiConfig';

export default class RegistrationService {
  static async createRegistration(data) {
    return fetchData('registrations', data);
  }
}
