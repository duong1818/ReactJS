import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { userService } from '../../../services';
import { first } from 'lodash';
import { FormattedMessage } from 'react-intl';

const MAX_NUM_DAYS = 7;
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allDays: [],
            allAvailableTimes: []

        }
    }

    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setAllDaysForSelection(){
        let { language } = this.props;

        // console.log('moment vi :',moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment en :',moment(new Date()).locale('en').format('ddd - DD/MM'));

        let allDays = [];
        for (let i = 0; i < MAX_NUM_DAYS; i++) {
            let object = {};

            if(i === 0) {
                object.label = language === LANGUAGES.VI ? 
                    'Hôm nay - ' + moment(new Date()).add(i, 'days').format('DD/MM')
                    : 
                    'Today - ' + moment(new Date()).add(i, 'days').locale('en').format('DD/MM');
            }else{
                object.label = language === LANGUAGES.VI ? 
                    this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
                    : 
                    moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').unix();//.valueOf();
            allDays.push(object);

        }

        this.setState({
            allDays: allDays,
        });

    }

    async setAllTimesForDay(dateUnix){
        if(this.props.doctorId && this.props.doctorId !== -1){
            let doctorId = this.props.doctorId;
            //let dateUnix = event.target.value;

            let response = await userService.getScheduleDoctorByDate(doctorId, dateUnix);
    
            
            console.log('doctorId , schedules : ', doctorId, response , new Date() - 1);
            if(response && response.errCode === 0){
                this.setState({
                    allAvailableTimes: response.schedules ? response.schedules : []
                })
            }
        } 
    }

    async componentDidMount() {
        this.setAllDaysForSelection();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language) {
            this.setAllDaysForSelection();
        }
        if(prevProps.doctorId !== this.props.doctorId){
            console.log('state.allDays : ', this.state.allDays);
            console.log('doctorId : ', this.props.doctorId);
            if(this.state.allDays && this.state.allDays.length > 0){
                let firstDayUnix = this.state.allDays[0].value;
                this.setAllTimesForDay(firstDayUnix);
            }
        }
    }

    handleSelectChange = async (event) => {
        this.setAllTimesForDay(event.target.value);
    }


    render() {

        let {allDays, allAvailableTimes} = this.state;
        //console.log('allDays : ',allDays, allAvailableTimes);
        let {language} = this.props;

        return (
            <div className='doctor-schedule-container'>
                 <div className='all-schedule'>
                    <select onChange={(event) => this.handleSelectChange(event)}>
                        {
                            allDays && allDays.length > 0 && 
                            allDays.map((item , index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                 </div>
                 <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'><span><FormattedMessage id="patient.detail-doctor.schedule"/></span></i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTimes && allAvailableTimes.length>0 ? 
                        <React.Fragment>
                            {
                                <div className='time-content-btns'>
                                    {
                                        allAvailableTimes.map((item, index) => {
                                            return (
                                                <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'} >{language === LANGUAGES.VI ? item.timeData?item.timeData.valueVi:'' : item.timeData?item.timeData.valueEn:''}</button>
                                            )
                                        })

                                    }
                                </div>
                            }
                            <div className='book-free'>
                                <span><FormattedMessage id='patient.detail-doctor.choose'/> <i class='far fa-hand-point-up'/> <FormattedMessage id='patient.detail-doctor.book-free'/></span>
                            </div>
                        </React.Fragment>
                            : 
                            <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule"/></div>
                        }
                    </div>
                 </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
