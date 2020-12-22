import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteAdmin = (props) => {

    const admin_login_status = props.common.admin_login_status;

    // console.log(admin_login_status)
    // console.log(props)

    if(admin_login_status==false){
        return (<Redirect to='/admin/login' />)
    } else if(admin_login_status==true){
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

})(PrivateRouteAdmin);