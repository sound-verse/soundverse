
const SquarePic = (props) => {
    const { isMarketplace, data } = props;
  
    return data && (
      <div className="bg-darkGray-800 dark:bg-darkGray-800 overflow-hidden  rounded-lg p-3">
  
        <div className="w-44 h-10 border-white   flex items-center ">
          <img src={data.pic} className="artistImg w-full h-full object-scale-down " alt={data.name} />
        </div>
        <style jsx>{`
          .artistImg {
            width: 3.5rem;
            height: 3.5rem;
            box-sizing: border-box;
            border-radius: 1rem;
          }
        `}
        </style>
      </div>
    )
  }
  
  export default SquarePic
  