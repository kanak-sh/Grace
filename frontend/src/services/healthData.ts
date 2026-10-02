export interface DayHealth {
  date: string // e.g. "Mon, Sep 29"
  steps: number
  sleepMinutes: number
  waterGlasses: number
  heartRate: number
}

export interface HealthData {
  today: DayHealth
  goals: {
    steps: number
    sleepMinutes: number
    waterGlasses: number
    heartRate: number
  }
  history: DayHealth[]
}

function formatDay(offset: number): string {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const today: DayHealth = {
  date: formatDay(0),
  steps: 3250,
  sleepMinutes: 450, // 7h 30m
  waterGlasses: 5,
  heartRate: 72,
}

const history: DayHealth[] = [
  { date: formatDay(1), steps: 6842, sleepMinutes: 444, waterGlasses: 8, heartRate: 70 },
  { date: formatDay(2), steps: 5120, sleepMinutes: 402, waterGlasses: 6, heartRate: 74 },
  { date: formatDay(3), steps: 9310, sleepMinutes: 468, waterGlasses: 8, heartRate: 69 },
  { date: formatDay(4), steps: 2740, sleepMinutes: 375, waterGlasses: 4, heartRate: 73 },
  { date: formatDay(5), steps: 8055, sleepMinutes: 441, waterGlasses: 7, heartRate: 71 },
  { date: formatDay(6), steps: 6200, sleepMinutes: 420, waterGlasses: 5, heartRate: 72 },
]

export const healthData: HealthData = {
  today,
  goals: {
    steps: 8000,
    sleepMinutes: 480,
    waterGlasses: 8,
    heartRate: 72,
  },
  history,
}

export function formatSleep(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

export function stepProgress(steps: number, goal: number): number {
  return Math.min(100, Math.round((steps / goal) * 100))
}
