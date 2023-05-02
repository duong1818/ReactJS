import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { userService } from '../../services';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: []
        }
    }
    async componentDidMount() {
        let response = await userService.getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            // goi call back dde check get data 
            // , () => {
            //     console.log('check state user: ', this.state.arrUsers);
            // })
        }

    }

    /**
     * Lifecycle
     * Run component
     * 1. Run construct -> init state
     * 2. Didmount (setState)
     * 3. Render
     * 
     * @returns 
     */
    render() {
        // console.log('check render ', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users</div>
                <div className='users-table mt-4 mx-3'>
                <table>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    
                    {
                        arrUsers && arrUsers.map((item,index) => {
                            console.log('duong check map', item, index);
                            return (
                                <tr key={index}>
                                    <td> {item.email} </td>
                                    <td> {item.firstName} </td>
                                    <td> {item.lastName} </td>
                                    <td> {item.address} </td> 
                                    <td>
                                        <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                )
                        })                            
                    }
                    
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
