import React from 'react'

const App = () => {
  return (
    <button 
    onClick={async () => {
    const res = await fetch('/api')
    const data = await res.text();
    console.log(data)
    }}>
      Click
    </button>
  )
}

export default App