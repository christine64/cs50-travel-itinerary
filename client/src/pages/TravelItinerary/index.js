import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ItineraryForm } from '../../components/ItineraryForm';

import './style.css';

export const TravelItinerary = () => {
    const [itineraries, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const result = await axios('http://localhost:8000/api/getitineraries/');

        setData(result.data);
        setLoading(false);
    };

    useEffect(() => {
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
                                <p><span className="label">Location:</span></p>
                                <p>{ itinerary.location.name }</p>
                                {
                                    (itinerary.activites && itinerary.activites.name !== null) &&
                                    <span>
                                        <p>Activites:</p>
                                        <p>{ itinerary.activites.name }</p>
                                    </span>
                                }
                                <p><span className="label">Start Date:</span></p>
                                <p>{ parseDate(itinerary.start_date) }</p>
                                <p><span className="label">End Date:</span></p>
                                <p>{ parseDate(itinerary.end_date) }</p>
                            </li> 
                        ))
                    }
                    </ul>
                : <h3>Loading Itineraries...</h3>
            }
            <ItineraryForm updateItineraries={fetchData} />
        </div>
    )
}
