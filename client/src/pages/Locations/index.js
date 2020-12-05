import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Locations = ({ match }) => {
    const [locations, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8000/api/locations/');

            setData(result.data);
        };
       
        fetchData();
    }, []);

    return (
        <div>
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
        </div>
    )
}
