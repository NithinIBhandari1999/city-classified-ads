import React, { useState, useEffect , Fragment } from 'react';
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';

const Category_list = (props) => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();
        // eslint-disable-next-line
    }, []);

    const getCategoryList = async () => {

        try {
            let res = await axios.get(
                `${Environment_variable.BackEnd_URL}/api/other/category_list`
            )
            if (Array.isArray(res.data)) {
                setCategoryList(res.data)
            }
        } catch (err) {
            console.log(err)
            setCategoryList([])
        }

    }

    return (
        <Fragment>
            {
                categoryList !== null && categoryList.map(category => {
                    return (<option key={category._id} value={category._id}  >{category.category_name}</option>)
                })
            }
        </Fragment>
    )
}


export default Category_list;