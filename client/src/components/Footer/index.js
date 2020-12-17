import React from 'react';

import './style.css';

export const Footer = () => {
    return (
        <div className="footer">
            <p>© 2020 Travel Itinerary</p>
            <ul>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
    )
}