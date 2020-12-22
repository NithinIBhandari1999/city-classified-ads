import React, { useState } from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserLoginStatus } from '../../redux/actions/commonActions';
import { Environment_variable } from '../../utils/constants';

const UserSignUp = (props) => {

    const user_login_status = props.common.user_login_status;
    const { setUserLoginStatus } = props;

    const [user_name, set_user_name] = useState('');
    const [user_email, set_user_email] = useState('');
    const [user_password, set_user_password] = useState('');
    const [loading, setLoading] = useState(false);
    const [main_error, set_main_error] = useState("");

    const getResult = async (user_name, user_email, user_password) => {

        setLoading(true);
        set_main_error("");

        try {

            let post_body = stringify({
                user_name: user_name,
                user_email: user_email,
                user_password: user_password,
            })

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/user/user_signup`,
                post_body,
                Environment_variable.AxiosConfigWithCredential,
            )

            if (res.data.user_login_status) {
                if (res.data.user_login_status === true) {
                    // console.log("Login Success")
                    setUserLoginStatus()
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
            // console.log(err.response)
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
        getResult(user_name, user_email, user_password)
    }

    if (user_login_status) {
        return (
            <Redirect to='/user/dashboard' ></Redirect>
        )
    }

    return (
        <div>

            <form className="form_1" onSubmit={onSubmit} >

                <h1>Sign up</h1>

                <div>
                    <label>Name:</label>
                    <input
                        name="user_name"
                        type="text"
                        className="form_1_element"
                        required={true}
                        placeholder="Please enter your name"
                        value={user_name}
                        onChange={(e) => {
                            set_user_name(e.target.value)
                        }} />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        name="user_email"
                        type="email"
                        className="form_1_element"
                        required={true}
                        placeholder="Please enter your email"
                        value={user_email}
                        onChange={(e) => {
                            set_user_email(e.target.value)
                        }} />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        name="user_password"
                        type="text"
                        className="form_1_element"
                        required={true}
                        minLength="8"
                        placeholder="Please enter your password"
                        value={user_password}
                        onChange={(e) => {
                            set_user_password(e.target.value)
                        }} />
                </div>

                <div>
                    <input type="submit" value="Sign Up" className="form_1_elemenet_submit" />
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
    setUserLoginStatus
})(UserSignUp);