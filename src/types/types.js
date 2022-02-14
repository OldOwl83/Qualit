export const actionTypes = {

    auth: {
        login: "[Auth] Login",
        logout: "[Auth] Logout",

        firebaseInstancesRecord: "[FireBaseInst] Record",
    },

    ui: {
        isLoading: "[Load] Loading",
        isNotLoading: "[Load] Not loading",

        setFormScreen: "[FormScreen] Set",
        unsetFormScreen: "[FormScreen] Unset",
    },

    usProf: {
        updateData: "[usProf] Update profile data",
        deleteData: "[usProf] Delete profile data",
    }
};