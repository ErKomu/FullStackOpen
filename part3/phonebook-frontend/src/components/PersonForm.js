import React from 'react';
import { useState } from 'react'
import axios from 'axios'
import PersonsService from '../services'
import Persons from './Persons';

const PersonForm = ({persons, setPersons, setNotification}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleAddPerson = (event) => {
      event.preventDefault()
      const nameObject = {
        id: newName,
        name: newName,
        number: newNumber
      }
      if (persons.filter(person => person.name === newName).length > 0) {
        if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
          const i = persons.findIndex(person => person.name === newName);
          console.log("Index:", i)
          console.log("Updating person:", nameObject)
          
          PersonsService.update(persons[i].id, nameObject)  
            .then(response => {
              console.log("Update successful. Response data:", response.data);
              const copy = [...persons];
              copy[i] = response.data;
              setPersons(copy);
              setNewName('');
              setNewNumber('');
              setNotification({ message: `Updated ${nameObject.name}`, type: 'notification' });
              setTimeout(() => {
                setNotification('');
              }, 5000);
            })
            .catch(error => {
              console.error("Update failed. Error:", error);
              setNotification({ message: `Information of ${nameObject.name} has been already deleted from server`, type: 'error' });
              setTimeout(() => {
                setNotification('');
              }, 5000);
            });
        }
      } else {
        PersonsService.create(nameObject).then(response => {
            setPersons(persons.concat(response.data))
            //console.log(response.data)
            setNewName('')
            setNewNumber('')
            setNotification({message: `Added ${nameObject.name}`, type: 'notification'})
            setTimeout(() => {
              setNotification('')
            }, 5000)
          })
          .catch(error => {
            setNotification({message: error.response.data.error, type: 'error'})
            setTimeout(() => {
              setNotification('')
            }, 5000)
            console.log(error.response.data)
          })
      }
    }
    return(
      <form>
          <div>
            name: <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            number: <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit"
            onClick={handleAddPerson}>
              add</button>
          </div>
        </form>
    )
  }

export default PersonForm;