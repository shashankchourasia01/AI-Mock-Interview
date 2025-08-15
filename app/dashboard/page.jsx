
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='text-black'>
      <h2 className='font-bold text-2xl'>
        Dashboard
      </h2>
      <h2 className='text-gray-500 mt-2'>Create and Start your Mockup Interview with AI</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <InterviewList />

    </div>
  )
}

export default Dashboard
