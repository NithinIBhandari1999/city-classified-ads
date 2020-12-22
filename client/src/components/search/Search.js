import React , {  useState , useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom';
import axios from 'axios';
import { GetParamNameWithDefault } from '../../utils/Helper';
import City_list from '../layout/City_list';
import Category_list from '../layout/Category_list';
import { stringify } from 'query-string';
import { Environment_variable } from '../../utils/constants';

let data = [];

const Search = (props) => {
  
  let history = useHistory();

  let query_search = GetParamNameWithDefault('search', '');
  let query_city = GetParamNameWithDefault('city', '0');
  let query_category = GetParamNameWithDefault('category', '0');
  let query_page = GetParamNameWithDefault('page', '1');

  useEffect(() => {
    if( query_search !== "" ){
      getResult( query_search , query_city , query_category , query_page )
    }
  }, [])

  const [search, setSearch] = useState(query_search);
  const [city, setCity] = useState(query_city);
  const [category, setCatgegory] = useState(query_category);
  const [page, setPage] = useState(parseInt(query_page))
  const [adList, setAdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(false);

  const getResult = async ( search , city , category , page) => {

    let post_body = stringify({
      "search": search,
      "city": city,
      "category": category,
      "page": page
    })
    history.push('/search' + '?' + post_body);

    setLoading(true);

    if(page<=0){
      page=1;
    }

    data = [];
    setAdList(data)

    try {

      let post_body = stringify({
        search , ad_city: city , ad_category: category , page: page
      })

    let res = await axios.post(
      `${Environment_variable.BackEnd_URL}/api/page/search`,
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
    getResult( search , city , category , page );
  }

  return (
    <div>
    
    <div>
    
      <form className="form_1" onSubmit={onSubmit} >

        <h1>Search</h1>

          <div>
              <label>Search:</label>
              <input
                name="search"
                type="text" 
                className="form_1_element" 
                placeholder="Enter search..." 
                value={search}
                onChange={ (e) => {
                  setSearch(e.target.value)
                } } 
                required={true} 
                />
          </div>

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
        <h1>Search Result:</h1>

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
                getResult( search , city , category , p );
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
                getResult( search , city , category , p );
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

export default Search;