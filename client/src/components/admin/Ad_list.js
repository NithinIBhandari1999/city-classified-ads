import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';
import { stringify } from 'query-string';
import Ad_list_item from './Ad_list_item';
import AdminDashboardLinks from './AdminDashboardLinks';

const Ad_list = (props) => {

    useEffect(() => {
        getResult('1', '0' )
    }, [])

    const [adStatusType, setAdStatusType] = useState('');
    const [page, setPage] = useState(1)
    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(false);

    const getResult = async (type, page) => {

        setLoading(true);

        if (page <= 0) {
            page = 1;
        }

        let data = [];
        setAdList(data)

        try {

            let post_body = stringify({
                type: type, page: page
            })

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/admin/ad_list`,
                post_body,
                Environment_variable.AxiosConfigWithCredential
            )

            // console.log('res: ')
            // console.log(res)

            setCount(res.data.count)

            data = res.data.data
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

<AdminDashboardLinks />

            <h2>Ad Status</h2>

            <span className="a_link_white" onClick={ () => {
                setAdStatusType(1)
                getResult(1, page)
            }} style={{ marginLeft: 0 }} >All</span>
            <span className="a_link_white" onClick={ () => {
                setAdStatusType(2)
                getResult(2, page)
            }} >Pending</span>
            <span className="a_link_white" onClick={ () => {
                setAdStatusType(3)
                getResult(3, page)
            }} >Approved</span>
            <span className="a_link_white" onClick={ () => {
                setAdStatusType(4)
                getResult(4, page)
            }} >Not Approved</span>

            <div>
                <br />
                <h2>All { (adStatusType===1) && (<span></span>) }
                { (adStatusType===2) && (<span>Pending</span>) }
                { (adStatusType===3) && (<span>Approved</span>) }
                { (adStatusType===4) && (<span>Not Approved</span>) } Ads:</h2>

                {
                    loading && (<p>Loading</p>)
                }

                {
                    (adList.length === 0) && (!loading) && (<p>No Result Found</p>)
                }

                {
                    adList.map((adDetail) => {

                        return (
                            <Ad_list_item key={adDetail._id} adDetail={adDetail} />
                        )
                    })
                }

                <div style={{ textAlign: "center", marginTop: "10px" }} >
                    {
                        (!loading) && (page > 1)
                        &&
                        (
                            <button
                                className="form_1_elemenet_submit" 
                                style={{ marginRight: "5px" }}
                                onClick={
                                    () => {
                                        let p = parseInt(page) - 1;
                                        setPage(p);
                                        getResult(adStatusType , p)
                                    }
                                }
                            >Previous</button>
                        )
                    }
                    {
                        (!loading) && (count) && (
                            <button
                                className="form_1_elemenet_submit" 
                                style={{ marginRight: "5px" }}
                                onClick={
                                    () => {
                                        let p = parseInt(page) + 1;
                                        setPage(p);
                                        getResult(adStatusType , p)
                                    }
                                }
                            >Next</button>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Ad_list;