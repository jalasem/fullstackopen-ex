import React from 'react'

function Part ({ part }) {
  return (<p>
    {part.name} {part.exercises}
  </p>)
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part, partIndex) => <Part key={`part_${partIndex}`} part={part} />)}
    </>
  )
}

export default Content
