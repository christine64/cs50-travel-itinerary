import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Country = ({ match }) => {
    const [country, setData] = useState([]);

    const [countryInformation, setCountryInformation] = useState([]);

    const {
        params: { locationId },
    } = match;

    const getCountryInformation = async (name) => {
        const result = await axios(`https://restcountries.eu/rest/v2/name/${name}`);

        setCountryInformation(result.data);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:8000/api/locations/${locationId}/`);

            setData(result.data);
            getCountryInformation(result.data.name);
        };
       
        fetchData();
    }, [locationId]);

    return (
        <div>
            <h1>Country</h1>
            {
                countryInformation.length > 0 && 
                <div>
                    { 
                        countryInformation.map((location, index) =>
                            <div className="country-information" key={index}>
                                <h1>{ location.name }</h1>
                                <img src={ location.flag } alt={`${country.name} flag`} />
                                <span>
                                    Currencies: { 
                                        location.currencies.length > 1 
                                        ? location.currencies.map((currency, index) => (
                                            <span key={index}>
                                                <p>{ currency.code }</p>
                                            </span>
                                        ))
                                        : <p>{ location.currencies[0].code }</p>
                                    }
                                </span>
                                <span>
                                    Languages: { 
                                        location.languages.length > 1 
                                        ? location.languages.map((language) => (
                                            <span key={index}>
                                                <p>{ language.name }</p>
                                            </span>
                                        ))
                                        : <p>{ location.languages[0] }</p>
                                    }
                                </span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}
