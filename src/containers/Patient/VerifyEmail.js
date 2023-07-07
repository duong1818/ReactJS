import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../services';
import HomeHeader from '../HomePage/HomeHeader';

import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusVerify: false,
            errCode: -1,
        }
    }

    async componentDidMount() {

        if(this.props.location && this.props.location.search){

            let query = new URLSearchParams(this.props.location.search);
            const token = query.get('token');
            const doctorId = query.get('doctorId');

            let res = await userService.verifyBooking(token, doctorId);

            console.log("res : ",res);
            if(res){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        //console.log("render: ", this.state);

        let {statusVerify, errCode} = this.state;
        
        return (
            <> 
                <HomeHeader isShowBanner={false}/>

                <div className='verify-email-container'>
                    {!statusVerify ? 
                        <div>
                            loading...                    
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='info-booking'><FormattedMessage id="patient.bookingModal.verify-email-success"/></div>
                            :
                                <div className='info-booking'><FormattedMessage id="patient.bookingModal.verify-email-fail"/></div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
