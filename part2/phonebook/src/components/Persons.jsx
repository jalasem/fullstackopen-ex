import React from 'react'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person, personIndex) => <p key={`person-${personIndex}`}>{person.name} {person.number}</p>)}
    </>
  )
}

export default Persons
