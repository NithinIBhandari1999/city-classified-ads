import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardLinks = () => {
  return (
    <div>
        <h1>Admin Dashboard</h1>
        <Link to='/admin/ad_list' className="a_link_white" style={{ marginLeft: 0 }} >Advertisement List</Link>
        <Link to='/admin/city_add' className="a_link_white" >City List or Add</Link>
        <Link to='/admin/category_add' className="a_link_white" >Category List or Add</Link>
    </div>
  )
}

export default AdminDashboardLinks;