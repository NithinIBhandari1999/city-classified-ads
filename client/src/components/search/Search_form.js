import React , { useState } from 'react'
import { useHistory } from 'react-router-dom';
import City_list from '../layout/City_list';
import Category_list from '../layout/Category_list';
import { stringify } from 'query-string';

const Search_form = (props) => {

    let history = useHistory();

    const [search, setSearch] = useState('');
    const [city, setCity] = useState('0');
    const [category, setCatgegory] = useState('0');

    const onSubmit = (e) => {
        e.preventDefault();
        let post_body = stringify({
            "search": search,
            "city": city,
            "category": category,
            "page":"1"
        })
        history.push('/search' + '?' + post_body);
    }

    return (
        <div>
            
            <form className="form_1" onSubmit={onSubmit} >

                <h1>Search</h1>

                <div>
                    <label>Search:</label>
                    <input
                        name="search"
                        type="text" 
                        className="form_1_element" 
                        required={true}
                        placeholder="Enter search..." 
                        value={search}
                        onChange={ (e) => {
                            setSearch(e.target.value)
                        } } />
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
    )
}

export default Search_form;