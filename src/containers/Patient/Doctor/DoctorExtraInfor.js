import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './DoctorExtraInfor.scss';
import { userLoginFail } from '../../../store/actions';
import { userService } from '../../../services';
import { LANGUAGES, LanguageUtils } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';


class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            inforDoctorExtra: {}
        };
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.doctorId !== this.props.doctorId){
            let res = await userService.getInforDoctorExtra(this.props.doctorId);
            if(res &&  res.errCode === 0){
                this.setState({
                    inforDoctorExtra: res.inforDoctorExtra    
                });

            }
        }

    }

    showHideDetailInfor = (state) => {
        this.setState({
            isShowDetailInfor: state,
        })
    }

    render() {

        let { isShowDetailInfor, inforDoctorExtra } = this.state; 
        let { language } = this.props;
        
        return (
            <div className='doctor-extra-infor'> 
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra.text-address"/></div>
                    <div className='name-clinic'>{inforDoctorExtra && inforDoctorExtra.nameClinic ? inforDoctorExtra.nameClinic : '' }</div>
                    <div className='detail-address'>{inforDoctorExtra && inforDoctorExtra.addressClinic ? inforDoctorExtra.addressClinic : '' }</div>

                </div>
                <div className='content-down'>
                    
                    {!isShowDetailInfor &&
                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra.text-price"/> {inforDoctorExtra && inforDoctorExtra.priceData && language === LANGUAGES.VI && 
                                        <NumberFormat className='currency' value={inforDoctorExtra.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={"VND"} />
                                        }        
                                       {inforDoctorExtra && inforDoctorExtra.priceData && language === LANGUAGES.EN &&  
                                        <NumberFormat className='currency' value={inforDoctorExtra.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={"$"} />
                                       }
                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="patient.extra.view-detail"/>
                            </span>
                        </div>
                    }

                    {isShowDetailInfor &&
                        <>
                            <div className='title-price'> <FormattedMessage id="patient.extra.text-price"/></div>
                            <div className='detail-price'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra.text-price"/>
                                    </span>
                                    <span className='right'>
                                        {inforDoctorExtra && inforDoctorExtra.priceData && language === LANGUAGES.VI && 
                                        <NumberFormat className='currency' value={inforDoctorExtra.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={"VND"} />
                                        }        
                                       {inforDoctorExtra && inforDoctorExtra.priceData && language === LANGUAGES.EN &&  
                                        <NumberFormat className='currency' value={inforDoctorExtra.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={"$"} />
                                       }
                                    </span>               
                                </div>
                                <div className='note'>
                                    {inforDoctorExtra && inforDoctorExtra.note ? inforDoctorExtra.note : ''} 
                                </div>
                            </div>
                            <div className='payment'><FormattedMessage id="patient.extra.payment"/>
                                {inforDoctorExtra && inforDoctorExtra.note ?
                                    (language === LANGUAGES.VI ? inforDoctorExtra.paymentData.valueVi : inforDoctorExtra.paymentData.valueEn) 
                                    : ''
                                }
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra.hide-price"/>
                                </span>
                            </div>
                        </>
                    } 
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
