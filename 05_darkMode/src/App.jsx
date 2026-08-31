import React from 'react'
import DarkButton from './components/DarkButton'

const App = () => {
  return (
    <div >
      <div className='h-screen bg-emerald-300 text-2xl flex justify-center items-center dark:bg-primary-dark'>
        <DarkButton/>
         <h1 className='text-5xl font-bold'> in to the light there is always dark </h1>
      </div>
    </div>
  )
}

export default App