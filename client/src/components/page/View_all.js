import React , {  useState , useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';
import axios from 'axios';
import { stringify } from 'query-string';
import { GetParamNameWithDefault } from '../../utils/Helper';
import City_list from '../layout/City_list';
import Category_list from '../layout/Category_list';
import { Environment_variable } from '../../utils/constants';

let data = [];

const View_all = (props) => {
  
  let history = useHistory();

  let query_city = GetParamNameWithDefault('city', '0');
  let query_category = GetParamNameWithDefault('category', '0');
  let query_page = GetParamNameWithDefault('page', '1');

  useEffect(() => {
    getResult( query_city , query_category , query_page )
  }, [])

  const [city, setCity] = useState(query_city);
  const [category, setCatgegory] = useState(query_category);
  const [page, setPage] = useState(parseInt(query_page))
  const [adList, setAdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(false);

  const getResult = async ( city , category , page) => {

    let query = "?" + "city=" + city +  "&" +  "category=" + category +  "&" + "page=" + page;
    history.push('/view_all' + query);

    setLoading(true);

    if(page<=0){
      page=1;
    }

    data = [];
    setAdList(data)

    let post_body = stringify({
      ad_city: city , ad_category: category , page: page
    })

    try {
      let res = await axios.post(
        `${Environment_variable.BackEnd_URL}/api/page/ad_all`,
        post_body,
        Environment_variable.AxiosConfigWithCredential,
      )

      // console.log('res: ')
      // console.log(res)

      setCount(res.data.count)

      data = res.data.data
      if(Array.isArray(data)){
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

  const onSubmit = (e) => {
    e.preventDefault();
    getResult( city , category , page );
  }

  return (
    <div>
    
    <div>
    
      <form className="form_1" onSubmit={onSubmit} >

        <h1>View All:</h1>

          <div>
              <label>City:</label>
              <select 
                name="city"
                className="form_1_element" 
                value={city}
                onChange={ (e) => {
                  setCity(e.target.value)
                } }
              >
                  <option value="0" >All City</option>
                  <City_list />
              </select>
          </div>

          <div>
              <label>Catgegory:</label>
              <select
                name="catgegory"
                className="form_1_element" 
                value={category}
                onChange={ (e) => {
                  setCatgegory(e.target.value)
                } }
              >
                  <option value="0" >All Category</option>
                  <Category_list />
              </select>
          </div>

          <div>
              <input type="submit" value="Search" className="form_1_elemenet_submit" />
          </div>

      </form>

    </div>

    <div>
        <h1>View All:</h1>

        {
          loading && (<p>Loading</p>)
        }

        {
          (adList.length === 0) && (!loading) && (<p>No Result Found</p>)
        }

        {
          adList.map( (d) => {

            return (
              <div key={d._id} style={{ padding:"20px" , marginTop:"10px" , backgroundColor:'#f7f8f9' }} >
                <div style={{ fontWeight:"bold" , fontSize:"120%" }} >{d.ad_name}</div>
                <div>
                  
                  <span style={{ display:"inline-block" , padding:"5px" , paddingLeft:"0px" }} >
                    { d.city_info[0].city_name }
                    { ' | ' }
                  </span>
                  
                  <span style={{ display:"inline-block" , padding:"5px" , paddingLeft:"0px" }} >
                    { d.category_info[0].category_name }
                    {' | ' }
                  </span>
                  
                  <span style={{ display:"inline-block" , padding:"5px" }} >Rs { d.ad_price }</span>
                </div>
                <Link to={ `/view/${d._id}` } className="form_1_elemenet_submit" >View</Link>
              </div> 
            )
          } )
        }

      <div style={{ textAlign:"center" , marginTop:"10px" }} >
      {
        ( !loading ) && ( page > 1 )
        && 
        (
          <button
            className="form_1_elemenet_submit" style={{ marginRight:"5px" }} 
            onClick={ () => {
                let p = parseInt(page)-1;
                setPage(p);
                getResult( city , category , p );
              }
            }
        >Previous</button>
        )
      }
      {
        ( !loading ) && ( count ) && (
          <button
            className="form_1_elemenet_submit" style={{ marginRight:"5px" }} 
            onClick={ () => {
                let p = parseInt(page)+1;
                setPage(p);
                getResult( city , category , p );
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

export default View_all;