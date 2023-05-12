import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';


class HomeHeader extends Component {

    render() {
        console.log('this.props: ', this.props);
        return(
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo}></img>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-clinic"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.choose-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.checkup-package"/></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.health-check"/></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support"/></div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>

                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.medical-background"/></div>
                        <div className='title2'><FormattedMessage id="banner.health-care"/></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <FormattedMessage id="banner.find-specialty">
                                {(msg) => (<input placeholder={msg} type='text'/>)}
                            </FormattedMessage>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital-alt fa-lg"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.specialized-examination"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-mobile-alt fa-lg"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.remote-examination"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="far fa-hospital fa-lg"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.general-examination"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-flask fa-lg"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.medical-test"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    {/* <i className="far fa-hospital fa-lg"></i> */}
                                    <i className="fas fa-walking fa-lg"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.mental-health"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className='text-child'><FormattedMessage id="banner.dental-examination"/></div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
