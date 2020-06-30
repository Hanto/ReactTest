import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import FoodEdit from './FoodEdit';

class App extends Component
{
  // RENDER:
  //--------------------------------------------------------------------------------------------------------

  render()
  {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/groups' exact={true} component={GroupList}/>
            <Route path='/groups/:id' component={GroupEdit}/>
            <Route path='/food/' component={FoodEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;