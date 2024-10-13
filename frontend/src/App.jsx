import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DiabetesPrediction from './pages/DiabetesPrediction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DiabetesPrediction></DiabetesPrediction>
    </>
  )
}

export default App
