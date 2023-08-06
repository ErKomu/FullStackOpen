import React from 'react';
import PersonService from '../services/PersonService';

const Person = ({person}) => {
    return (
      <p>{person.name} {person.number}</p>
    )
  }

  const Persons = ({persons, setPersons, setNotification}) => {
    const handleDeleteButton = ({person}) => {
      //console.log(person.id)
      if (window.confirm(`Delete ${person.name}?`)) {
        PersonService.remove(person.id)
        setPersons(persons.filter(p => p.id != person.id))
        setNotification({message: `${person.name} deleted`, type: 'error'})
        setTimeout(() => {
          setNotification('')
        }, 5000)
      }
    }

    return (
      <div>
        {persons.map(person => 
        <>
        <Person key={person.name} person={person}/>
        <button onClick={() => handleDeleteButton({person})}>delete</button>
        </>
        )}
      </div>
    )
  }

export default Persons;