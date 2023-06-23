import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import { ALLCODE_TYPE } from '../../utils';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await userService.getAllCodeService(ALLCODE_TYPE.GENDER);
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

            let res = await userService.getAllCodeService(ALLCODE_TYPE.ROLE);
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

            let res = await userService.getAllCodeService(ALLCODE_TYPE.POSITION);
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

            let res1 = await userService.getTopDoctorHomeService(2);
            if(res && res.errCode === 0){
                dispatch(getAllUsersSuccess(res.users));
            }else{
                dispatch(getAllUsersFailed());   
            }
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



/**
 * 
 * @param limit Number doctors to load
 * @returns 
 */
export const loadTopDoctors = (limit) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getTopDoctorHomeService(limit);

            if(res && res.errCode === 0){
                dispatch(loadTopDoctorsSuccess(res.doctors));
            }else{
                dispatch(loadTopDoctorsFailed());   
            }
        }catch(e){
            console.log(e);
            dispatch(loadTopDoctorsFailed()); 
        }
    }
}

export const loadTopDoctorsSuccess = (listDoctors) => ({
    type: actionTypes.GET_TOP_DOCTORS_SUCCESS,
    listDoctors: listDoctors
})

export const loadTopDoctorsFailed = () => ({
    type: actionTypes.GET_TOP_DOCTORS_FAILED,
})

export const getAllDoctors = () => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getALlDoctors();

            if(res && res.errCode === 0){
                dispatch(getAllDoctorsSuccess(res.doctors));
            }else{
                dispatch(getAllDoctorsFailed());   
            }
        }catch(e){
            console.log(e);
            dispatch(loadTopDoctorsFailed()); 
        }
    }
}

export const getAllDoctorsSuccess = (allDoctors) => ({
    type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
    allDoctors: allDoctors
})

export const getAllDoctorsFailed = () => ({
    type: actionTypes.GET_ALL_DOCTORS_FAILED,
})

export const createInfoDoctorStart = (infoDoctor) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.createInforDoctor(infoDoctor);
            if(res && res.errCode === 0){
                dispatch(createInfoDoctorSuccess());
                dispatch(getAllDoctors());
                toast.success("CREATE INFOR DOCTOR SUCCESSFUL!")
            }else{
                dispatch(createInfoDoctorFailed());   
                toast.warn("CREATE INFOR DOCTOR FAILED!");
            }
        }catch(e){
            dispatch(createInfoDoctorFailed()); 
            toast.warn("CREATE INFOR DOCTOR FAILED!");
        }
    }
}

export const createInfoDoctorSuccess = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_SUCCESS,
})

export const createInfoDoctorFailed = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_FAILED,
})

export const editInfoDoctorStart = (infoDoctor) => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.editInforDoctor(infoDoctor);
            if(res && res.errCode === 0){
                dispatch({type: actionTypes.EDIT_INFO_DOCTOR_SUCCESS});
                dispatch(getAllDoctors());
                toast.success("EDIT DOCTOR INFORMATION SUCCESSFUL!")
            }else{
                dispatch({type: actionTypes.EDIT_INFO_DOCTOR_FAILED});   
                toast.warn("EDIT DOCTOR INFORMATION FAILED!");
            }
        }catch(e){
            dispatch({type: actionTypes.EDIT_INFO_DOCTOR_FAILED}); 
            toast.warn("EDIT DOCTOR INFORMATION FAILED!");
        }
    }
}

export const getAllCodeTime = () => {
    return async (dispatch, getState) => {
        try{

            let res = await userService.getAllCodeService(ALLCODE_TYPE.TIME);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.GET_ALLCODE_TIME_SUCCESS,
                    allCodeTime: res.data
                });
            }else{
                dispatch({type: actionTypes.GET_ALLCODE_TIME_FAILED});   
            }
        }catch(e){
            dispatch({type: actionTypes.GET_ALLCODE_TIME_FAILED}); 
        }
    }
}

export const getAllCodeDoctorMore = () => {
    return async (dispatch, getState) => {
        try{

            let resPrice = await userService.getAllCodeService(ALLCODE_TYPE.PRICE);
            let resPayment = await userService.getAllCodeService(ALLCODE_TYPE.PAYMENT);
            let resProvince = await userService.getAllCodeService(ALLCODE_TYPE.PROVINCE);

            if(resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0){
                let allCodeDoctorMore = {};
                allCodeDoctorMore.prices = resPrice.data;
                allCodeDoctorMore.payments = resPayment.data;
                allCodeDoctorMore.provinces = resProvince.data;

                dispatch({
                    type: actionTypes.GET_ALLCODE_DOCTOR_MORE_SUCCESS,
                    allCodeDoctorMore: allCodeDoctorMore
                });
            }else{
                dispatch({type: actionTypes.GET_ALLCODE_DOCTOR_MORE_FAILED});   
            }

    
        }catch(e){
            dispatch({type: actionTypes.GET_ALLCODE_DOCTOR_MORE_FAILED});         }
    }
}

