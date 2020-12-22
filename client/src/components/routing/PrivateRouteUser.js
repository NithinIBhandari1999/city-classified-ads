import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteUser = (props) => {

    const user_login_status = props.common.user_login_status;

    // console.log(user_login_status)
    // console.log(props)

    if(user_login_status==false){
        return (<Redirect to='/user/login' />)
    } else if(user_login_status==true){
        return (
            <>
                {props.children}
            </>
        );
    }

};

const mapStateToProps = state => ({
    common: state.common
});

export default connect(mapStateToProps, {

})(PrivateRouteUser);