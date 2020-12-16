import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { CountryForm } from '../../components/CountryForm';

import './style.css';

export const Locations = ({ match }) => {
    const [locations, setData] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await axios(`http://localhost:8000/api/locations/`);

        setData(result.data);
    };

    const displayError = (error) => {
        setError(error);
    }

    const submitFunc = (data) => {
        axios.post('http://localhost:8000/api/locations/', data)
        .then((response) => response.statusText === 'Created' && fetchData())
        .catch((error) => displayError(error) )
    }

    return (
        <div className="locations">
            <h1>Location</h1>
            {
                locations.length > 0
                ? <ul>
                    {
                        locations.map(location => (
                                <li key={location.id}>
                                    { location.id && <Link to={`${match.path}/${location.id}`}>{ location.name }</Link> }
                                </li> 
                            )
                        )
                    }
                    </ul>
                : <h3>Loading Locations...</h3>
            }

            <div className="locations-form">
                <h2>Add A New Location:</h2>
                { error }
                <CountryForm submitFunc={submitFunc} />
            </div>
        </div>
    )
}
