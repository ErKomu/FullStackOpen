import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import PersonService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message: '', type: ''})
  
  const personsToShow = (filter.length === 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    PersonService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} classname={notification.type} />
      <FilterForm filter={filter} setFilter={setFilter}/>
      <h3>add new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} setNotification={setNotification}/>
    </div>
  )

}

export default App
