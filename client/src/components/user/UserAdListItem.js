import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Environment_variable } from '../../utils/constants';
import { stringify } from 'query-string';
import Moment from "react-moment";

const AdListItem = (props) => {

    const [adDetail, setAdDetail] = useState(props.adDetail)
    const [updatingAdStatus, setUpdatingAdStatus] = useState(false)
    const [updatingAdStatusError, setUpdatingAdStatusError] = useState('')

    const [adDeleteStatus, set_adDeleteStatus] = useState(false);

    const adDelete = async (ad_id) => {

        setUpdatingAdStatus(true);
        setUpdatingAdStatusError('')

        try {

            let post_body = stringify({
                ad_id: ad_id
            })

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/user/ad_delete`,
                post_body,
                Environment_variable.AxiosConfigWithCredential
            )

            // console.log('res: ')
            // console.log(res)

            let data = res.data
            // console.log(data)

            set_adDeleteStatus(true)

            setUpdatingAdStatus(false);
        } catch (err) {
            // console.log('err: ')
            // console.log(err)
            // console.log(err.response)

            updatingAdStatusError(err.response)
            setUpdatingAdStatus(false);
        } finally {
            setUpdatingAdStatus(false);
        }

    }

    if(adDeleteStatus){
        return (
            <div key={adDetail._id} style={{ padding: "20px", marginTop: "10px", backgroundColor: '#f7f8f9' }} >
                Ad deleted Successfully
            </div>
        )
    }

    return (

        <div key={adDetail._id} style={{ padding: "20px", marginTop: "10px", backgroundColor: '#f7f8f9' }} >
            <h1 style={{ padding: "5px" }} >{adDetail.ad_name}</h1>

            <div style={{ padding: "5px" }} > <b>Contact: {adDetail.ad_contact_name} | {adDetail.ad_contact_number}</b></div>

            <div style={{ padding: "5px" }} >
                <b>City: {adDetail.city_info[0].city_name} |  Category: {adDetail.category_info[0].category_name}</b>
            </div>

            <div style={{ padding: "5px" }} >
                Desc:<br />
                {adDetail.ad_desc}
            </div>

            <div style={{ padding: "5px" }} >
                Created On: <Moment format="YYYY/MM/DD hh:mm:ss" >{adDetail.ad_created_on}</Moment>
                {' | '}
                <Moment fromNow ago>{adDetail.ad_created_on}</Moment> ago
            </div>

            <div style={{ padding: "5px" }} >
                Ad Status: {(adDetail.ad_pending === "0") ? (
                    (adDetail.ad_status === "1") ? (
                        <span style={{ color: "green", fontWeight: 'bold' }} >Approved</span>
                    ) : (
                            <span style={{ color: "red", fontWeight: 'bold' }} >Not Approved</span>
                        )
                ) : (
                        <span style={{ color: "blue", fontWeight: 'bold' }} >Pending</span>
                    )}
            </div>

            {
                (!updatingAdStatus) ?
                    (
                        <Fragment>
                            <div
                                to={`/view/${adDetail._id}`}
                                className="form_1_elemenet_submit"
                                style={{ backgroundColor: 'red', marginRight: "5px" }}
                                onClick={() => {
                                    adDelete(adDetail._id)
                                }}
                            >Ad delete</div>

                            {/* <div
                                to={`/view/${adDetail._id}`}
                                className="form_1_elemenet_submit"
                                style={{ backgroundColor: 'red', marginRight: "5px" }}
                                onClick={() => {
                                    adDelete(adDetail._id)
                                }}
                            >Not Approved</div> */}
                        </Fragment>
                    ) : (
                        <div
                            style={{ backgroundColor: '#000000', padding: "5px" }}
                        ><span style={{ padding: "5px", color: "#ffffff" }}  >Updating Ad Status..</span></div>
                    )
            }
            <div style={{ color: 'red' }} >{updatingAdStatusError}</div>

        </div>

    )
}

const mapStateToProps = state => ({
    common: state.common
});

export default connect(mapStateToProps, {

})(AdListItem);