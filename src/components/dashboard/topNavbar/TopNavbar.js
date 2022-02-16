import React from 'react'
import { CourseSelector } from './CourseSelector'
import { UserProfile } from './UserProfile'

export const TopNavbar = () => {
    return (
    
        <div id="topNavbar">

            <CourseSelector />

            <UserProfile />
        </div>
    )
}
