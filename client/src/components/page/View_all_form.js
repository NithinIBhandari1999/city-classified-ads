import React , { useState } from 'react'
import { useHistory } from 'react-router-dom';
import City_list from '../layout/City_list';
import Category_list from '../layout/Category_list';

const Search_form = (props) => {

    let history = useHistory();

    const [city, setCity] = useState('0');
    const [category, setCatgegory] = useState('0');
    const [page, setPage] = useState('1');

    const onSubmit = (e) => {
        e.preventDefault();
        let query = "?" + "city=" + city +  "&" +  "category=" + category +  "&" + "page=" + page;
        history.push('/view_all' + query);
    }

    return (
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
                    <input type="submit" value="View All" className="form_1_elemenet_submit" />
                </div>

            </form>

        </div>
    )
}

export default Search_form;