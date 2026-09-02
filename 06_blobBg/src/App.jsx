import React from 'react'

const App = () => {
  return (
    <section className='relative overflow-hidden'>
       <div className='absolute inset-0 pointer-events-none -z-10'>
        <div className='absolute left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-amber-300/40 blur-2xl'>
                
        </div>

       </div>
       <div className="relative z-10 text-9xl text-center">
        <h1>RepoRadar</h1>
        <p>Analyze GitHub Repos like a Pro</p>
        <button>Get Started</button>
      </div>
    </section>
  )
}

export default App

