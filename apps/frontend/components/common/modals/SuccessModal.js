import React from 'react'

export default function SuccessModal({ open, toggle, children, onConfirm }) {
  const handleClick = () => {
    toggle()
    onConfirm()
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"></div>
        </div>

        <div className="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 overflow-hidden shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full">
          <div>
            <div>
              <h3 className="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center">
                Notification
              </h3>

              <fieldset>{children}</fieldset>
            </div>
          </div>
          <div className="mt-6 flex justify-center flex-row-reverse">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
              onClick={handleClick}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
