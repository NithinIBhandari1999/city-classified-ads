import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAdminLoginStatus , getUserLoginStatus } from '../../redux/actions/commonActions';

const Navbar = (props) => {

    const user_login_status = props.common.user_login_status;
    const admin_login_status = props.common.admin_login_status;

    const getAdminLoginStatus = props.getAdminLoginStatus;
    const getUserLoginStatus = props.getUserLoginStatus;

    useEffect(()=>{
        // console.log("Navbar.js")
        getAdminLoginStatus()
        getUserLoginStatus()
    },[])

    const link_userLoginStatusFalse = (
        <Fragment>
            <Link to={{ pathname: '/user/login' }} className="nav_item_right" >Login</Link>
            <Link to={{ pathname: '/user/signup' }} className="nav_item_right" >Sign Up</Link>
        </Fragment>
    )
    
    const link_userLoginStatusTrue = (
        <Fragment>
            <Link to={{ pathname: '/user/dashboard' }} className="nav_item_right" >User</Link>
        </Fragment>
    )

    const link_adminLoginStatusFalse = (
        <Fragment>
            <Link to={{ pathname: '/admin/login' }} className="nav_item_right" >Admin</Link>
        </Fragment>
    )
    
    const link_adminLoginStatusTrue = (
        <Fragment>
            <Link to={{ pathname: '/admin/dashboard' }} className="nav_item_right" >Admin</Link>
        </Fragment>
    )

    return (
        <div className="nav" >
            <div>

                    <Link to="/" className="nav_item_left" >City Classified Ads</Link>
                    <Link to={{ pathname: '/about' }} className="nav_item_right" >About</Link>

                    {
                        user_login_status? (link_userLoginStatusTrue) : (link_userLoginStatusFalse) 
                    }
                    {
                        admin_login_status? (link_adminLoginStatusTrue) : (link_adminLoginStatusFalse) 
                    }
                
            </div>
            <div className="nav_clear" ></div>
        </div>
    )
}

const mapStateToProps = state => ({
    common: state.common
});

const mapDispatchToProps = {
    getAdminLoginStatus,
    getUserLoginStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);