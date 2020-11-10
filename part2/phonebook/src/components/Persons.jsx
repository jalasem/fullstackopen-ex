import React from 'react'

const Persons = ({ persons, deletePerson }) => {
  const delPerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) deletePerson(person.id)
  }
  return (
    <>
      {persons.map((person) => <p key={`person-${person.id}`}>{person.name} {' '} {person.number} <button onClick={() => delPerson(person)}>delete</button></p>)}
    </>
  )
}

export default Persons
