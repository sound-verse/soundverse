
const JoinDiscord = () => {

  return (
    <div className="flex flex-col w-96 h-56 mt-4 bg-purple-400 overflow-hidden shadow rounded-2xl p-5">
      <div className="flex-grow"></div>
      <div className="mt-11">
        <button className="joinBtn w-40 h-8 text-white text-lg font-black rounded">Join Discord</button>
        <p className="text-white dark:text-darkGray-400 mt-5 mb-0.5">
          500,000 Members
        </p>
      </div>
      <style jsx>{`
        .joinBtn {
          background: #FFFFFF;
          border-radius: 60px;
          color: #6200EA;
        }
      `}
      </style>
    </div>
  )
}

export default JoinDiscord
