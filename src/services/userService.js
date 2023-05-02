import axios from '../axios';
const userService = {
    
    handleLogin(email,password){
        return axios.post('/api/login', {email, password});
    },

    getAllUsers(id){
        // template string : 
        return axios.get(`/api/get-all-users?id=${id}`);
    }

}

export default userService;