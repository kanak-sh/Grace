export interface HobbyMeta {
  icon: string
  tone: 'peach' | 'lavender' | 'yellow' | 'mint' | 'blue'
}

const hobbyIcons: Record<string, HobbyMeta> = {
  reading: { icon: '📖', tone: 'peach' },
  yoga: { icon: '🧘', tone: 'lavender' },
  crochet: { icon: '🧶', tone: 'yellow' },
  music: { icon: '🎵', tone: 'blue' },
  art: { icon: '🎨', tone: 'mint' },
  travel: { icon: '✈️', tone: 'blue' },
  technology: { icon: '💻', tone: 'lavender' },
  gardening: { icon: '🌱', tone: 'mint' },
  photography: { icon: '📷', tone: 'peach' },
  running: { icon: '🏃', tone: 'yellow' },
  cooking: { icon: '🍳', tone: 'peach' },
}

const fallbackTones: HobbyMeta['tone'][] = ['peach', 'lavender', 'yellow', 'mint', 'blue']

export function getHobbyMeta(hobby: string, index = 0): HobbyMeta {
  return hobbyIcons[hobby.toLowerCase()] ?? { icon: '✨', tone: fallbackTones[index % fallbackTones.length] }
}

export interface HobbyRecommendation {
  kicker: string
  title: string
  highlight: string
  meta: string
  cta: string
}

const recommendations: Record<string, HobbyRecommendation> = {
  reading: { kicker: 'READING', title: 'A book you might like', highlight: 'A Light in the Attic', meta: 'Poetry • Feel-good', cta: 'View details' },
  yoga: { kicker: 'YOGA', title: 'A routine for you', highlight: 'Morning Stretch Flow', meta: '15 min • Beginner', cta: 'Start now' },
  crochet: { kicker: 'CROCHET', title: 'Beginner-friendly crochet ideas', highlight: 'Simple projects to get you started', meta: 'Tutorial • 30 min', cta: 'Explore now' },
  music: { kicker: 'MUSIC', title: 'A mood for you', highlight: 'Focus & Create playlist', meta: 'Playlist • 45 min', cta: 'Listen now' },
  art: { kicker: 'ART', title: 'Try this today', highlight: 'Sketch a 5-minute still life', meta: 'Exercise • Beginner', cta: 'View idea' },
  cooking: { kicker: 'COOKING', title: 'Cook something simple', highlight: 'One-pan pasta', meta: 'Recipe • 20 min', cta: 'View recipe' },
}

export function getRecommendation(hobby: string): HobbyRecommendation {
  return recommendations[hobby.toLowerCase()] ?? {
    kicker: hobby.toUpperCase(),
    title: 'Something new for you',
    highlight: hobby,
    meta: 'Personalized pick from Grace',
    cta: 'Explore now',
  }
}

export interface ContinueItem {
  hobby: string
  icon: string
  tone: HobbyMeta['tone']
  title: string
  meta: string
  progress: number
}

const continueData: Record<string, { title: string; meta: string; progress: number }> = {
  reading: { title: 'The Night Circus', meta: 'Chapter 4 of 12', progress: 32 },
  yoga: { title: 'Morning Stretch', meta: '15 min session', progress: 60 },
  crochet: { title: 'Granny Square', meta: 'Tutorial', progress: 30 },
  music: { title: 'Guitar Basics', meta: 'Lesson 2 of 8', progress: 25 },
  art: { title: 'Watercolor Basics', meta: 'Exercise 3 of 10', progress: 40 },
}

export function getContinueItems(hobbies: string[]): ContinueItem[] {
  return hobbies.map((hobby, i) => {
    const meta = getHobbyMeta(hobby, i)
    const saved = continueData[hobby.toLowerCase()]
    return {
      hobby,
      icon: meta.icon,
      tone: meta.tone,
      title: saved?.title ?? `${hobby} session`,
      meta: saved?.meta ?? 'In progress',
      progress: saved?.progress ?? 50,
    }
  })
}

export const exploreCategories = ['Reading', 'Yoga', 'Crochet', 'Art', 'Music']
