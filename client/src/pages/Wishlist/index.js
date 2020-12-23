import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';

export const Wishlist = () => {
    const [wishlist, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState('');

    const fetchData = async () => {
        const result = await axios('http://localhost:8000/api/getwishlist/');

        setData(result.data);
        setLoading(false);
        setDeleteMessage('');
    };

    const removeFromWishlist = (e) => {
        e.preventDefault();
        
        const locationId = e.target.value;

        axios.delete(`http://localhost:8000/api/wishlist/${locationId}/`)
        .then((response) => {
            if (response.status !== 500 || response.status !== 404) {
                fetchData();
                return setDeleteMessage('successfully removed');
            }
        })
        .catch((error) => {
            fetchData();
            return setDeleteMessage(`unable to delete, ${error}`);
        })
    }

    useEffect(() => {       
        fetchData();
    }, []);

    return (
        <div className="wishlist">
            <h1>Your Locations Wishlist:</h1>
            {
                wishlist.length > 0 && wishlist.map((location, index) => 
                    <div className="wishlist-item" key={`location-${index}`}>
                        <h2>{ location.location.name }</h2>
                        <button className="delete" onClick={ removeFromWishlist } value={ location.id }>X</button>
                    </div>
                )
            }

            <span className="delete-message">{ deleteMessage }</span>
        </div>
    )
}
