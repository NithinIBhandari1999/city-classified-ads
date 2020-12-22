import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { Environment_variable } from '../../utils/constants';
import AdminDashboardLinks from './AdminDashboardLinks';

const Category_add = (props) => {

  useEffect(() => {
    getCategoryList()
  }, [])

  const [categoryName, setCategoryName] = useState("");
  const [formSubmitStatus, setFormSubmitStatus] = useState("");
  const [formSubmitStatusColor, setFormSubmitStatusColor] = useState("");

  const [categoryList, setCategoryList] = useState([]);

  const getResult = async (category_name) => {

    setFormSubmitStatus("")
    setFormSubmitStatusColor("")

    try {

      let post_body = stringify({
        category_name
      })

      let res = await axios.post(
        `${Environment_variable.BackEnd_URL}/api/admin/category_add`,
        post_body,
        Environment_variable.AxiosConfigWithCredential
      )

      setFormSubmitStatus("Inserted")
      setFormSubmitStatusColor("green")

      // console.log('res: ')
      // console.log(res)

      getCategoryList()
    } catch (err) {
      // console.log('err: ')
      // console.log(err)
      // console.log(err.response)
      if(err.response.data.main_error){
        // setCategoryNameError("Error: Not Inserted")
        setFormSubmitStatus("Error: Not Inserted")
        setFormSubmitStatusColor("red")
      }
    } finally {
      setCategoryName("")
    }

  }

  const getCategoryList = async () => {

    try {
        let res = await axios.get(
            `${Environment_variable.BackEnd_URL}/api/other/category_list`
        )
        setCategoryList(res.data)
    } catch (err) {
        // console.log(err)
        setCategoryList([])
    }

  }

  const onSubmit = (e) => {
    e.preventDefault();
    getResult( categoryName );
  }

  return (
    <div>

<AdminDashboardLinks />

      <div>

        <form className="form_1" onSubmit={onSubmit} >

          <h1>Category Add</h1>

          <div>
            <label>Category:</label>
            <input
              name="category"
              type="text"
              className="form_1_element"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value)
              }}
              required={true}
            />
            
          </div>

          <div>
            <input type="submit" value="Category Add" className="form_1_elemenet_submit" />
          </div>

          <div style={{ color:formSubmitStatusColor , marginBottom: '5px' , marginTop: '5px' }} >{ formSubmitStatus }</div>

        </form>

      </div>

      <div>
        <h1>Category List:</h1>
        <ol style={{ paddingLeft: "30px" }}>
        {
          categoryList.map((categoryList_item)=>{
            return (
              <li>{categoryList_item.category_name}</li>
            )
          })
        }
        </ol>
      </div>

    </div>
  )
}

export default Category_add;