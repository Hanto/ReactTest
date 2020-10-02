import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Container, Table, Button } from 'reactstrap';
import AppNavbar from './AppNavbar';
import './FoodEdit.css';

export default class FoodEdit extends React.Component 
{
    state = 
    {
        nutrients: [],
        food: [],
        selectedNutrients: [],
        selectedFood: null,
        nutrientList: [],
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
            const nutrients = res.data
                .sort((a, b) => a.name > b.name ? 1: -1)
                .map(nutrient =>({label:nutrient.name, value: nutrient.id}));
            this.setState({ nutrients });
        })
    }

    getFood(selectedNutrients)
    {
        if (selectedNutrients == null)
        {
            this.setState({food: null})
            return
        }

        const params =
        {
            nutrients: selectedNutrients.map(option => option.value).join(','),
            page: '1',
            pagesize: '50'
        }

        return axios.get('/api/food/search2', { params })
        .then(res =>
        {
            const food = res.data
                .sort((a, b) => a.description > b.description ? 1: -1)
                .map(nutrients =>({label:nutrients.description, value: nutrients.fdcId, food: nutrients}));
            this.setState({ food });
        })
    }  

    handleChange(selectedNutrients)
    {
        const nutrientList = selectedNutrients == null ? [] : selectedNutrients.map(option => option.value);
        this.setState({nutrientList});
        this.setState({selectedNutrients});
        console.log("Option selected:", this.state.selectedNutrients);
        this.getFood(selectedNutrients);
    }

    handleFoodChange(selectedFood)
    {   this.setState({selectedFood}); }

    getOptions()
    {   
        return this.state.selectedNutrients != null ? 
            this.state.selectedNutrients.map(option => option.label + "(" + option.value + ") ") : 
            "Nothing";
    }

    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    renderNutrient(foodNutrient)
    {
        const isSelectedNutrient = this.state.nutrientList.indexOf(foodNutrient.nutrientID) >= 0 ? 
            'NutrientNameSelected' : 
            'NutrientNameNotSelected';

        return(<tr>
            <td class = {isSelectedNutrient}> {foodNutrient.name}</td>
            <td width="10%"></td>
            <td>{foodNutrient.amount} {foodNutrient.unitName}</td></tr>
        )
    }

    renderNutrients(foodNutrients)
    {
        return foodNutrients
            .sort((a, b) => a.rank > b.rank ? 1 : -1)
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
        else 
            return null;
    }

    render () 
    {
        const { selectedNutrients } = this.state;
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
                                    value={selectedNutrients}
                                    onChange={event => this.handleChange(event)}
                                    options={this.state.nutrients}/>
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