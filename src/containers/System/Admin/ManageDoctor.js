import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Col } from 'reactstrap';
import { ALLCODE_TYPE, LANGUAGES, LanguageUtils, manageActions } from '../../../utils';
import { userService } from '../../../services';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: null,
            doctors: [],
            isState: manageActions.READ,
            selectedPrice: null,
            prices: [],
            selectedPayment: null,
            payments: [],
            selectedProvince: null,
            provinces: [],
            nameClinic: '',
            addressClinic:'',
            note: ''
        }
    }

    buildDataSelect = (inputData, type) => {
        let result = [];

        let language = this.props.language;

        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'DOCTOR' ? `${item.lastName} ${item.firstName}` : `${item.valueVi}`;
                let labelEn = type === 'DOCTOR' ? `${item.firstName} ${item.lastName}` : `${item.valueEn}`; 
                object.label = language === LANGUAGES.VI ? labelVi: labelEn;
                object.value = type === 'DOCTOR' ? item.id : item.key; 
                result.push(object);           
            })
        }
        return result;
    }

    async componentDidMount(){
        this.props.getAllDoctors();
        this.props.getAllCodeDoctorMore();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.allDoctors !== this.props.allDoctors) {
            let doctors = this.buildDataSelect(this.props.allDoctors, 'DOCTOR'); 
            this.setState({
                doctors: doctors,
            }, () => {
                console.log('check component did update : ', this.props);
            })
        }

        if(prevProps.allCodeDoctorMore  !== this.props.allCodeDoctorMore){
            let allCodeDoctorMore = this.props.allCodeDoctorMore;
            let prices = this.buildDataSelect(allCodeDoctorMore.prices);
            let payments = this.buildDataSelect(allCodeDoctorMore.payments);
            let provinces = this.buildDataSelect(allCodeDoctorMore.provinces);
            this.setState({
                prices,
                payments,
                provinces
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    checkInputData = () => {
        let input = ['selectedDoctor','contentMarkdown','contentHTML','selectedPrice','selectedPayment','selectedProvince','nameClinic','addressClinic'];
        for(let i = 0; i < input.length; i++) {
            if(!this.state[input[i]]){
                alert(LanguageUtils.getMessageByKey("messages.please",this.props.language) + LanguageUtils.getMessageByKey(`manage-doctor.${input[i]}`,this.props.language));
                return false;
            }
        }

        return true;

    }

    handleSaveContentMarkdown = () =>{
        if(this.checkInputData()){

            let infoDoctor = {};
            infoDoctor.doctorId = this.state.selectedDoctor.value;
            infoDoctor.contentMarkdown = this.state.contentMarkdown;
            infoDoctor.contentHTML = this.state.contentHTML;
            infoDoctor.description = this.state.description;
            infoDoctor.priceKey = this.state.selectedPrice.value;
            infoDoctor.paymentKey = this.state.selectedPayment.value;
            infoDoctor.provinceKey = this.state.selectedProvince.value;
            infoDoctor.nameClinic = this.state.nameClinic;
            infoDoctor.addressClinic = this.state.addressClinic;
            infoDoctor.note = this.state.note;
            if(this.state.isState === manageActions.ADD){
                this.props.createInfoDoctorStart(infoDoctor);
            }else if(this.state.isState === manageActions.EDIT){
                this.props.editInfoDoctorStart(infoDoctor);   
            }

            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedDoctor: null,
                selectedPrice: null,
                selectedPayment: null,
                selectedProvince: null,
                nameClinic: '',
                addressClinic: '',
                note: '',
                isState: manageActions.READ,
            });

        }

    }

    getSelectItem = (value, type) => {
        let object = this.state[type];
        let selectedObject = null;
        if(object && object.length > 0){
            selectedObject = object.find(item => {return item && item.value === value})
        }

        return selectedObject;
    }

    handleSelectChange = (selectedOption, object) => {

        if(selectedOption && object){

            let name = object.name;

            if(name === "selectedDoctor"){

                console.log('handleSelectChange: ', selectedOption, object, this.props);

                let allDoctors = this.props.allDoctors;

                allDoctors.map((item ,index) => {
                    if(selectedOption.value === item.id){
                        let contentMarkdown = item.doctorInformation.contentMarkdown? item.doctorInformation.contentMarkdown : '';
                        let contentHTML = item.doctorInformation.contentHTML? item.doctorInformation.contentHTML : '';
                        let description =  item.doctorInformation.description? item.doctorInformation.description : '';
                        let isState = item.doctorInformation.doctorId ? manageActions.EDIT : manageActions.ADD;
                        let selectedPrice = null;
                        let selectedPayment = null;
                        let selectedProvince = null;
                        if(item.doctorInforMore){
                            if(item.doctorInforMore.priceKey){
                                selectedPrice = this.getSelectItem(item.doctorInforMore.priceKey,"prices")
                            }
                            if(item.doctorInforMore.paymentKey){
                                selectedPayment = this.getSelectItem(item.doctorInforMore.paymentKey,"payments")
                            }
                            if(item.doctorInforMore.provinceKey){
                                selectedProvince = this.getSelectItem(item.doctorInforMore.provinceKey,"provinces")
                            }
                        } 
                        let nameClinic = item.doctorInforMore.nameClinic? item.doctorInforMore.nameClinic : '';
                        let addressClinic = item.doctorInforMore.addressClinic? item.doctorInforMore.addressClinic : '';
                        let note = item.doctorInforMore.note? item.doctorInforMore.note : '';
                        this.setState({ 
                            selectedDoctor: selectedOption,
                            contentMarkdown: contentMarkdown,
                            contentHTML: contentHTML,
                            description: description,
                            selectedPrice,
                            selectedPayment,
                            selectedProvince,
                            nameClinic,
                            addressClinic,
                            note,
                            isState: isState 
                        }, () =>
                        console.log(`State :`, this.state)
                        );
                    }
                
                })
            }else if(name === "selectedPrice" || name === "selectedPayment" || name === "selectedProvince"){
                let copyState = {...this.state};
                copyState[name] = selectedOption;

                this.setState({ 
                    ...copyState
                })
            }
        }
    };
    
    handleOnChange = (event, type) => {

        let copyState = {...this.state};
        copyState[type] = event.target.value; 

        this.setState({
            ...copyState
        })

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
        
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="manage-doctor.title"/></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="manage-doctor.choose-doctor"/></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleSelectChange}
                            options={this.state.doctors}
                            placeholder={<FormattedMessage id="manage-doctor.choose-doctor"/>}
                            name = "selectedDoctor"
                            >
                        </Select>
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="manage-doctor.introductory-information"/></label>
                        <textarea className='form-control' rows="4" onChange={(event) => this.handleOnChange(event, "description")} value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.choose-price"/></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleSelectChange}
                            options={this.state.prices}
                            placeholder={<FormattedMessage id="manage-doctor.choose-price"/>}
                            name = "selectedPrice"                            
                            >
                        </Select>
                    </div>
                    <div className='col-4 form-group'>
                    <label><FormattedMessage id="manage-doctor.choose-payment"/></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleSelectChange}
                            options={this.state.payments}
                            placeholder={<FormattedMessage id="manage-doctor.choose-payment"/>}
                            name="selectedPayment"
                            >
                        </Select>
                    </div>
                    <div className='col-4 form-group'>
                    <label><FormattedMessage id="manage-doctor.choose-province"/></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleSelectChange}
                            options={this.state.provinces}
                            placeholder={<FormattedMessage id="manage-doctor.choose-province"/>}
                            name="selectedProvince"
                            >
                        </Select>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.name-clinic"/></label>
                        <input className='form-control' onChange={(event) => this.handleOnChange(event, "nameClinic")} value={this.state.nameClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.address-clinic"/></label>
                        <input className='form-control' onChange={(event) => this.handleOnChange(event, "addressClinic")} value={this.state.addressClinic}></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.note"/></label>
                        <input className='form-control' onChange={(event) => this.handleOnChange(event, "note")} value={this.state.note}></input>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                        />
                </div>
                <button className={this.state.isState !== manageActions.EDIT?'create-content-doctor':'update-content-doctor'} onClick={this.handleSaveContentMarkdown}>
                    {this.state.isState !== manageActions.EDIT ? <FormattedMessage id="manage-doctor.create-infor"/> : <FormattedMessage id="manage-doctor.update-infor"/>} 
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allCodeDoctorMore: state.admin.allCodeDoctorMore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        createInfoDoctorStart: (infoDoctor) => dispatch(actions.createInfoDoctorStart(infoDoctor)),
        editInfoDoctorStart: (infoDoctor) => dispatch(actions.editInfoDoctorStart(infoDoctor)),
        getAllCodeDoctorMore: () => dispatch(actions.getAllCodeDoctorMore()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
