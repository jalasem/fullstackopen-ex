import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the numberbook`)
      return
    }
    // else if (persons.find(person => person.number === newnumber)) {
    //   alert(`${newnumber} is already added to the numberbook`)
    //   return
    // }

    setPersons(persons => persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const filtered = filter.trim().length ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <p>Filter shown with <input value={filter} onInput={e => setFilter(e.target.value)} /></p>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onInput={ e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onInput={ e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map((person, personIndex) => <p key={`person-${personIndex}`}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App