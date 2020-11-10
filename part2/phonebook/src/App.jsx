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

  const generateId = () => Math.max(...persons.map(person => person.id)) + 1

  const addPerson = event => {
    event.preventDefault()

    if (!newName || !newNumber) return 

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the numberbook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: generateId()
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(({data}) => {
        setPersons(persons => persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => console.error({ err }))
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