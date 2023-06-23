import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    //history = useHistory();

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listDoctors !== this.props.listDoctors) {
            this.setState({
                listDoctors: this.props.listDoctors
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    render() {

        let {listDoctors} = this.state;
        let {language} = this.props;

        return(
            <div className='section-share section-outStanding-Doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="schema.outstanding-doctors"/></span>
                        <button className='btn-section'><FormattedMessage id="schema.more-info"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                                {listDoctors && listDoctors.length > 0
                                    && listDoctors.map((item, index) => {
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        let imageUrl = '';
                                        if(item.image) imageUrl = new Buffer.from(item.image, 'base64').toString('binary');
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='customize-border'>
                                                    <div className='outer-bg'>
                                                        <div className='bg-image section-outStanding-Doctor' style={{backgroundImage: `url(${imageUrl})`}}></div>
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>{language === LANGUAGES.VI? nameVi : nameEn} </div>
                                                        <div>Khoa co xuong</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                    </Slider>
                   </div>
                </div>
            </div>
  
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listDoctors: state.admin.listDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.loadTopDoctors(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));


