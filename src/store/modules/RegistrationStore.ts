import RegistrationService from "../../plugins/api/services/RegistrationService";

const registrationModule = {
    namespaced: true,
    state: {
        registrations: [],
        currentRegistration: {}
    },
    getters: {
        registrations: state => state.registrations,
        currentRegistration: state => state.currentRegistration
    },
    mutations: {
        SET_REGISTRATIONS(state, payload) {
            state.registrations = payload;
        },
        SET_CURRENT_REGISTRATION(state, payload) {
            state.currentRegistration = payload;
        },
        ADD_REGISTRATION(state, payload) {
            state.registrations.push(payload);
        }
    },
    actions: {
        
        async CREATE_REGISTRATION({ commit }, registrationData) {
            await RegistrationService.createRegistration(registrationData)
                .then(response => {
                    commit('ADD_REGISTRATION', response);
                    return response;
                })
                .catch(error => {
                    console.error('Ошибка при создании регистрации:', error);
                    throw error;
                });
        }
    }
}

export default registrationModule;