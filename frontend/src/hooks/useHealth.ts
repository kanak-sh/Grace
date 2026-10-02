import { healthData, type HealthData } from '../services/healthData'

// Today this returns local mock data.
// Later this can be swapped for a fetch against the backend.
export function useHealth(): HealthData {
  return healthData
}
