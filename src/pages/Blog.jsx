import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Blog() {
  return (
    <div className='container'>
        <ul>
            <li><NavLink to="/blog/1">Blog One</NavLink></li>
            <li><NavLink to="/blog/2">Blog Two</NavLink></li>
        </ul>
    </div>
  )
}
