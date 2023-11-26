import React from 'react'
import classes from './Home.css'
import Hero from './Hero'



const Home = () => {
  return (
    <div className='desktop'>
    <div className={classes.container}>
      <div className='wrapper'>
        <h1>Welcome to Coffee.co</h1>
      </div>
    </div>
    </div>
  )
}

export default Home