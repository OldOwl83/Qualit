import React from 'react'
import { GradesGrid } from './GradesGrid'
import { StudentsColumn } from './StudentsColumn'

export const GradeSheet = () => {
    return (
        <div id="mainSheet" className='animate__animated animate__fadeIn'>

            <StudentsColumn />
            <GradesGrid />
            
        </div>
    )
}
