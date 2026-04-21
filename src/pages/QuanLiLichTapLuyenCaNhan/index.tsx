import React from 'react'
import WorkoutFilter from './componenets/WorkoutFilter'
import WorkoutForm from './componenets/WorkoutForm'
import WorkoutStats from './componenets/WorkoutStats'
import WorkoutTable from './componenets/WorkoutTable'
import './index.css'
const WorkoutPage = () => {
    return (
        <div className='page'>
            <h2>Workout Planner</h2>

            {/* Stats */}
            <div className='stats'>
                <WorkoutStats />
            </div>

            {/* Filter */}
            <div className='filter'>
                <WorkoutFilter />
            </div>

            {/* Layout */}
            <div className='container'>
                {/* Form */}
                <div className='form'>
                    <WorkoutForm />
                </div>

                {/* Table */}
                <div className='table'>
                    <WorkoutTable />
                </div>
            </div>
        </div>
    )
}

export default WorkoutPage