import { printIntrospectionSchema } from 'graphql'
import React from 'react'
import { useState } from 'react'

export default function LoadingModal(props) {
  return (
    <div>
      <div
        className="
    
    overflow-x-hidden overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    justify-center
    items-center
  "
        id="modal-example-small"
      >
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/* content */}
          <div
            className="
        border-0
        rounded-lg
        shadow-lg
        relative
        flex flex-col
        w-full
        bg-white
        outline-none
        focus:outline-none
      "
          >
            {/* <!--header--> */}
            <div
              className="
          flex
          items-start
          justify-between
          p-5
          border-b border-solid border-gray-200
          rounded-t
        "
            >
              <h3 className="text-3xl font-semibold text-black">
                Transaction Submitted
              </h3>
              <button
                className="
            p-1
            ml-auto
            bg-transparent
            border-0
            text-purple-500
            float-right
            text-3xl
            leading-none
            font-semibold
            outline-none
            focus:outline-none
          "
                onClick={props.onClick}
              >
                <span
                  className="
              bg-transparent
              h-6
              w-6
              text-2xl
              block
              outline-none
              focus:outline-none
            "
                >
                  <i className="fas fa-times">x</i>
                </span>
              </button>
            </div>
            {/* <!--body--> */}

            <div className="flex flex-col justify-center items-center m-8">
              <h2 className="text-3xl font-semibold text-black mb-6 ">
                Loading...
              </h2>

              <div
                className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-4 border-b-4 border-purple-500
    "
              ></div>
            </div>

            {/* <!--footer--> */}
            <div
              className="
          flex
          items-center
          justify-end
          p-6
          border-t border-solid border-gray-200
          rounded-b
        "
            >
              <button
                className="
            text-purple-500
            background-transparent
            font-bold
            uppercase
            px-6
            py-2
            text-sm
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
                type="button"
                onClick={props.onClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        id="modal-example-small-backdrop"
      ></div>
    </div>
  )
}
