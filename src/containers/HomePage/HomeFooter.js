import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeFooter extends Component {

    render() {
        return(
            <div className='home-footer'>
                <footer>&copy; Copyright 2023 AOKI YO. More information. 
                    <a target="_blank" href='https://www.youtube.com/watch?v=1b39enLflr8&t=24s'>
                        &#8594; Click here &#8592;
                    </a>
                </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);


