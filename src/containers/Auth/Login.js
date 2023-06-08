import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { userService } from '../../services';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {

        this.setState({
            username: event.target.value,
        })
        //console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {

        this.setState({
            password: event.target.value,
        })
        //console.log(event.target.value);
    }
    HandleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        // console.log('all state: ', this.state);
        try{
            let data = await userService.handleLogin(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message
                })               
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user);
                //console.log('login success', data);

            }

        }catch(e){
            console.log('error: ' , e.response);
            this.setState({
                errMessage: e.response.data.message
            })
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
        console.log('showPassword: ', this.state.isShowPassword);
    }

    handleKeyDown = (event) => {
        //console.log('keyDown: ', event);
        if(event.key === 'Enter' || event.keyCode === 13){
            //console.log('Enter key pressed');
            this.HandleLogin();
        }
    }

    render() {
        // JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type="text" className='form-control' placeholder='Enter your username' value={this.state.username} 
                                onChange={(event) => this.handleOnChangeUsername(event)} onKeyDown={this.handleKeyDown}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? "text":"password"} className='form-control' placeholder='Enter your password' value={this.state.password} 
                                    onChange={(event) => this.handleOnChangePassword(event)}  onKeyDown={(event) => this.handleKeyDown(event)}></input>
                                <span onClick={() => {this.handleShowHidePassword()}}> <i className={this.state.isShowPassword? "far fa-eye":"far fa-eye-slash"}></i> </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.HandleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g'></i>
                            <i className='fab fa-facebook-f'></i>

                        </div>
                    </div>
                </div>
            </div>
 
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
