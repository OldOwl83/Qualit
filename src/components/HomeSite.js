import React from 'react'
import { Link } from 'react-router-dom'

export const HomeSite = () => {

    return (
        <>
        <h2>Bienvenidos a Qualit</h2>
        <Link to="register">Ir a la página de registro</Link>
        <Link to="login">Ir a la página de acceso</Link>
        </>
    )
}
