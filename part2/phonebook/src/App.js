import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!newName || !newNumber) return 

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the numberbook`)
      return
    }

    setPersons(persons => persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = e => setFilter(e.target.value)
  const handleNameInput = (e) => setNewName(e.target.value)
  const handleNumberInput = (e) => setNewNumber(e.target.value)

  useEffect(() => {
    axios('http://localhost:3001/persons')
      .then(({ data }) => setPersons(data))
      .catch((err) => console.error({ err }))
  }, [])

  const filtered = filter.trim().length ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        nameInput={handleNameInput}
        numberInput={handleNumberInput}
        submit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={filtered} />
    </div>
  )
}

export default App