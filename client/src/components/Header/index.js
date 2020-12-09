import React from 'react';

import './style.css';

export const Header = ({ children }) => {
    return (
        <nav className="header">
            {
                children
            }
        </nav>
    )
}