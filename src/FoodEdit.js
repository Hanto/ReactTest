import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';


export default class FoodEdit extends React.Component 
{
    state = 
    {
        data: []
    }

    componentDidMount() 
    {
        this.getNutrients("%");
    }
    
    getNutrients(searchTerm)
    {
        const params =
        {
            nutrient: searchTerm,
            page: '1',
            pagesize: '50'
        }

        return axios.get('/api/nutrient/search', { params })
        .then(res =>
        {
            const data = res.data;
            this.setState({ data });
        })
    }

    renderList()
    {
        return this.state.data
            .sort((a, b) => a.name > b.name ? 1: -1)
            .map(data =>({label:data.name, value: data.name}))
            
    }

    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    render () 
    {
        return (
            <div>
                <AppNavbar/>
                <Container flui>
                    <Table className="mt">
                    <thead>
                        <tr>
                            <th width="20%"><Select options={this.renderList()}/></th>
                            <th width="20%"><Select options={this.renderList()}/></th>
                        </tr>
                        </thead>  
                    </Table>
                </Container>
            </div>
        )
    }
}