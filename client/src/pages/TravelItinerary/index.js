import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TravelItinerary = () => {
    const [itineraries, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8000/api/itineraries/');

            setData(result.data);
            setLoading(false);
        };
       
        fetchData();
    }, []);

    return (
        <div>
            <h1>Travel Itineraries</h1>
            {
                itineraries.length > 0 && loading
                ? <ul>
                    {
                        itineraries.map(itinerary => ( <li key={itinerary.id}>{ itinerary.name }</li> ))
                    }
                    </ul>
                : <h3>Loading Itineraries...</h3>
            }
        </div>
    )
}
