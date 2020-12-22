import React, { useState } from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAdminLoginStatus } from '../../redux/actions/commonActions';
import { Environment_variable } from '../../utils/constants';

const Admin_Login = (props) => {

  const admin_login_status = props.common.admin_login_status;
  const { setAdminLoginStatus } = props;

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [main_error, set_main_error] = useState("");

  const getResult = async (user_name, user_password) => {

    setLoading(true);
    set_main_error("");

    try {

      let post_body = stringify({
        adminLogin_id: user_name,
        adminLogin_password: user_password,
      })

      let res = await axios.post(
        `${Environment_variable.BackEnd_URL}/api/admin/admin_login`,
        post_body,
        Environment_variable.AxiosConfigWithCredential,
      )

      if (res.data.admin_login_status) {
        if (res.data.admin_login_status === true) {
          // console.log("Login Success")
          setAdminLoginStatus()
        } else {
          // console.log("Username or password is wrong")
        }
      } else {
        // console.log("Username or password is wrong")
      }

      setLoading(false);
    } catch (err) {
      // console.log('err: ')
      // console.log(err)
      console.log(err.response.data.main_error)
      if(err.response.data.main_error){
        set_main_error(err.response.data.main_error)
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }

  }

  const onSubmit = (e) => {
    e.preventDefault();
    getResult(username, password)
  }

  if (admin_login_status) {
    return (
      <Redirect to='/admin/dashboard' ></Redirect>
    )
  }

  return (
    <div>

      <form className="form_1" onSubmit={onSubmit} >

        <h1>Admin Login</h1>

        <div>
          <label>Username:</label>
          <input
            name="username"
            type="text"
            className="form_1_element"
            required={true}
            placeholder="Enter username"
            value={username}
            minLength="1"
            onChange={(e) => {
              setUsername(e.target.value)
            }} />
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="text"
            className="form_1_element"
            required={true}
            minLength="1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }} />
        </div>

        <div>
          <input type="submit" value="Login" className="form_1_elemenet_submit" />
        </div>

        {
          (main_error !== "") && (!loading) && (
            <div
              style={{ color: "#ffffff" , backgroundColor: 'red' , padding: "10px" }}
            >{main_error}</div>
          )
        }

      </form>

    </div>
  )
}

const mapStateToProps = state => ({
  common: state.common
});

export default connect(mapStateToProps, {
  setAdminLoginStatus
})(Admin_Login);