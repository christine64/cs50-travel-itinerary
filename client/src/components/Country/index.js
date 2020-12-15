import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Country = ({ match }) => {
    const [country, setData] = useState([]);
    const [error, setError] = useState([]);

    const [countryInformation, setCountryInformation] = useState([]);

    const {
        params: { locationId },
    } = match;

    const getCountryInformation = async (name) => {
        const result = await axios(`https://restcountries.eu/rest/v2/name/${name}`);

        setCountryInformation(result.data);
    }

    const displayError = (error) => {
        setError(error);
    }

    const fetchData = async () => {
        const result = await axios(`http://localhost:8000/api/locations/${locationId}/`);

        setData(result.data);
        getCountryInformation(result.data.name);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addToWishlist = () => {
        const data = {
            "location": country
        };

        axios.post('http://localhost:8000/api/wishlist/', data)
        .then((response) => response.statusText === 'Created' && fetchData()) && console.log('posted')
        .catch((error) => displayError(error) )
    }

    return (
        <div>
            <h1>Country</h1>
            {
                countryInformation.length > 0 && 
                <div>
                    { 
                        countryInformation.map((location, index) =>
                            <div className="country-information" key={`location-${index}`}>
                                <h1>{ location.name }</h1>
                                <button onClick={ addToWishlist }>Add Country To Wishlist</button>
                                { error }
                                <img src={ location.flag } alt={`${country.name} flag`} />
                                <span>
                                    Currencies: { 
                                        location.currencies.length > 1 
                                        ? location.currencies.map((currency, index) => (
                                            <span key={`currency-${index}`}>
                                                <p>{ currency.code }</p>
                                            </span>
                                        ))
                                        : <p>{ location.currencies[0].code }</p>
                                    }
                                </span>
                                <span>
                                    Languages: { 
                                        location.languages.length > 1 
                                        ? location.languages.map((language, index) => (
                                            <span key={`language-${index}`}>
                                                <p>{ language.name }</p>
                                            </span>
                                        ))
                                        : <p>{ location.languages[0].name }</p>
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
