import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageSpecialty.scss';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { userService } from '../../../services';
import { toast } from 'react-toastify';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOnChangeInput = (event,id) => {

        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({...copyState});

    }

    handleEditorChange = ({html, text}) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    };

    handleOnchangeImage = async (event) => {
        let files = event.target.files;

        let file = files[0];
        if(file){

            let copyState = {...this.state};

            //let base64 = await CommonUtils.getBase64(file);
            copyState['imageBase64'] = await CommonUtils.getBase64(file);

            //const objectUrl = URL.createObjectURL(file);
            //copyUser['imageUrl'] = objectUrl;
            this.setState({
                ...copyState
            })
        }
                
    }

    checkValidDataInput = () => {

        let isValid = true;
        let arrInput = ["name", "imageBase64", "descriptionHTML", "descriptionMarkdown"];

        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert("Missing input : " + arrInput[i]);
                break;
            }
        }

        return isValid;

    }

    handleSave = async () => {
        console.log('state : ', this.state)

        try {

            if(this.checkValidDataInput()){
                let res = await userService.createSpecialty(this.state);

                if(res && res.errCode === 0){
                    toast.success("Specialty saved successfully!!!");
                }else{
                    toast.error("Specialty saved failed!!!");
                }
            }

        }catch (e) {
            console.log(e);
        }


    };

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
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quan ly chuyen khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Ten chuyen khoa</label>
                        <input className='form-control' type='text' onChange={(event)=>this.handleOnChangeInput(event,'name')} value={this.state.name}></input>
                    </div>
                    <div className='col-3 form-group'>
                        <label>Anh chuyen khoa</label>
                        <input className='form-control-file' type='file' onChange={(event)=> {this.handleOnchangeImage(event)}}></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                            />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty' onClick={() => {this.handleSave()}}>Save</button>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
