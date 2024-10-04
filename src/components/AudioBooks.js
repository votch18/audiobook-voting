import React from 'react'

export const AudioBooks = ({ loading, voting, audioBooks, onVote }) => {

  if (loading) return (
    <div className="rounded-xl  max-w-[800px] mx-auto mt-5 shadow-lg overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100" >{new Array(10).fill(10).map((_, i) => (
        <li key={i} className="flex justify-between gap-x-6 py-5 hover:bg-gray-50 p-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="h-[100px] w-[100px] flex-none rounded-lg bg-gray-50" />
            <div className="min-w-0 flex-auto content-center">
              <h1 className="text-xl font-semibold leading-6 text-gray-900 mb-3 bg-gray-50 max-w-[480px]"></h1>
              <p className="mt-1 truncate text-lg leading-5 text-gray-500 bg-gray-50 max-w-[480px]" ></p>
              <p className="mt-1 truncate text-lg leading-5 text-gray-500 bg-gray-50 max-w-[180px]" ></p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Vote</button>
          </div>
        </li>
      ))}
      </ul>
    </div>);
  return (
    <><div className="rounded-xl  max-w-[800px] mx-auto mt-5 shadow-lg overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100" >
        {audioBooks.map((audioBook, i) => (
          <li key={i} className="flex justify-between lg:gap-x-6 py-5 hover:bg-gray-50 p-2 lg:p-5">
            <div className="flex min-w-0 gap-x-4">
              <img alt="" src={audioBook.cover_image} className="w-[60px] h-[60px] lg:h-[100px] lg:w-[100px] flex-none rounded-lg bg-gray-50" />
              <div className="min-w-0 flex-auto content-center">
                <h1 className="text-lg lg:text-xl font-semibold leading-6 text-gray-900 mb-1">{audioBook.title}</h1>
                <p className="mt-1 truncate lg:text-lg leading-5 text-gray-500 mb-1">{audioBook.author}</p>
                <p className="mt-1 truncate lg:text-lg leading-5 text-gray-500">Votes: {audioBook.vote_count}</p>
              </div>
            </div>
            <div className="sm:flex sm:flex-col sm:items-end justify-center content-center">
              {audioBook.user_voted ? (
                <span class="bg-green-100 text-green-800 text-lg font-bold me-2 px-2.5 py-0.5 rounded">Voted</span>
              ) : (
                <button type="button" disabled={voting} onClick={() => onVote(audioBook.id)} className="text-white bg-blue-700 font-bold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Vote</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div></>
  )
}
