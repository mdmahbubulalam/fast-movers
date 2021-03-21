import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import transportData from '../../data/data.json';
import './Destination.css';


const Destination = () => {
    const {id} = useParams();
    const [searchResult,setSearchResult] = useState(false);
    const [transports,setTransports] = useState([]);
    useEffect(()=>{
        setTransports(transportData);
    },[])
    const transport = transports.find(transport => transport.id === parseInt(id));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3 bg-light rounded p-2">
                    {  
                        !searchResult ?
                        <div className=" destination-info">
                            <h5>Pick From</h5>
                            <p className="bg-secondary rounded p-1 text-white">Mirpur 1</p>
                            <h5>Pick To</h5>
                            <p className="bg-secondary rounded p-1 text-white">Dhanmondi</p>
                            <button className="btn btn-info btn-block" onClick={() => setSearchResult(true)}>Search</button>
                        </div>
                            :
                        <div className="transport-info">
                            <h5 className="bg-success p-2 mt-2 rounded">Mirpur 1 <br/> to <br/> Dhanmondi</h5>
                            <span><img src={transport?.image} className="imag-fluid transport-image m-3 pr-2" alt=""/></span>
                            <span className="pr-4">{transport?.name}</span>
                            <span>{transport?.price}</span>
                        </div>
                    }
                    
                    
                </div>
                <div className="col-md-9">

                </div>
            </div>
            
        </div>
    );
};

export default Destination;