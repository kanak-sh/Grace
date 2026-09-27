
import { useEffect, useState } from 'react'
import { getBackendHealth } from './services/api'

function App() {
  const [message, setMessage] = useState('Connecting to Grace...')
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    getBackendHealth()
      .then((data) => {
        setMessage(data.message)
        setConnected(true)
      })
      .catch(() => {
        setMessage('Unable to connect to Grace backend')
      })
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }}>
      <h1>Welcome to Grace 🌸</h1>
      <p>{message}</p>
      <p>
        {connected
          ? 'Frontend and backend are connected!'
          : 'Checking backend connection...'}
      </p>
    </main>
  )
}

export default App