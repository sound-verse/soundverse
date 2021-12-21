
const DropItem = (props) => {
  const { isMarketplace, data } = props;

  return data && (
    <div className="bg-darkGray-800 dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5">

      <div className="w-44 h-16 flex items-center mx-auto my-3 mb-6">
        <img src={data.pic} className="artistImg w-full h-full object-scale-down" alt={data.name} />
      </div>

      <p className="text-white text-xs dark:text-darkGray-100 leading-tight mb-1">
        {data.name}
      </p>

      <p className="text-xs text-white dark:text-darkGray-400 mb-0.5">{data.title} <div className="font-bold">{data.album}</div></p>

      <div className="rounded-full w-full mb-2">
        <p className="text-xs text-white mb-2 mt-2">
          Lowest Ask 
        </p>
        <p className="text-xs text-white dark:text-darkGray-400 mb-0.5">
          <h2 className="text-lg font-bold">USD ${data.lowest_ask}</h2> ${data.avg_sale} Avg Sale
        </p>
        <p className="text-xs text-white dark:text-darkGray-400 mt-3 mb-0.5">
          {data.num_listings} listings
        </p>
      </div>
      <style jsx>{`
        .artistImg {
          width: 7.5rem;
          height: 7.5rem;
          border: 10px solid #7C4DFF;
          box-sizing: border-box;
          border-radius: 56px;
        }
      `}
      </style>
    </div>
  )
}

export default DropItem
