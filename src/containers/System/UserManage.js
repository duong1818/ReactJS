import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { userService } from '../../services';
import ModalUser from './ModalUser';
import { emitter} from '../../utils/emitter';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            userEdit: {},
            isEditUser: false
        }
    }
    async componentDidMount() {
        console.log('didmount', this.state);
        await this.getAllUsersFromReact();   
    }

    getAllUsersFromReact = async () => {
        let response = await userService.getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            }
            //goi call back dde check get data 
            , () => {
                console.log('check state user: ', this.state.arrUsers);
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
            userEdit: {},
            isEditUser: false
        })
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    editUser = async (data) => {
        try{

            let response = await userService.editUserService(data);
            if(response && response.errCode === 0){
                console.log('edit ok');
                this.setState({
                    isOpenModalUser: false
                });
                await this.getAllUsersFromReact();
            }else{
                alert(response.errMessage)
            }


        }catch(e){
            console.log(e);
        }
    }

    createNewUser = async (data) => {
        try{
            let response = await userService.createNewUserService(data);
            if(response && response.errCode === 0){
                console.log('create new user Ok');
                this.setState({
                    isOpenModalUser: false
                })
                await this.getAllUsersFromReact();

                // emitter.emit('EVENT_CLEAR_MODAL_DATA', {
                //     'id': '',
                //     'email': '',
                //     'password': '',
                //     'firstName': '',
                //     'lastName': '',
                //     'phoneNumber': '',
                //     'gender': '1',
                //     'roleId': 'R1'
                // });
            }else{
                alert(response.errMessage);

            }
    
        }catch(e){
            console.log(e);

        }
    }

    handleDeleteUser = async (id) => {
        try{
            let response = await userService.deleteUserService(id);
            if(response && response.errCode === 0){
                console.log('delete user ok');
                await this.getAllUsersFromReact();
            }else{
                alert(response.errMessage); 
            }


        }catch(e){
            console.log(e);
        }
    }

    handleEditUser = async (data) => {
        try{

            this.setState({
                isOpenModalUser: true,
                userEdit: data,
                isEditUser: true
            })

        }catch (e){
            console.log(e);
        }
    }

    /**
     * Lifecycle
     * Run component
     * 1. Run construct -> init state
     * 2. Didmount (setState)
     * 3. Render
     * 4. DidUpdate
     * 
     * @returns 
     */
    render() {
        //console.log('Duong check userManage ', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent={this.toggleModalUser}
                    createNewUser= {this.createNewUser}
                    editUser= {this.editUser}
                    currentUser = {this.state.userEdit}
                    isEditUser = {this.state.isEditUser}
                />
                <div className="title text-center">Manage users</div>
                <div className='mx-1'>
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                <table>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        
                        {
                            arrUsers && arrUsers.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td> {item.email} </td>
                                        <td> {item.firstName} </td>
                                        <td> {item.lastName} </td>
                                        <td> {item.address} </td> 
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                    )
                            })                            
                        }
                    </tbody>
                    
                </table>


                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
