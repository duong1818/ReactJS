import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss';
import 'react-image-lightbox/style.css';

// const images = [
//     '//placekitten.com/1500/500',
//     '//placekitten.com/4000/3000',
//     '//placekitten.com/800/1200',
//     '//placekitten.com/1500/1500',
//   ];

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr : [],
            roleArr: [],
            positionArr: [],
            previewImagURL : '',
            isOpen: false,
            //photoIndex: 0,
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
        // try{

        //     let data = await this.getAllCode('gender');
        //     this.setState({
        //         genderArr : data,
        //     });

        //     data = await this.getAllCode('role');
        //     this.setState({
        //         roleArr: data,
        //     });
            
        //     data = await this.getAllCode('position');
        //     this.setState({
        //         positionArr: data,
        //     });
            
        // }catch(e){
        //     console.log(e);
        // }
    }

    

    getAllCode = async (type) =>{
        try{
            let response = await userService.getAllCodeService(type);
            if(response && response.errCode === 0){
               return response.data;
            }
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
            // set state
            this.setState({
                genderArr: this.props.genders
            })
        }
        if(prevProps.roles !== this.props.roles){
            this.setState({
                roleArr: this.props.roles
            })
        }
        if(prevProps.positions !== this.props.positions){
            this.setState({
                positionArr: this.props.positions
            })
        }
    }

    handleOnchangeImage = (event) => {
        let files = event.target.files;

        let file = files[0];
        if(file){
            const objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImagURL: objectUrl
            })

        }
                
    }

    handleOnClickImage = () => {

        if(!this.state.previewImagURL) return;

        this.setState({
            isOpen: true
        })
    }

    

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isLoadingGender = this.props.isLoadingGender;

        //const { photoIndex, isOpen } = this.state;
        //console.log('check UserRedux this.state: ', this.state);
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
                                <input className="form-control" type="email"/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <input className="form-control" type="password"/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phoneNumber"/></label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 && 
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option> 
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className='form-control'>
                                    {roles && roles.length > 0 && 
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option> 
                                            )                                            
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-2'>
                                <label><FormattedMessage id="manage-user.position"/></label>
                                <select className='form-control'>
                                    {positions &&  positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return <option key={index}>{language === LANGUAGES.VI? item.valueVi : item.valueEn}</option>
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
                                        style={{backgroundImage: `url(${this.state.previewImagURL})`}}
                                        onClick={() => this.handleOnClickImage()}
                                    >

                                    </div>

                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save"/></button>
                            </div>

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && (
                        <Lightbox
                        mainSrc={this.state.previewImagURL}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
