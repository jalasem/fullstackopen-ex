import React from 'react'

function Filter({ filter, handleFilter }) {
  return (
    <p>Filter shown with <input value={filter} onInput={handleFilter} /></p>
  )
}

export default Filter
