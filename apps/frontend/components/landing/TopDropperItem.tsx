

const TopDropperItem = (src) => {

  return (
    <div className="bg-darkGray-800 dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5">
      <div className="relative w-44 h-16 flex items-center mx-auto my-3">
        <img src={src} className="w-full h-full object-scale-down" alt="Tiesto" />
      </div>

      <p className="text-white dark:text-darkGray-100 text-sm text-center leading-tight mb-1">
        
      </p>
    </div>

  )
}

export default TopDropperItem
