import React, { useState, useEffect , Fragment } from 'react';
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';

const City_list = (props) => {

    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        getCityList();
        // eslint-disable-next-line
    }, []);

    const getCityList = async () => {

        try {
            let res = await axios.get(
                `${Environment_variable.BackEnd_URL}/api/other/city_list`
            )
            if (Array.isArray(res.data)) {
                setCityList(res.data)
            }
        } catch (err) {
            // console.log(err)
            setCityList([])
        }
        
    }

    return (
        <Fragment>
            {
                cityList !== null && cityList.map(city => {
                    return (<option key={city._id} value={city._id} >{city.city_name}</option>)
                })
            }
        </Fragment>
    )
}

export default City_list;