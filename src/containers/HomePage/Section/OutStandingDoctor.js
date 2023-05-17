import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    render() {

        return(
            <div className='section-share section-outStanding-Doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 5</div>
                                    </div>
                                </div>  
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outStanding-Doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Khám Nam học, Bệnh viện Nam học và Hiếm muộn Hà Nội</div>
                                        <div>Nam học 6</div>
                                    </div>
                                </div>
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

