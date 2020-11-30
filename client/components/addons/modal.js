import React from 'react'

const Modal = (props) => {
  return (
    <div
      className="w-full z-50 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
       "
    >
      <div
        className="w-2/3 md:w-1/3 mx-auto flex flex-col justify-around items-center
        border border-gray-400 rounded bg-gray-800 text-gray-200 "
      >
        <div className="min-w-min mx-4 my-2 text-red-500">{props.content}</div>
        <button
          className="border border-gray-400 rounded-sm px-4 py-1 mb-2 hover:bg-gray-600"
          type="button"
          onClick={props.closePortal}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
