import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component
{
    // RENDER:
    //--------------------------------------------------------------------------------------------------------

    render()
    {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/groups">Manage Clients</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;