import React from 'react';
import Select from 'react-select';
import axios from 'axios';


class FoodEdit extends React.Component 
{
    state = 
    {
        data: []
    }

    componentDidMount() 
    {
        const data = this.getNutrients("%");
    }
    
    async getNutrients(searchTerm)
    {
        return axios.get('/api/nutrient/search', 
        {   
            params:
            {
                nutrient: searchTerm,
                page: '1',
                pagesize: '50'
            }
        })
        .then(res => 
        {
            const data = res.data;
            this.setState({ data });
        })
    }

    renderList()
    {
        return (this.state.data.map(data =>({label:data.name, value: data.name})));
    }

    render () 
    {
        return (
          <div>
            <Select options={this.renderList()}/>
          </div>
        )
    }
}

export default FoodEdit;