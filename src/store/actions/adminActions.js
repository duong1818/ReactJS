import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await userService.getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());   
            }
    
        }catch(e){
            dispatch(fetchGenderFailed()); 
        }
    }
}

export const fetchGenderSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genders: genders
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());   
            }
    
        }catch(e){
            dispatch(fetchRoleFailed()); 
        }
    }
}

export const fetchRoleSuccess = (roles) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roles: roles
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
    
        }catch(e){
            dispatch(fetchPositionFailed());
             
        }
    }
}

export const fetchPositionSuccess = (positions) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positions: positions
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const addUserStart = (user) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.createNewUserService(user);
            if(res && res.errCode === 0){
                dispatch(addUserSuccess());
                dispatch(getAllUsersStart());
                toast.success("ADD USER SUCCESSFUL!")
            }else{
                dispatch(addUserFailed());   
                toast.warn("ADD USER FAILED!");
            }
            console.log(res)

    
        }catch(e){
            dispatch(addUserFailed()); 
        }
    }
}

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
})

export const addUserFailed = () => ({
    type: actionTypes.ADD_USER_FAILED,
})

export const editUserStart = (user) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.editUserService(user);
            if(res && res.errCode === 0){
                dispatch(editUserSuccess());
                dispatch(getAllUsersStart());
                toast.success("EDIT USER SUCCESSFUL!")
            }else{
                dispatch(editUserFailed());
                toast.warn("EDIT USER FAILED!");   
            }
            console.log(res)

    
        }catch(e){
            dispatch(editUserFailed()); 
            toast.warn("EDIT USER FAILED!");
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})


/**
 * 
 * @param {*} 'ALL' or {userId}
 * @returns 
 */
export const getAllUsersStart = () => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getAllUsers('ALL');
            if(res && res.errCode === 0){
                dispatch(getAllUsersSuccess(res.users));
            }else{
                dispatch(getAllUsersFailed());   
            }
            //console.log(res)

    
        }catch(e){
            dispatch(getAllUsersFailed()); 
        }
    }
}

export const getAllUsersSuccess = (listUsers) => ({
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    listUsers: listUsers
})

export const getAllUsersFailed = () => ({
    type: actionTypes.GET_ALL_USERS_FAILED,
})

export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.deleteUserService(userId);
            if(res && res.errCode === 0){
                dispatch(deleteUserSuccess());
                dispatch(getAllUsersStart());
                toast.success("DELETE USER SUCCESSFUL!")

            }else{
                dispatch(deleteUserFailed());   
                toast.warn("DELETE USER FAILED!")
            }
            //console.log(res)

    
        }catch(e){
            dispatch(deleteUserFailed()); 
            toast.warn("DELETE USER FAILED!")
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

