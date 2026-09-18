import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
}

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...')

  useEffect(() => {
    const controller = new AbortController()

    async function checkApi() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data: HealthResponse = await response.json()
        setApiStatus(data.status)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setApiStatus('unavailable')
        }
      }
    }

    checkApi()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <main>
      <h1>Paleia</h1>
      <p>API status: {apiStatus}</p>
    </main>
  )
}

export default App
