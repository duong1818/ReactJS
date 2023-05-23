import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
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
        default:
            return state;
    }
}

export default adminReducer;