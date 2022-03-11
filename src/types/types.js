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

        dataSaved: "[Save] Data is saved",
        dataUnsaved: "[Save] Data is not saved",
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

        addStage: "[data] Add stage",
        updateStage: "[data[ Update stage",
        deleteStage: "[data] Delete stage",

        addTestGroup: "[data] Add testGroup",
        updateTestGroup: "[data[ Update testGroup",
        deleteTestGroup: "[data] Delete testGroup",

        addTest: "[data] Add test",
        updateTest: "[data[ Update test",
        deleteTest: "[data] Delete test",

        setScore: "[data] Set score",

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

export const dataTypes = {

    demo: {
        uid: '[demo] qualitDemo',
    }
}