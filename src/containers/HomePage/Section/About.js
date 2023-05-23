import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class About extends Component {

    render() {
        return(
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    thong tin ve abc 
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/1b39enLflr8" title="giọt lệ tình" frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            What is HTML?
                                HTML stands for Hyper Text Markup Language
                                HTML is the standard markup language for creating Web pages
                                HTML describes the structure of a Web page
                                HTML consists of a series of elements
                                HTML elements tell the browser how to display the content
                                HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);


