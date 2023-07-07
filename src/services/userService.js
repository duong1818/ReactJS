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
        return axios.post('/api/create-new-user', data);
    },

    editUserService(data){
        return axios.put('/api/edit-user', data);
    },

    deleteUserService(id){
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
        return axios.get(`/api/allcode?type=${type}`);
    },

    getTopDoctorHomeService(limit){
        return axios.get(`/api/top-doctor-home?limit=${limit}`); 
    },

    getALlDoctors(limit){
        return axios.get(`/api/get-all-doctors`); 
    },

    createInforDoctor(infoDoctor){
        return axios.post(`/api/create-infor-doctor`,infoDoctor);
    },
    editInforDoctor(infoDoctor){
        return axios.put(`/api/edit-infor-doctor`,infoDoctor);
    },
    getDetailDoctor(doctorId){
        return axios.get(`/api/get-infor-doctor?doctorId=${doctorId}`);
    },
    bulkCreateScheduleDoctor(schedule){
        return axios.post(`/api/bulk-create-schedule`,schedule);
    },
    getScheduleDoctorByDate(doctorId, date){
        return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
    },
    getInforDoctorExtra(doctorId){
        return axios.get(`/api/get-infor-doctor-extra?doctorId=${doctorId}`);
    },
    createPatientBooking(patient){
        return axios.post('/api/create-patient-booking', patient);
    },
    verifyBooking(token,doctorId){
        return axios.post(`/api/verify-booking?token=${token}&doctorId=${doctorId}`);
    },
    createSpecialty(specialty){
        return axios.post(`/api/create-specialty`, specialty);
    },
}

export default userService;