import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';


const options = 
[
    { value: 'chocolate', label: 'chocolate'},
    { value: 'vanilla', label: 'vanilla'},
    { value: 'lemon', label: 'lemon'},
]

export default class FoodEdit extends React.Component 
{
    state = 
    {
        data: [],
        selectedOption: []
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
            const data = res.data
                .sort((a, b) => a.name > b.name ? 1: -1)
                .map(data =>({label:data.name, value: data.name}));
            this.setState({ data });
        })
    }

    renderList()
    {
        return this.state.data
            .sort((a, b) => a.name > b.name ? 1: -1)
            .map(data =>({label:data.name, value: data.name}))
            
    }

    getOption()
    {   
        if (this.state.selectedOption != null)
            return this.state.selectedOption.map(option => option.value + " "); 
        else return "Nothing";
    }

    handleChange = selectedOption =>
    {
        this.setState( 
            { selectedOption }, 
            () => console.log("Option selected:", this.state.selectedOption));
    }

    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    render () 
    {
        const { selectedOption } = this.state;

        return (
            <div>
                <AppNavbar/>
                <Container flui>
                    <Table className="mt">
                    <thead>
                        <tr>
                            <th>
                                <pre>Selected Nutriens: {this.getOption()}</pre>
                            </th>
                            <th width="50%">
                                <Select 
                                    isMulti
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.data}/></th>
                        </tr>
                        </thead>  
                    </Table>
                </Container>
            </div>
        )
    }
}