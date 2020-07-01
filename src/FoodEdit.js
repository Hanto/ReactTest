import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Container, Table, Button } from 'reactstrap';
import AppNavbar from './AppNavbar';

export default class FoodEdit extends React.Component 
{
    state = 
    {
        data: [],
        food: [],
        selectedOption: [],
        selectedFood: [],
    }

    componentDidMount() 
    {   
        this.getFood = this.getFood.bind(this);
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
                .map(data =>({label:data.name, value: data.id}));
            this.setState({ data });
        })
    }

    getFood()
    {
        const params =
        {
            nutrient: "%Protein%",
            page: '1',
            pagesize: '50'
        }

        return axios.get('/api/food/search', { params })
        .then(res =>
        {
            const food = res.data
                .sort((a, b) => a.description > b.description ? 1: -1)
                .map(data =>({label:data.description, value: data.fdcId}));
            this.setState({ food });
        })
    }  

    getOptions()
    {   
        return this.state.selectedOption != null ? 
            this.state.selectedOption.map(option => option.label + "(" + option.value + ") ") : 
            "Nothing";
    }

    handleChange(selectedOption)
    {
        this.setState({selectedOption});
        console.log("Option selected:", this.state.selectedOption);
        this.getFood();
    }

    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    render () 
    {
        const { selectedOption } = this.state;
        const { selectedFood } = this.state;

        return (
            <div>
                <AppNavbar/>
                <Container flui>
                    <Table className="mt">
                    <thead>
                        <tr>
                            <th>
                            <pre>Selected Nutriens: {this.getOptions()}</pre>
                            </th>
                            <th>
                            <pre>Selected Food: </pre>
                            </th>
                        </tr>
                        <tr>
                            <th width="100%">
                                <Select 
                                    isMulti
                                    value={selectedOption}
                                    onChange={event => this.handleChange(event)}
                                    options={this.state.data}/>
                            </th>
                            <th>
                            <Button color="danger" onClick={this.getFood}>Food</Button>
                            </th>
                        </tr>
                        <tr>
                        <Select 
                                    isMulti
                                    value={selectedFood}
                                    //onChange={event => this.handleChange(event)}
                                    options={this.state.food}/>
                        </tr>
                        </thead>  
                    </Table>
                </Container>
            </div>
        )
    }
}