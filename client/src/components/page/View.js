import React , {useState , useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';
import Moment from "react-moment";
import { stringify } from 'query-string';

const View = () => {

    let { id } = useParams();

    const [mainError, setMainError] = useState("");

    useEffect(() => {
        
        // console.log(id);
        if( id !== null ){
            if( id.match(/^[a-f0-9]{24}$/) ){
                getResult(id);
            } else {
                setMainError('Ad id is not valid');
            }
        } else {
            setMainError('Ad id is empty');
        }
    }, [])

    const [adDetail, setAdDetail] = useState({});
    const [loading, setLoading] = useState(false);

    const getResult = async ( ad_id ) => {

        setLoading(true);
    
        let data = {};
        setAdDetail(data)
    
        try {
            let post_body = stringify({
                ad_id
            })

            let res = await axios.post(
                `${Environment_variable.BackEnd_URL}/api/page/ad_view`,
                post_body,
                Environment_variable.AxiosConfigWithCredential,
            )

        //   console.log('res: ')
        //   console.log(res)
    
          data = res.data
          if( typeof data === 'object' && data !== null ){
            setAdDetail(data)  
          }
          setLoading(false);
        } catch (err) {
        //   console.log('err: ')
        //   console.log(err)
        //   console.log(err.response)

          if(err.response.data.main_error !== null ){
              setMainError( err.response.data.main_error );
          }

          data = {}
          setAdDetail(data)
          setLoading(false);
        } finally {
          setLoading(false);
        }
    
    }

    return (
        <div>
            
            { 
                (mainError.length!==0) && ( <div className="alert_error" >{mainError}</div> )
            }

            {
                loading && (
                    <div style={{ padding:"20px" , marginTop:"10px" , backgroundColor:'#f7f8f9' }}  >
                        <b>Loading...</b>
                        <br/>
                        <small>It may take few seconds.</small>
                    </div>
                )
            }

            {

                (!loading) && ( Object.keys(adDetail).length !== 0 ) && (
                    <div style={{ padding:"20px" , marginTop:"10px" , backgroundColor:'#f7f8f9' }}  >
                        <h1 style={{ padding:"10px" }} >{ adDetail.ad_name }</h1>

                        <h4 style={{ padding:"10px" }} >Rs: { adDetail.ad_price }</h4>

                        <div style={{ padding:"10px" }} > <b>Contact: { adDetail.ad_contact_name } | { adDetail.ad_contact_number }</b></div>

                        <div style={{ padding:"10px" }} >
                            <b>City: { adDetail.city_info[0].city_name } |  Category: { adDetail.category_info[0].category_name }</b>
                        </div>

                        <div style={{ padding:"10px" }} >
                            Desc:
                            <br/>
                            { adDetail.ad_desc }
                        </div>

                        <div style={{ padding:"10px" }} >
                            Created On: <Moment format="YYYY/MM/DD hh:mm:ss" >{ adDetail.ad_created_on }</Moment>
                            { ' | ' }
                            <Moment fromNow ago>{ adDetail.ad_created_on }</Moment> ago
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default View;