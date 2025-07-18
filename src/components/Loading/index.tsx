import React from 'react'

const Loading = () => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-30 flex items-center justify-center z-[5000]">
            <div className="w-20 h-20 bg-transparent rounded-full border-y-8 border-y-white border-x-8 border-x-solar-green-primary animate-spin" />
        </div>
    )
}

export default Loading