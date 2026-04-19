import WorkoutForm from "./componenets/WorkoutForm";
import WorkoutTable from "./componenets/WorkoutTable";
import WorkoutFilter from "./componenets/WorkoutFilter";
import WorkoutStats from "./componenets/WorkoutStats";

import React from 'react'

const WorkoutPage = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2>Workout Planner</h2>
            {/* Stats */}
            <WorkoutStats />

            {/* Filter */}
            <WorkoutFilter />

            {/* Layout */}
            <div style={{ display: 'flex', gap: 24 }}>
                {/* Form */}
                <div style={{ width: '30%' }} />
                <WorkoutForm />

                {/* Table */}
                <div style={{ flex: 1 }}>
                    <WorkoutTable />
                </div>
            </div>
        </div>
    )
}

export default WorkoutPage