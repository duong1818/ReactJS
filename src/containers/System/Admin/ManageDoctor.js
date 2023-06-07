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
import { LANGUAGES } from '../../../utils';

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
            selectSource: [],
            isEdit: false,
        }
    }


    async componentDidMount(){
        this.props.getAllDoctors();
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
            }, () => {
                console.log('check component did update : ', this.state);
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
        let input = ['selectedDoctor','contentMarkdown','contentHTML'];
        for(let i = 0; i < input.length; i++) {
            if(!this.state[input[i]]){
                alert('Please input ' + input[i]);
                return false;
            }
        }

        return true;

    }

    handleSaveContentMarkdown = () =>{
        // console.log('check state: ', this.state);

        if(this.checkInputData()){

            let infoDoctor = {};
            infoDoctor.doctorId = this.state.selectedDoctor.value;
            infoDoctor.contentMarkdown = this.state.contentMarkdown;
            infoDoctor.contentHTML = this.state.contentHTML;
            infoDoctor.description = this.state.description;
            if(!this.state.isEdit){
                this.props.createInfoDoctorStart(infoDoctor);
            }else{
                this.props.editInfoDoctorStart(infoDoctor);   
            }

            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedDoctor: null,
                selectSource: [],
                isEdit: false,
            });

        }

    }

    handleSelectChange = (selectedDoctor) => {

        if(selectedDoctor){

            // console.log('handleSelectChange: ', selectedDoctor);

            let allDoctors = this.props.allDoctors;

            allDoctors.map((item ,index) => {
                if(selectedDoctor.value === item.id){
                    let contentMarkdown = item.doctorInformation.contentMarkdown? item.doctorInformation.contentMarkdown : '';
                    let contentHTML = item.doctorInformation.contentHTML? item.doctorInformation.contentHTML : '';
                    let description =  item.doctorInformation.description? item.doctorInformation.description : '';
                    let isEdit = item.doctorInformation.doctorId ? true : false;
                    //console.log("item : " , item);
                    this.setState({ 
                        selectedDoctor: selectedDoctor,
                        contentMarkdown: contentMarkdown,
                        contentHTML: contentHTML,
                        description: description,
                        isEdit: isEdit 
                    }, () =>
                      console.log(`State :`, this.state)
                    );
                }
            
            })
    
        }
    };
    
    handleOnChangeDesc = (event) => {

        this.setState({
            description: event.target.value,
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
                <div className='manage-doctor-title'>Title : tao thong tin Doctors</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chon bac si</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleSelectChange}
                            options={this.state.selectSource}>

                        </Select>
                    </div>
                    <div className='content-right form-group'>
                        <label>Thong tin gioi thieu:</label>
                        <textarea className='form-control' rows="4" onChange={(event) => this.handleOnChangeDesc(event)} value={this.state.description}>
                            asfafasfasfasfafaf
                        </textarea>
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
                <button className={!this.state.isEdit?'create-content-doctor':'save-content-doctor'} onClick={this.handleSaveContentMarkdown}>{!this.state.isEdit ? 'Lưu thông tin' : 'Sửa thông tin'} </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        createInfoDoctorStart: (infoDoctor) => dispatch(actions.createInfoDoctorStart(infoDoctor)),
        editInfoDoctorStart: (infoDoctor) => dispatch(actions.editInfoDoctorStart(infoDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
