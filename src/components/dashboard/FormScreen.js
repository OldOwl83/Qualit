import React from 'react'

export const FormScreen = ( { formComponent } ) => {
    return (
        <div className='modal-bg animate__animated animate__fadeIn'>
                { formComponent }
        </div>
    )
}
