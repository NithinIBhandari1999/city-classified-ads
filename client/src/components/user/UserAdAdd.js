import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { connect } from 'react-redux';
import { setUserLoginStatus } from '../../redux/actions/commonActions';
import { Environment_variable } from '../../utils/constants';
import UserDashboardLinks from './UserDashboardLinks';
import { useHistory } from 'react-router-dom';

const UserAdAdd = (props) => {

    let history = useHistory();

    const [categoryList, setCategoryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    // Form 1 - State
    const [ad_name, set_ad_name] = useState('')
    const [ad_desc, set_ad_desc] = useState('')
    const [ad_contact_name, set_ad_contact_name] = useState('')
    const [ad_contact_number, set_ad_contact_number] = useState('')
    const [ad_price, set_ad_price] = useState('')
    const [ad_category, set_ad_category] = useState('')
    const [ad_city, set_ad_city] = useState('')

    useEffect(() => {
        getCategoryList();
        getCityList();
        // eslint-disable-next-line
    }, []);

    // Form 1 - Status
    const [loading, setLoading] = useState(false);

    const getResult = async (ad_name,
        ad_desc,
        ad_contact_name,
        ad_contact_number,
        ad_price,
        ad_category,
        ad_city) => {

        setLoading(true);

        try {

            let post_body = stringify({
                ad_name,
                ad_desc,
                ad_contact_name,
                ad_contact_number,
                ad_price,
                ad_category,
                ad_city
            })

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/user/ad_add`,
                post_body,
                Environment_variable.AxiosConfigWithCredential,
            )

            history.push('/user/ad_list');

            setLoading(false);
        } catch (err) {
            // console.log('err: ')
            // console.log(err)
            // console.log(err.response)

            setLoading(false);
        } finally {
            setLoading(false);
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        getResult(
            ad_name,
            ad_desc,
            ad_contact_name,
            ad_contact_number,
            ad_price,
            ad_category,
            ad_city
        )
    }

    const getCategoryList = async () => {

        try {
            let res = await axios.get(
                `${Environment_variable.BackEnd_URL}/api/other/category_list`
            )
            if (Array.isArray(res.data)) {
                setCategoryList(res.data)
                set_ad_category(res.data[0]._id)
            }
        } catch (err) {
            console.log(err)
            setCategoryList([])
        }

    }
    const getCityList = async () => {

        try {
            let res = await axios.get(
                `${Environment_variable.BackEnd_URL}/api/other/city_list`
            )
            if (Array.isArray(res.data)) {
                setCityList(res.data)
                set_ad_city(res.data[0]._id)
            }
        } catch (err) {
            // console.log(err)
            setCityList([])
        }
        
    }

    return (
        <div>

            <UserDashboardLinks />

            <form className="form_1" onSubmit={onSubmit} >

                <h1>Advertisement Add</h1>


                <div>
                    <label>Title:</label>
                    <input
                        name="ad_name"
                        type="text"
                        className="form_1_element"
                        required={true}
                        placeholder="Enter ad name"
                        value={ad_name}
                        onChange={(e) => {
                            set_ad_name(e.target.value)
                        }} />
                </div>

                <div>
                    <label>Desc:</label>
                    <textarea
                        name="ad_desc"
                        className="form_1_element"
                        required={true}
                        placeholder="Enter ad Description"
                        value={ad_desc}
                        onChange={(e) => {
                            set_ad_desc(e.target.value)
                        }}
                        style={{
                            height: "150px"
                        }}
                    >
                        {ad_desc}
                    </textarea>
                </div>

                <div>
                    <label>Price:</label>
                    <input
                        name="ad_price"
                        type="number"
                        min="1"
                        className="form_1_element"
                        required={true}
                        placeholder="Enter ad price"
                        value={ad_price}
                        onChange={(e) => {
                            set_ad_price(e.target.value)
                        }} />
                </div>

                <div>
                    <label>Contact Name:</label>
                    <input
                        name="ad_contact_name"
                        type="text"
                        min="1"
                        className="form_1_element"
                        required={true}
                        placeholder="Enter contact name"
                        value={ad_contact_name}
                        onChange={(e) => {
                            set_ad_contact_name(e.target.value)
                        }} />
                </div>

                <div>
                    <label>Contact Number:</label>
                    <input
                        name="ad_contact_number"
                        type="number"
                        min="6000000000"
                        max="9999999999"
                        className="form_1_element"
                        required={true}
                        placeholder="Enter contact number"
                        value={ad_contact_number}
                        onChange={(e) => {
                            set_ad_contact_number(e.target.value)
                        }} />
                </div>

                <div>
                    <label>City:</label>
                    <select
                        name="city"
                        className="form_1_element"
                        value={ad_city}
                        onChange={(e) => {
                            set_ad_city(e.target.value)
                        }}
                    >
                        {
                            cityList !== null && cityList.map(city => {
                                return (<option key={city._id} value={city._id} >{city.city_name}</option>)
                            })
                        }
                    </select>
                </div>

                <div>
                    <label>Catgegory:</label>
                    <select
                        name="catgegory"
                        className="form_1_element"
                        value={ad_category}
                        onChange={(e) => {
                            set_ad_category(e.target.value)
                        }}
                    >
                        {
                            categoryList !== null && categoryList.map(category => {
                                return (<option key={category._id} value={category._id}  >{category.category_name}</option>)
                            })
                        }
                    </select>
                </div>

                <div>
                    <input type="submit" value="Add" className="form_1_elemenet_submit" />
                </div>

            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    common: state.common
});

export default connect(mapStateToProps, {
    setUserLoginStatus
})(UserAdAdd);