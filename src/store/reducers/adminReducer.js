import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    listUsers: [],
    listDoctors: [],
    allDoctors: [],
    allCodeTime: []
}

const adminReducer = (state = initialState, action) => {
    let copyState = {};

    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState = {...state};
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState = {...state};
            copyState.isLoadingGender = false;
            copyState.genders = action.genders;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            copyState = {...state};
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState = {...state};
            copyState.roles = action.roles;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                roles: []
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState = {...state};
            copyState.positions = action.positions;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                positions: []
            }
        case actionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADD_USER_FAILED:
            return {
                ...state,
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.EDIT_USER_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USERS_SUCCESS:
            copyState = {...state}
            let listUser = action.listUsers
            listUser.reverse();
            copyState.listUsers = listUser;

            return {
                ...copyState,
            }
        case actionTypes.GET_ALL_USERS_FAILED:
            return {
                ...state,
                listUsers: []
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.DELETE_USER_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTORS_SUCCESS:
            copyState = {...state};
            let listDoctors = action.listDoctors;
            //listUser.reverse();
            copyState.listDoctors = listDoctors;

            //console.log('ListDoctors : ', action)

            return {
                ...copyState,
            }
        case actionTypes.GET_TOP_DOCTORS_FAILED:
            return {
                ...state,
                listDoctors: []
            }
        case actionTypes.GET_ALL_DOCTORS_SUCCESS:
            copyState = {...state};
            let allDoctors = action.allDoctors;
            copyState.allDoctors = allDoctors;

            return {
                ...copyState,
            }
        case actionTypes.GET_ALL_DOCTORS_FAILED:
            return {
                ...state,
                allDoctors: []
            }
        case actionTypes.CREATE_INFO_DOCTOR_SUCCESS:

            return {
                ...state,
            }
        case actionTypes.CREATE_INFO_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.EDIT_INFO_DOCTOR_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.EDIT_INFO_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.GET_ALLCODE_TIME_SUCCESS:
            return {
                ...state,
                allCodeTime: action.allCodeTime
            }
        case actionTypes.GET_ALLCODE_TIME_FAILED:
            return {
                ...state,
                allCodeTime: []
            }
                            
        default:
            return state;
    }
}

export default adminReducer;