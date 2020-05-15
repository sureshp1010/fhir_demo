import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const LeftNav = ({ menuItems }) => {
    return (
        <div className="leftNav">
            <ul>
                {
                    menuItems.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link to={item.url}>{item.value}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default LeftNav;
