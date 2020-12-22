import React from 'react';

import './style.css';

export const Homepage = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-header">
                <h1 className="homepage-header-text">Travel Itinerary</h1>
            </div>

            <div className="homepage-section --sm">
                <p>Ever found yourself writing all your plans in a diary for your holiday, only to then forget it. Well our app [app name] should fix your problem. Have all your travel itineraries in one place, and add further future travel wishlist locations! As well as that we'll show you extra information about that country if you add it to locations.</p>
            </div>

            <div className="homepage-section --lg --dark">
                <div className="homepage-extra-info">
                    <img src="https://lp-cms-production.imgix.net/2020-12/shutterstockRF_606633635.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=50&dpr=2/" alt="cenote" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in leo justo. Nulla facilisi.</p>
                </div>

                <div className="homepage-extra-info">
                    <img src="https://lp-cms-production.imgix.net/2020-12/shutterstockRF_1008216889.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=50&dpr=2" alt="cenote" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in leo justo. Nulla facilisi.</p>
                </div>

                <div className="homepage-extra-info">
                    <img src="https://lp-cms-production.imgix.net/2020-12/shutterstockRF_753944293.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=50&dpr=2" alt="cenote" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in leo justo. Nulla facilisi.</p>
                </div>
            </div>

            <div className="homepage-section --sm --long">
                <p>Ever found yourself writing all your plans in a diary for your holiday, only to then forget it. Well our app [app name] should fix your problem. Have all your travel itineraries in one place, and add further future travel wishlist locations! As well as that we'll show you extra information about that country if you add it to locations.</p>
            </div>
        </div>
    )
}