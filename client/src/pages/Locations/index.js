import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Locations = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(
          'http://localhost:8000/api/locations/',
        );
     
        setData(result.data);
    });

    return (
        <div>
            <h1>Location</h1>
            <ul>
                {
                    data.map((location) => {
                        <li>{ location.name }</li>
                    })
                }
            </ul>
        </div>
    )
}
