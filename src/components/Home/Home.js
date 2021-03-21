import React, { useEffect, useState } from 'react';
import { Form, Nav, Navbar, Button, Card, CardDeck } from 'react-bootstrap';
import './Home.css';
import transportData from '../../data/data.json';
import Destination from '../Destination/Destination';
import { useHistory } from 'react-router';

const Home = () => {
    const [transports,setTransports] = useState([]);
    useEffect(()=>{
        setTransports(transportData);
    },[])
    const history = useHistory()
    const handleCard = (id) => {
        history.push(`/destination/${id}`);
    }
    return (
        <div className="container">
            <CardDeck className="card-position">
                {
                     transports.map(transport =>
                        <Card className="card-style text-center" onClick={() => handleCard(transport.id)}>
                            <Card.Header>
                                <Card.Img variant="top" className="" src= {transport.image}/>
                            </Card.Header>
                            <Card.Footer>
                                <Card.Title>{transport.name}</Card.Title>
                            </Card.Footer>
                        </Card>
                    )
                }
            </CardDeck>
        </div>
        
        
    );
};

export default Home;