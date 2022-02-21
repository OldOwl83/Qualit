import React from 'react'
import { useSelector } from 'react-redux'

export const GradesGrid = () => {

    const { institutions, activeCourse } = useSelector( state => state.data );

    return (

        <div id="gradesGrid">

            <h3 className='cells'>{ `${ institutions[ activeCourse.institution ].institution } - ${ institutions[ activeCourse.institution ].groups[ activeCourse.group ].group } - ${ institutions[ activeCourse.institution ].groups[ activeCourse.group ].courses[ activeCourse.course ].course }` }</h3>

            

        </div>
    )
}
