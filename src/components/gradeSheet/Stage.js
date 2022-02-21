import React from 'react'

export const Stage = ( { stageObj } ) => {


    const handleStageUpdate = () => {};

    return (
        <div>

            <h4 
                className='cells buttons'
                title='Editar etapa' 
                onClick={ handleStageUpdate }
            >
                { stageObj.stage }
            </h4>

        </div>
    )
}
