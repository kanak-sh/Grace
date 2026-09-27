
const API_BASE_URL = '/api/v1'

export interface HealthResponse {
  status: string
  application: string
  message: string
}

export async function getBackendHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`)

  if (!response.ok) {
    throw new Error('Unable to connect to Grace backend')
  }

  return response.json()
}