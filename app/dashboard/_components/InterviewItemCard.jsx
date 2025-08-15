import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();

    const onStart=() => {
        router.push('/dashboard/interview/' + interview?.mockId);
    }

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview.mockId +'/feedback');
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-700'>
        {interview?.jobPosition}
      </h2>
      <h2 className='text-sm text-gray-600 font-semibold'>
        {interview?.jobExperience} years of experience
      </h2>
      <h2 className='text-sm text-gray-400 font-semibold'>
        Created At: {interview?.createdAt}
      </h2>
      <div className='flex justify-between my-2 mt-2'>
        <Button size='sm' variant='outline' className='bg-cyan-100 text-black font-semibold'
        onClick={onFeedbackPress}
        >
            Feedback
        </Button>
        <Button size='sm' className='bg-blue-700 text-white font-semibold'
        onClick={onStart}
        >
            Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
