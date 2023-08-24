import React, { useState } from 'react';
import PersonsService from '../services'
import { useEffect } from 'react'
  
  const Persons = ({persons, setPersons, setNotification}) => {

    const handleDeleteButton = ({person}) => {
      //console.log(person.id)
      if (window.confirm(`Delete ${person.name}?`)) {
        PersonsService.deletePerson(person.id)
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
          <div>
            <p>{person.name} {person.number}</p>
            <button onClick={() => handleDeleteButton({person})}>delete</button>
          </div>)
        }
      </div>
    )
  }

export default Persons;