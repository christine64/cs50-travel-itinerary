import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';

export const Country = ({ match }) => {
    const [country, setData] = useState([]);
    const [error, setError] = useState([]);
    const [isOnWishlist, setIsOnWishlist] = useState(false);

    const [countryInformation, setCountryInformation] = useState([]);

    const {
        params: { locationId },
    } = match;

    const fetchWishlist = async () => {
        const result = await axios('http://localhost:8000/api/getwishlist/');

        if (result) {
            return result.data.filter((i) => i.location.id == locationId).length > 0
                ? setIsOnWishlist(true)
                : null;
        }
    };

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
        fetchWishlist();
    }, []);

    const addToWishlist = (e) => {
        if (locationId === '') {
            displayError('Unable to add location to wishlist, please try again');
        }

        e.preventDefault();
        const data = {
            "location": Number(locationId),
            "owner": 2
        };

        axios.post('http://localhost:8000/api/wishlist/', data)
        .then((response) => 
            response.statusText === 'Created' && setIsOnWishlist(true) && fetchWishlist()
        )
        .catch((error) => displayError(error))
    }

    return (
        <div className="country">
            {
                countryInformation.length > 0 && 
                <div>
                    { 
                        countryInformation.map((location, index) =>
                            <div className="country-information" key={`location-${index}`}>
                                <h1>{ location.name }</h1>
                                { isOnWishlist ? <p className="country-information-button">Country is on wishlist</p> : <button className="country-information-button" onClick={ addToWishlist } value={location.id}>Add To Wishlist</button> }
                                { error }
                                <img src={ location.flag } alt={`${country.name} flag`} />
                                <span className="information">
                                    <span className="label">Currencies:</span> { 
                                        location.currencies.length > 1 
                                        ? location.currencies.map((currency, index) => (
                                            <span key={`currency-${index}`}>
                                                <p> { currency.code }</p>
                                            </span>
                                        ))
                                        : <p>{ location.currencies[0].code }</p>
                                    }
                                </span>
                                <span className="information">
                                    <span className="label">Languages:</span> { 
                                        location.languages.length > 1 
                                        ? location.languages.map((language, index) => (
                                            <span key={`language-${index}`}>
                                                <p> { language.name }</p>
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
