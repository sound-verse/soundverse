import React from 'react'

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  return (
    <input
      className="marketplace-searchbar"
      key="random1"
      value={keyword}
      placeholder={'Search by DJ, Event, Genre'}
      onChange={(e) => setKeyword(e.target.value)}
    />
  )
}

export default SearchBar
