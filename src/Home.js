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
                    <Button color="danger" tag= {Link} to="/groups">Manage Clients</Button>
                    <Button color="primary" tag={Link} to="/food/">Food</Button>
                </Container>
            </div>
        );
    }
}

export default Home;