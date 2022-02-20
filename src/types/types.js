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
    },

    data: {
        addCourse: "[data] Add course",
        updateCourse: "[data] Update course",
        deleteCourse: "[data Delete course",

        addStudent: "[data] Add student",
        updateStudent: "[data[ Update student",
        deleteStudent: "[data] Delete student",

        dataLoad: "[data] Load data",
        fullDataErase: "[data] Erase full data",
    },

    activeCourse: {
        setActiveInstit: "[actCourse] Set active Institution",
        setActiveGroup: "[actCourse] Set active Group",
        setActiveCourse: "[actCourse] Set active Course",

        resetActives: "[actCourse] Reset active course",
    }
};