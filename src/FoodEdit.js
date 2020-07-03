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
        selectedFood: null,
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

    getFood(selectedOption)
    {
        if (selectedOption == null)
        {
            this.setState({food: null})
            return;
        }

        const params =
        {
            nutrients: selectedOption.map(option => option.value).join(','),
            page: '1',
            pagesize: '50'
        }

        return axios.get('/api/food/search2', { params })
        .then(res =>
        {
            const food = res.data
                .sort((a, b) => a.description > b.description ? 1: -1)
                .map(data =>({label:data.description, value: data.fdcId, food: data}));
            this.setState({ food });
        })
    }  

    handleChange(selectedOption)
    {
        this.setState({selectedOption});
        console.log("Option selected:", this.state.selectedOption);
        this.getFood(selectedOption);
    }

    handleFoodChange(selectedFood)
    {   this.setState({selectedFood}); }

    getOptions()
    {   
        return this.state.selectedOption != null ? 
            this.state.selectedOption.map(option => option.label + "(" + option.value + ") ") : 
            "Nothing";
    }

    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    renderNutrient(foodNutrient)
    {
        return(<tr>
            <td>Nutrient: {foodNutrient.name}</td>
            <td>Amount: {foodNutrient.amount} {foodNutrient.unitName}</td></tr>
        )
    }

    renderNutrients(foodNutrients)
    {
        return foodNutrients
            .sort((a, b) => a.amount > b.amount ? -1 : 1)
            .map(foodNutrient => this.renderNutrient(foodNutrient));
    }

    renderFood(selectedFood)
    {
        if (selectedFood != null)
        return(
        <Container>
            <pr>Name: {selectedFood.label} </pr>
            <pr>ID: {selectedFood.value} </pr>
            <div>Nutriens: {this.renderNutrients(selectedFood.food.foodNutrients)}</div>
        </Container>);
        else return null;
    }

    render () 
    {
        const { selectedOption } = this.state;
        const { selectedFood } = this.state;
        const food = this.renderFood(this.state.selectedFood);

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
                            <Button color="danger" onClick={this.state.food}>Food</Button>
                            </th>
                        </tr>
                        <tr>
                        <Select 
                                    //isMulti
                                    value={selectedFood}
                                    onChange={event => this.handleFoodChange(event)}
                                    options={this.state.food}/>
                        </tr>
                        </thead>  
                    </Table>
                </Container>
                {food}
            </div>
        );
    }
}