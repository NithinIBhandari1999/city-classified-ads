import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { Environment_variable } from '../../utils/constants';
import AdminDashboardLinks from './AdminDashboardLinks';


const City_add = (props) => {

  useEffect(() => {
    getCityList()
  }, [])

  const [cityName, setCityName] = useState("");
  const [formSubmitStatus, setFormSubmitStatus] = useState("");
  const [formSubmitStatusColor, setFormSubmitStatusColor] = useState("");

  const [cityList, setCityList] = useState([]);

  const getResult = async (city_name) => {

    setFormSubmitStatus("")
    setFormSubmitStatusColor("")

    try {

      let post_body = stringify({
        city_name
      })

      let res = await axios.post(
        `${Environment_variable.BackEnd_URL}/api/admin/city_add`,
        post_body,
        Environment_variable.AxiosConfigWithCredential
      )

      setFormSubmitStatus("Inserted")
      setFormSubmitStatusColor("green")

      // console.log('res: ')
      // console.log(res)

      getCityList()
    } catch (err) {
      // console.log('err: ')
      // console.log(err)
      // console.log(err.response)
      if(err.response.data.main_error){
        // setCityNameError("Error: Not Inserted")
        setFormSubmitStatus("Error: Not Inserted")
        setFormSubmitStatusColor("red")
      }
    } finally {
        setCityName("")
    }

  }

  const getCityList = async () => {

    try {
        let res = await axios.get(
            `${Environment_variable.BackEnd_URL}/api/other/city_list`
        )
        setCityList(res.data)
    } catch (err) {
        // console.log(err)
        setCityList([])
    }

  }

  const onSubmit = (e) => {
    e.preventDefault();
    getResult( cityName );
  }

  return (
    <div>

        <AdminDashboardLinks />
      <div>

        <form className="form_1" onSubmit={onSubmit} >

          <h1>City Add</h1>

          <div>
            <label>City:</label>
            <input
              name="city"
              type="text"
              className="form_1_element"
              placeholder="Enter City Name"
              value={cityName}
              onChange={(e) => {
                setCityName(e.target.value)
              }}
              required={true}
            />
            
          </div>

          <div>
            <input type="submit" value="City Add" className="form_1_elemenet_submit" />
          </div>

          <div style={{ color:formSubmitStatusColor , marginBottom: '5px' , marginTop: '5px' }} >{ formSubmitStatus }</div>

        </form>

      </div>

      <div>
        <h1>City List:</h1>
        <ol style={{ paddingLeft: "30px" }}>
        {
          cityList.map((cityList_item)=>{
            return (
              <li>{cityList_item.city_name}</li>
            )
          })
        }
        </ol>
      </div>

    </div>
  )
}

export default City_add;