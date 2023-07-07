import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './ProfileDoctor.scss';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { userService } from '../../../services';
import _ from 'lodash';
import moment from 'moment';


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    renderTimeBooking = (dataTimeModal) => {
        let {language} = this.props;
        let timeBooking = '';
        if(dataTimeModal && !_.isEmpty(dataTimeModal) && dataTimeModal.date && dataTimeModal.timeData) {

            if(language === LANGUAGES.VI){
                timeBooking = dataTimeModal.timeData.valueVi + ' ' + CommonUtils.capitalizeFirstLetter(moment(new Date(dataTimeModal.date)).format('dddd - DD/MM/YYYY'));
            }else {
                timeBooking = dataTimeModal.timeData.valueEn + ' ' + moment(new Date(dataTimeModal.date)).locale('en').format('dddd - MM/DD/YYYY');

            }
        } 
        return timeBooking;
    }

    renderNameDoctor = (detailDoctor) => {
        let name = ''; 
        let {language} = this.props;
        if(detailDoctor && detailDoctor.positionData){

            if(language === LANGUAGES.VI){
                name = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;

            }else {
                name = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            }   
        }

        return name;
    };

    render() {
        let { detailDoctor, nameDoctor, timeBooking, displayDes } = this.props;
        console.log("render this.props : ", this.props);


        return (
            <div className='intro-doctor'>
                <div className={displayDes?'content-left size-lg':'content-left size-sm'} style={{backgroundImage: `url(${detailDoctor && detailDoctor.image? detailDoctor.image : ''})`}}></div> 
                <div className='content-right'>
                    <div className='up'>
                        {nameDoctor}
                    </div>
                    <div className='down' >
                        { displayDes ?
                            (detailDoctor && detailDoctor.doctorInformation && detailDoctor.doctorInformation.description && 
                                <span>{detailDoctor.doctorInformation.description}</span>)
                                :
                        (
                            <span>{timeBooking}</span>)
                        }
                    </div>
                </div>
         </div>
              

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
