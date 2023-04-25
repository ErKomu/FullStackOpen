import React from 'react';

const Course = ({course}) => {

    return (
        <div>
            <Header header={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({header}) => {
    return(
        <h1>{header}</h1>
    )
  }

  const Content = ({parts}) => {
    return(
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  

  const Total = ({parts}) => {
    let total = parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
    return(
      <p>Number of exercises {total}</p>
    )
  }


export default Course;