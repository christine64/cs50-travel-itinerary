import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';

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

    const parseDate = date => new Date(date).toDateString();

    return (
        <div className="travel-itinerary">
            <h1>Travel Itineraries</h1>
            {
                itineraries.length > 0 && !loading
                ? <ul>
                    {
                        itineraries.map(itinerary => ( 
                            <li key={itinerary.id}>
                                <p>Location:</p>
                                <p>{ itinerary.location.name }</p>
                                { console.log(itinerary) }
                                <p>Activites:</p>
                                <p>{ itinerary.activites && itinerary.activites[0].name }</p>
                                <p>Start Date:</p>
                                <p>{ parseDate(itinerary.start_date) }</p>
                                <p>End Date:</p>
                                <p>{ parseDate(itinerary.end_date) }</p>
                            </li> 
                        ))
                    }
                    </ul>
                : <h3>Loading Itineraries...</h3>
            }
        </div>
    )
}
