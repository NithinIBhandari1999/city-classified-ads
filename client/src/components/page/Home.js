import React from 'react'
import Search_form from '../search/Search_form';
import View_all_form from '../page/View_all_form';

const Home = () => {
    return (
        <div style={{ padding:"10px" }} >
            
            <Search_form />
            <View_all_form />

        </div>
    )
}

export default Home