import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const HomeSite = () => {

    const navigate = useNavigate();

    return (
        <>
        <div className='animate__animated animate__fadeIn'>
        <header>
            <h1>Qualit</h1>

            <nav>
                <button>Documentación</button>
                <button onClick={ () => navigate( 'login' )}>Acceder</button>
                <button onClick={ () => navigate( 'register' )}>Registrarse</button>
            </nav>
        </header>

        <div id='version'>
            <p id='title'>Proyecto Qualit</p>
            <p>Versión 0.2</p>
            <p>Fase Beta: comienzo de pruebas en servidor. La estabilidad de la aplicación y la integridad de los datos ingresados no está garantizada.</p>
            <p>Fallas o sugerencias, por favor reportarlas <Link to={ './reports' }>aquí</Link>.</p>
            <p>Prueba de nuevas funcionalidades:</p>
            <ul>
                <li>exportación a planillas xlsx</li>
            </ul>
        </div>
        
        <footer id="footer">

            <ul id="footer_data">
                <li>© 2022 Mauro Donnantuoni Moratto</li>
                <li><a href="https://github.com/OldOwl83/Puzzlin">GitHub: OldOwl83</a></li>
                <li><a href="https://hellocode-blog.net/">Hello Code!</a></li>
            </ul>
            <img src="./developed.png" id="developed" alt="Developed by Old Owl" draggable="false" />

        </footer>
        </div>
        </>
    )
}
