import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select';

import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import { ALLCODE_TYPE, CommonUtils, LANGUAGES, PATIENT_STATUS } from '../../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import { userService } from '../../../../services';
import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedGender: null,
            genders: {},
            selectedBirthDate: '',
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            
        };
    }

    async componentDidMount() {

        let res = await userService.getAllCodeService(ALLCODE_TYPE.GENDER);

        if(res && res.data && !_.isEmpty(res.data)) {
            let genders = CommonUtils.buildDataSelectForAllCode(res.data, this.props.language);
            //console.log("genders : ", genders);
            this.setState({
                genders
            });
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.language !== this.props.language){
            let res = await userService.getAllCodeService(ALLCODE_TYPE.GENDER);
            let genders = CommonUtils.buildDataSelectForAllCode(res.data, this.props.language);
            //console.log("genders : ", genders);
            this.setState({
                genders
            });
        }
    }

    handleSelectGenderChange = (selectedGender) => {

        this.setState({ selectedGender });

    }


    handleOnchangeDatePicker = (selectedDate) => {

        console.log("handleOnChangeDatePicker: ", selectedDate[0]);

        this.setState({ selectedBirthDate: selectedDate[0] });
    };

    handleOnchangeInput = (event, id) => {

        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({ ...copyState });
    }

    handleToggle = () => {

        this.setState({ 
            selectedBirthDate: '',
            selectedGender: null,
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
        });
        this.props.isToggleModalBooking();
    }

    handleConfirmBooking = async () => {
        
        try{

            let birthDate = new Date(this.state.selectedBirthDate).getTime();
            
            //console.log('confirmBooking: ', this.state, birthDate, this.props.dataTimeModal);

            let patientInfo = {};

            let fullName = this.state.fullName;
            patientInfo.firstName = fullName ? fullName.slice(0,fullName.indexOf(" ")) : '';
            patientInfo.lastName = fullName ? fullName.slice(fullName.indexOf(" ") + 1) : '';
            patientInfo.fullName = fullName;
            

            patientInfo.email = this.state.email;
            patientInfo.phoneNumber = this.state.phoneNumber;
            patientInfo.address = this.state.address;
            patientInfo.reason = this.state.reason;
            patientInfo.birthDate = birthDate ? birthDate : '';
            patientInfo.gender = this.state.selectedGender ? this.state.selectedGender.value : '';

            patientInfo.doctorId = this.props.dataTimeModal.doctorId;
            patientInfo.statusId = PATIENT_STATUS.NEW;
            patientInfo.date = this.props.dataTimeModal.date;
            patientInfo.timeKey = this.props.dataTimeModal.timeKey;
            patientInfo.doctorName = this.renderDoctorName(this.props.detailDoctor);
            patientInfo.timeBooking = this.renderTimeBooking(this.props.dataTimeModal);
            //patientInfo.confirmLink = "https://www.youtube.com/watch?v=O8ZHWwn5bGk&t=61s";
            patientInfo.language = this.props.language;

            let res = await userService.createPatientBooking(patientInfo);

            if(res && res.errCode === 0){
                toast.success("Booking created successfully!");
                this.handleToggle();
            }else {
                toast.error("Booking is creating fail!");
                console.log(res ? res.errMessage : '');

            }
        }catch(e){
            console.log(e);
        }
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

    renderDoctorName = (detailDoctor) => {
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

        let {dataTimeModal, detailDoctor, language} = this.props;
        let priceData = {};
        if(detailDoctor && !_.isEmpty(detailDoctor) && !_.isEmpty(detailDoctor.doctorInforMore) && !_.isEmpty(detailDoctor.doctorInforMore.priceData)){
            priceData = detailDoctor.doctorInforMore.priceData;
        }
        return (

                <Modal isOpen={this.props.isOpenModalBooking} toggle={() => this.handleToggle()} className={'modal-booking-container'} size="lg" centered>
                    <div className='booking-content'>
                        <div className='booking-header'>
                            <span className='left'><FormattedMessage id="patient.bookingModal.title"/></span>
                            <span className='right' onClick={() => this.handleToggle()}><i className="fas fa-times"></i></span>

                        </div>
                        <div className='booking-body container'>
                            <div className='doctor-infor'>
                                <ProfileDoctor detailDoctor={detailDoctor} timeBooking={this.renderTimeBooking(dataTimeModal)} nameDoctor={this.renderDoctorName(detailDoctor)} displayDes={false}/>
                            </div>
                            <div className='price'>
                                <FormattedMessage id="patient.bookingModal.examination-price"/>: {language === LANGUAGES.VI ?
                                    <NumberFormat className='currency' value={priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={"VND"}/>
                                    : 
                                    <NumberFormat className='currency' value={priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={"$"}/>
                                    }
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.fullName"/></label>
                                    <input className='form-control' value={this.state.fullName} onChange={(event) => this.handleOnchangeInput(event, "fullName")}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.phoneNumber"/></label>
                                    <input className='form-control' value={this.state.phoneNumber} onChange={(event) => this.handleOnchangeInput(event, "phoneNumber")}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.email"/></label>
                                    <input className='form-control' value={this.state.email} onChange={(event) => this.handleOnchangeInput(event, "email")}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.address"/></label>
                                    <input className='form-control' value={this.state.address} onChange={(event) => this.handleOnchangeInput(event, "address")}></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.reason"/></label>
                                    <input className='form-control' value={this.state.reason} onChange={(event) => this.handleOnchangeInput(event, "reason")}></input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.date-birth"/></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        className='form-control'
                                        value={this.state.selectedBirthDate}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.bookingModal.genders"/></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleSelectGenderChange}
                                        options={this.state.genders}>
                                    </Select>
                                </div>
                            </div>

                        </div>
                        <div className='booking-footer'>
                            <button className='btn-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.bookingModal.confirm"/></button>
                            <button className='btn-cancel' onClick={() => this.handleToggle()}><FormattedMessage id="patient.bookingModal.cancel"/></button>

                        </div>
                    </div>

                </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
