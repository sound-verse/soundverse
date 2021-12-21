const SelectOption = ({ title, options }) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="relative text-blue-900 dark:text-darkGray-100 w-full bg-white dark:bg-darkGray-900 border border-gray-300 dark:border-darkGray-500 rounded-md shadow-sm pl-3 pr-10 py-3 text-left focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 hover:bg-gray-50 dark:hover:bg-darkGray-800 cursor-pointer"
      >
        <span>{title}</span>
      </button>

      <div className="hidden absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10">
        <ul className="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none border border-gray-200 dark:border-darkGray-600">
          {options.map((option) => (
            <li
              role="option"
              key={option}
              className="text-blue-900 dark:text-darkGray-100 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 dark:hover:bg-darkGray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SelectOption
