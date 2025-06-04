import {createStore} from 'vuex'
import usersStore from "@/store/modules/UsersStore.js";
import registrationStore from "@/store/modules/RegistrationStore.js";

export default createStore({
    modules: {
        usersStore: usersStore,
        registrationStore: registrationStore
    }
})