import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboardLinks = () => {
  return (
    <div>
        <h1>User Dashboard</h1>
        <Link to='/user/ad_list' className="a_link_white" style={{ marginLeft: 0 }} >Advertisement List</Link>
        <Link to='/user/ad_add' className="a_link_white" >Advertisement Add</Link>
    </div>
  )
}

export default UserDashboardLinks