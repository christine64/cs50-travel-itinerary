import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Locations = () => {
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
                        locations.map(location => ( <li key={location.id}>{ location.name }</li> ))
                    }
                    </ul>
                : <h3>Loading Locations...</h3>
            }
        </div>
    )
}
