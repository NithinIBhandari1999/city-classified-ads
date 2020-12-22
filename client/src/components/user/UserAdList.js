import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';
import { stringify } from 'query-string';
import UserAdListItem from './UserAdListItem';
import UserDashboardLinks from './UserDashboardLinks';

const UserAdList = (props) => {

    useEffect(() => {
        getResult()
    }, [])

    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getResult = async () => {

        setLoading(true);

        let data = [];
        setAdList(data)

        try {

            let post_body = stringify({})

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/user/ad_list`,
                post_body,
                Environment_variable.AxiosConfigWithCredential
            )

            // console.log('res: ')
            // console.log(res)

            data = res.data
            if (Array.isArray(data)) {
                setAdList(data)
                
            }
            setLoading(false);
        } catch (err) {
            // console.log('err: ')
            // console.log(err)
            // console.log(err.response)
            data = []
            setAdList(data)
            setLoading(false);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>

            <UserDashboardLinks />

            <div>
                <br />
                <h2>All Ads:</h2>

                {
                    loading && (<p>Loading</p>)
                }

                {
                    (adList.length === 0) && (!loading) && (<p>No Result Found</p>)
                }

                {
                    adList.map((adDetail) => {
                        return (
                            <UserAdListItem key={adDetail._id} adDetail={adDetail} />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default UserAdList;