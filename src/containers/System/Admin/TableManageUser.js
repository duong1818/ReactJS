import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';
class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            listUsers: []
        }
    }


    async componentDidMount(){

        try{

            this.props.getAllUsers();

        }catch(e){

            console.log(e);
        }
    }

    handleDeleteUser(userId){
        try{
            this.props.deleteUser(userId);

        }catch(e){

            console.log(e);
        }
    }

    handleEditUser(user){
        try{

            console.log('this.props: ', this.props);
            console.log('user: ', user);
            this.props.handleLoadUser(user);
        
        }catch(e){
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

        let listUsers = this.props.listUsers;
        //console.log("listUsers :" , listUsers);

        return (

                <table id='customers' className='customers-container'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {listUsers && listUsers.length > 0 && 
                            listUsers.map((item, index) => {

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
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.listUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.getAllUsersStart()),
        deleteUser: (userId) => dispatch(actions.deleteUserStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
