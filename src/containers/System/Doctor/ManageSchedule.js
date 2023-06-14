import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { CardColumns, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { userService } from '../../../services';

class ManageSchedule extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedDoctor: null,
            selectSource: [],
            currentDate: '',
            rangeTime: []

        }
    }

    async componentDidMount(){
        this.props.getAllDoctors();
        this.props.getAllCodeTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];

        let language = this.props.language;

        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`; 
                object.label = language === LANGUAGES.VI ? labelVi: labelEn;
                object.value = item.id; 
                result.push(object);           
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let selectSource = this.buildDataInputSelect(this.props.allDoctors); 
            this.setState({
                selectSource: selectSource,
            })
        }

        if(prevProps.allCodeTime !== this.props.allCodeTime) {

            let data = this.props.allCodeTime;

            if(data && data.length > 0) {

                // data.map( item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map( item => ({...item, isSelected: false}));

                this.setState({
                    rangeTime: data
                })
            }

        }

    }

    handleSelectChange = (selectedDoctor) => {

        if(selectedDoctor){

            console.log('handleSelectChange: ', selectedDoctor);

            this.setState({
                selectedDoctor: selectedDoctor,
            })
    
        }
    };

    handleOnchangeDatePicker = (date) => {
        //console.log("onchange: ", date);
        this.setState({ 
            currentDate: date[0]
        });

    }

    handleOnClickTime = (item) => {

        let {rangeTime} = this.state;

        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(data => {
                if(data.id === item.id){
                    data.isSelected = !data.isSelected;
                }
                return data;
            });
            //console.log("rangeTime: ", rangeTime);

            this.setState({
                rangeTime: rangeTime
            });
        }

    };

    handleSaveSchedule = async () => {
        
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        if(!currentDate){
            toast.error("Invalid date!");
            return;
        }
        if(!selectedDoctor || _.isEmpty(selectedDoctor)){
            toast.error("Doctor is not selected!");
            return;
        }

        let result = [];
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    //object.date = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
                    // object.date = moment(currentDate).unix();  
                    object.date = new Date(currentDate).getTime();

                    object.timeKey = schedule.key;

                    result.push(object);

    
                })

            }else{
                toast.error("Range time is not selected!");
                return;
            }
        }

        let res = await userService.bulkCreateScheduleDoctor(result);

        if(res && res.errCode === 0){
            toast.success("Schedule was successfully saved!");
            console.log('response : ', res);
            console.log('check result : ' , result);
    
        }else{
            toast.error("Schedule creating was failed!");
        }

    }

    render() {
        //console.log("this state: ", this.state.rangeTime);
        let {language} = this.props;
        let {rangeTime} = this.state;
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        console.log("check day : ", yesterday)
        return (
            <div className="manage-schedule-container">
                <div className='m-s-title'><FormattedMessage id="manage-schedule.title"/></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 f'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleSelectChange}
                                options={this.state.selectSource}>
                            </Select>
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index) => {
                                    return(
                                        <button className={item.isSelected?'btn btn-schedule active':'btn btn-schedule'} key={index} onClick={()=>this.handleOnClickTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                            {/* <FormattedDate value={this.state.currentDate}/> */}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule' onClick={() => this.handleSaveSchedule()}><FormattedMessage id="manage-schedule.save-schedule"/></button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allCodeTime: state.admin.allCodeTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        getAllCodeTime: () => dispatch(actions.getAllCodeTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
