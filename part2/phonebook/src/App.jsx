import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import {
  getPeople,
  createPerson,
  updatePerson,
  removePerson,
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    messageType: "",
  });

  const generateId = () => Math.max(...persons.map((person) => person.id)) + 1;

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) return;

    const personExist = persons.find((person) => person.name === newName);
    if (personExist) {
      if (
        !window.confirm(
          `${personExist.name} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;

      updatePerson(personExist.id, {
        number: newNumber,
      })
        .then(({ data }) => {
          setPersons((persons) =>
            persons.map((person) => {
              if (person.id === data.id) person.number = data.number;
              return person;
            })
          );
          notify(`updated ${newName}`)
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => console.error({ err }));
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: generateId(),
      };

      createPerson(newPerson)
        .then(({ data }) => {
          setPersons((persons) => persons.concat(data));
          notify(`Added ${newName}`)
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => console.error({ err }));
    }
  };

  const deletePerson = (id) => {
    removePerson(id)
      .then(() => {
        const { name } = persons.find(person => person.id === id)
        setPersons((persons) => persons.filter((person) => person.id !== id))
        notify(`${name} removed`)
      })
      .catch((err) => {
        if (err.response && err.response.status && err.response.status === 404) {
          setPersons((persons) => persons.filter((person) => person.id !== id))
          notify(`${persons.find(person => person.id === id).name} has already been removed from server`, 'error')
        } else {
          console.error({ err })
        }
      });
  };

  const notify = (message, type = 'success', timeout = 1000 * 15) => {
    setNotification({
      message,
      messageType: type
    })

    setTimeout(() => {
      setNotification({
        message: '',
        messageType: ''
      })
    }, timeout)
  }

  const handleFilter = (e) => setFilter(e.target.value);
  const handleNameInput = (e) => setNewName(e.target.value);
  const handleNumberInput = (e) => setNewNumber(e.target.value);

  useEffect(() => {
    getPeople()
      .then(({ data }) => setPersons(data))
      .catch((err) => console.error({ err }));
  }, []);

  const filtered = filter.trim().length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <Notification
        message={notification.message}
        messageType={notification.messageType}
      />
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        nameInput={handleNameInput}
        numberInput={handleNumberInput}
        submit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} persons={filtered} />
    </div>
  );
};

export default App;
