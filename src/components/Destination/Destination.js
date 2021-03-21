import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import transportData from '../../data/data.json';


const Destination = () => {
    var {id} = useParams();
    const [transports,setTransports] = useState([]);
    useEffect(()=>{
        setTransports(transportData);
    },[])
    const transport = transports.find(transport => transport.id === parseInt(id));

    return (
        <div>
         <p>{transport?.name}</p>
        </div>
    );
};

export default Destination;