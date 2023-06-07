import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, manageActions, CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr : [],
            roleArr: [],
            positionArr: [],
            //previewImagURL : '',
            isOpen: false,
            action: '',


            user : {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                role: '',
                position: '',
                image:'',
                imageUrl: ''

            }
        }
    }

    async componentDidMount() {


        try{
            this.props.fetchGenderStart();
            this.props.fetchRoleStart();
            this.props.fetchPositionStart();

        }catch(e){
            console.log(e);

        }
    }

    /**
     * 
     * Mounting (khoi tao component)
     * 1. constructor
     * 2. render
     * 3. componentDidMount
     * 
     * Updating (new props, setSate, forceUpdate)
     * 1. render
     * 2. componentDidUpdate
     * 
     * Unmounting (close component)
     * 1. componentWillUnmount
     */

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genders !== this.props.genders){
            let genderArr = this.props.genders;
            let copyState = {...this.state};

            copyState['genderArr'] = genderArr;
            copyState['user']['gender'] = CommonUtils.getFirstValueOfArr(genderArr);
            // set state
            this.setState({
                ...copyState
            }, () => {
                //console.log('did update 1: ', this.state)

            })
        }
        if(prevProps.roles !== this.props.roles){
            let roleArr = this.props.roles;
            let copyState = {...this.state};

            copyState['roleArr'] = roleArr;
            copyState['user']['role'] = CommonUtils.getFirstValueOfArr(roleArr);
            // set state
            this.setState({
                ...copyState
            },() => {
                //console.log('did update 2: ', this.state)

            })
        }
        if(prevProps.positions !== this.props.positions){
            let positionArr = this.props.positions;
            let copyState = {...this.state};

            copyState['positionArr'] = positionArr;
            copyState['user']['position'] = CommonUtils.getFirstValueOfArr(positionArr);
            // set state
            this.setState({
                ...copyState
            },() => {
                //console.log('did update 3: ', this.state)

            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            console.log("listUsers :" , this.props.listUsers);
            let copyState = {...this.state};

            copyState.action = manageActions.ADD;

            let positionArr = this.props.positions;
            let roleArr = this.props.roles;
            let genderArr = this.props.genders;

            copyState.user = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: CommonUtils.getFirstValueOfArr(genderArr),
                role: CommonUtils.getFirstValueOfArr(roleArr),
                position: CommonUtils.getFirstValueOfArr(positionArr),
                image:'' 
            }
            this.setState({
                ...copyState
            },() => {
                console.log('check state.user in init : ', this.state.user , this.props);
            });
        }

        console.log('did update: ', this.props)
        console.log('did update this.state: ', this.state.user)
    }

    handleOnchangeImage = async (event) => {
        let files = event.target.files;

        let file = files[0];
        if(file){

            let copyUser = {...this.state.user};

            let base64 = await CommonUtils.getBase64(file);
            console.log('base64: ', base64);
            copyUser['image'] = base64;

            const objectUrl = URL.createObjectURL(file);
            copyUser['imageUrl'] = objectUrl;
            this.setState({
                user: copyUser
            })
        }
                
    }

    handleOnClickImage = () => {
        if(!this.state.user.imageUrl) return;

        this.setState({
            isOpen: true
        })
    }

    handleOnChangeInput = (event, id) => {

        let copyUser = {...this.state.user}
        copyUser[id] = event.target.value;
        this.setState({
            user: copyUser
        })

    }

    checkValidDataInput(){

        let isValid = true;

        let arrInput = ['email','password','firstName','lastName','address','phoneNumber','gender','role','position'];

        for(let i = 0; i < arrInput.length; i++){
            if(!this.state.user[arrInput[i]]){
                isValid = false;
                alert('Missing input: '+ arrInput[i]);
                console.log('Missing input: ', arrInput[i]);
                break;
            }
        }
        return isValid
    }
    checkValidDataEdit(){

        let isValid = true;

        let arrInput = ['email','firstName','lastName','address','phoneNumber','gender','role','position'];

        for(let i = 0; i < arrInput.length; i++){
            if(!this.state.user[arrInput[i]]){
                isValid = false;
                alert('Missing input: '+ arrInput[i]);
                console.log('Missing input: ', arrInput[i]);
                break;
            }
        }
        return isValid
    }

    handleSaveUser = () => {

        try{

            console.log('handleSaveUser this.props :', this.props);

            if(this.state.action === manageActions.ADD){
                if(this.checkValidDataInput()){
                    this.props.addUserStart(this.state.user);
                }
            }
            if(this.state.action === manageActions.EDIT){
                if(this.checkValidDataEdit()){
                    this.props.editUserStart(this.state.user);
                }    
            }

        }catch(e){
            console.log(e);

        }

    }

    handleLoadUser = async (user) => {

        if(user){

            let copyUser = {...this.state.user}
            
            //console.log('check user state', copyUser);
            copyUser.id = user.id;
            copyUser.email = user.email;
            copyUser.firstName = user.firstName;
            copyUser.lastName = user.lastName;
            copyUser.address = user.address;
            copyUser.phoneNumber = user.phoneNumber;
            copyUser.gender = !user.gender? CommonUtils.getFirstValueOfArr(this.props.genderArr) : user.gender;
            copyUser.role = !user.role? CommonUtils.getFirstValueOfArr(this.props.roleArr) : user.role;
            copyUser.position = !user.position? CommonUtils.getFirstValueOfArr(this.props.positionArr) : user.position;

            if(user.image){
                let bufferBase64 =  user.image;//CommonUtils.getUrlFromBase64(user.image);
                copyUser.imageUrl = bufferBase64;
            }else{
                copyUser.imageUrl = '';
                copyUser.image = '';
            }

            this.setState({
                user: copyUser,
                action: manageActions.EDIT
            });
                
            //this.props.loadUser();
        }
    }
    

    render() {
        let {genderArr, roleArr, positionArr, action} = this.state;
        let {language, isLoadingGender}  = this.props;

        //const { photoIndex, isOpen } = this.state;
        // console.log('check UserRedux this.state: ', this.state);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Duong test user redux
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>{isLoadingGender === true? 'Loading Genders' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input className="form-control" type="email" onChange={(event)=>{this.handleOnChangeInput(event,'email')}} value={this.state.user.email}
                                disabled={action === manageActions.EDIT}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type="password" onChange={(event)=>{this.handleOnChangeInput(event,'password')}} 
                                    value={this.state.user.password}
                                    disabled={action === manageActions.EDIT}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName"/></label>
                                <input className="form-control" type="text" onChange={(event)=>{this.handleOnChangeInput(event,'firstName')}} value={this.state.user.firstName}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName"/></label>
                                <input className="form-control" type="text" onChange={(event)=>{this.handleOnChangeInput(event,'lastName')}} value={this.state.user.lastName}/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className="form-control" type="text" onChange={(event)=>{this.handleOnChangeInput(event,'address')}} value={this.state.user.address}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phoneNumber"/></label>
                                <input className="form-control" type="text" onChange={(event)=>{this.handleOnChangeInput(event,'phoneNumber')}} value={this.state.user.phoneNumber}/>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control' onChange={(event)=>{this.handleOnChangeInput(event,'gender')}} value={this.state.user.gender}>
                                    {genderArr && genderArr.length > 0 && 
                                        genderArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option> 
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className='form-control' onChange={(event)=>{this.handleOnChangeInput(event,'role')}} value={this.state.user.role}>
                                    {roleArr && roleArr.length > 0 && 
                                        roleArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option> 

                                            )                                            
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className='form-control' onChange={(event)=>{this.handleOnChangeInput(event,'position')}} value={this.state.user.position}>
                                    {positionArr &&  positionArr.length > 0 &&
                                        positionArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key} >{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" className='form-control' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.user.imageUrl})`}}
                                        onClick={() => this.handleOnClickImage()}
                                    >
                                    </div>

                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button onClick={() => this.handleSaveUser()} className={action === manageActions.EDIT?'btn btn-primary edit-button':'btn btn-primary'}>
                                    <FormattedMessage id={action === manageActions.EDIT?"manage-user.update":"manage-user.create"}/>
                                </button>
                            </div>
                            <div className='col-12 mt-5 mb-5'>
                                <TableManageUser 
                                    handleLoadUser={this.handleLoadUser}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {this.state.isOpen === true && (
                        <Lightbox
                        mainSrc={this.state.user.imageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        />            

                    )
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roles: state.admin.roles,
        positions: state.admin.positions,
        listUsers: state.admin.listUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        addUserStart: (user) => dispatch(actions.addUserStart(user)), 
        editUserStart: (user) => dispatch(actions.editUserStart(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
