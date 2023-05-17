import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class HandBook extends Component {

    render() {
        return(
            <div className='section-share section-handBook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handBook'></div>
                                <div>Co xuong khop 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);


