import React from 'react'
import { Link } from 'react-router-dom'

function MenuItemLink({ children, to }) {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            {children}
        </Link>
    )
}

export default MenuItemLink
