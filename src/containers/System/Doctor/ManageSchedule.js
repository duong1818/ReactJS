import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { CardColumns, Col } from 'reactstrap';

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
            this.setState({
                rangeTime: this.props.allCodeTime
            })
        }

    }

    handleSelectChange = (selectedDoctor) => {

        if(selectedDoctor){

            console.log('handleSelectChange: ', selectedDoctor);

            this.setState({
                selectedDoctor: selectedDoctor,
            })

            // let allDoctors = this.props.allDoctors;

            // allDoctors.map((item ,index) => {
            //     if(selectedDoctor.value === item.id){
            //         let contentMarkdown = item.doctorInformation.contentMarkdown? item.doctorInformation.contentMarkdown : '';
            //         let contentHTML = item.doctorInformation.contentHTML? item.doctorInformation.contentHTML : '';
            //         let description =  item.doctorInformation.description? item.doctorInformation.description : '';
            //         let isEdit = item.doctorInformation.doctorId ? true : false;
            //         //console.log("item : " , item);
            //         this.setState({ 
            //             selectedDoctor: selectedDoctor,
            //             contentMarkdown: contentMarkdown,
            //             contentHTML: contentHTML,
            //             description: description,
            //             isEdit: isEdit 
            //         }, () =>
            //           console.log(`State :`, this.state)
            //         );
            //     }
            
            // })
    
        }
    };

    handleOnchangeDatePicker = (date) => {
        //console.log("onchange: ", date);
        this.setState({ 
            currentDate: date[0]
        });

    }

    render() {
        console.log("this state: ", this.props);
        let {language} = this.props;
        let {rangeTime} = this.state;
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
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index) => {
                                    return(
                                        <button className='btn btn-schedule' key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                            {/* <FormattedDate value={this.state.currentDate}/> */}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.save-schedule"/></button>
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
