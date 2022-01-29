import React, { useEffect, useState } from 'react'
import SoundCard from './SoundCard'

const Drops = ({ dropList = [] }) => {
  return (
    <>
      {dropList.map((data, key) => (
        <div className="col-12-sm col-6-md col-4-lg col-3-xl " key={key}>
          <div className="spacer"> </div>
          <SoundCard data={data} key={key} />
        </div>
      ))}
    </>
  )
}

export default Drops
