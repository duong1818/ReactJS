import axios from '../axios';
const userService = {
    
    handleLogin(email,password){
        return axios.post('/api/login', {email, password});
    },

    getAllUsers(id){
        // template string : 
        return axios.get(`/api/get-all-users?id=${id}`);
    },

    createNewUserService(data){
        console.log('create new user: ', data);
        return axios.post('/api/create-new-user', data);
    },

    editUserService(data){
        console.log('edit user: ', data);
        return axios.put('/api/edit-user', data);
    },

    deleteUserService(id){
        console.log('delete user id:', id);
        //return axios.delete(`/api/delete-user?id=${id}`);
        return axios.delete('/api/delete-user',{
            data:{
                id: id
            }
        })
    },

    /**
     * type: string (gender, role, position, ...)
     * @param {*} type 
     */
    getAllCodeService(type){
        //console.log('duong check get all code input type : ', type);
        return axios.get(`/api/allcode?type=${type}`);
    },

    getTopDoctorHomeService(limit){
        return axios.get(`/api/top-doctor-home?limit=${limit}`); 
    },

    getALlDoctors(limit){
        return axios.get(`/api/get-all-doctors`); 
    },

    createInforDoctor(infoDoctor){
        //console.log('duong check create inforDoctor : ', infoDoctor);
        return axios.post(`/api/create-infor-doctor`,infoDoctor);
    },
    editInforDoctor(infoDoctor){
        //console.log('duong check create inforDoctor : ', infoDoctor);
        return axios.put(`/api/edit-infor-doctor`,infoDoctor);
    },
    getDetailDoctor(doctorId){
        //console.log('duong check doctorId :', doctorId);
        return axios.get(`/api/get-infor-doctor?id=${doctorId}`);
    },
    bulkCreateScheduleDoctor(schedule){
        return axios.post(`/api/bulk-create-schedule`,schedule);
    },
    getScheduleDoctorByDate(doctorId, date){
        return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
    }
}

export default userService;