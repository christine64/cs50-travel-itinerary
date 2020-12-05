import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Country = ({ match }) => {
    const [country, setData] = useState([]);

    const [ideas, setIdeas] = useState([]);

    const {
        params: { locationId },
    } = match;

    useEffect(() => {
        const fetchData = async () => {
            console.log(match)
            const result = await axios(`http://localhost:8000/api/locations/${locationId}/`);

            setData(result.data);
        };
       
        fetchData();
    }, [locationId]);

    return (
        <div>
            <h1>Country</h1>
            {
                <p>{ country.name }</p>
            }
        </div>
    )
}
