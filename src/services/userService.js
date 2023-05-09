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

    deleteUserService(id){
        console.log('delete user id:', id);
        //return axios.delete(`/api/delete-user?id=${id}`);
        return axios.delete('/api/delete-user',{
            data:{
                id: id
            }
        })
    }

}

export default userService;