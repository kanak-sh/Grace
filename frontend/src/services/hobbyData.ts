export type HobbyTone = 'peach' | 'lavender' | 'yellow' | 'mint' | 'blue'

export interface HobbyMeta {
  icon: string
  tone: HobbyTone
}

const fallbackTones: HobbyTone[] = ['peach', 'lavender', 'yellow', 'mint', 'blue']

export interface HobbyCatalogEntry extends HobbyMeta {
  value: string
  label: string
  tags: string[]
}

// Every hobby Grace can surface. Onboarding stores lowercase `value`s;
// custom hobbies typed by the user fall back to generic metadata.
export const hobbyCatalog: HobbyCatalogEntry[] = [
  { value: 'reading', label: 'Reading', icon: '📖', tone: 'peach', tags: ['books', 'movies', 'writing', 'science', 'nature'] },
  { value: 'yoga', label: 'Yoga', icon: '🧘', tone: 'lavender', tags: ['fitness', 'health', 'nature', 'sports'] },
  { value: 'crochet', label: 'Crochet', icon: '🧶', tone: 'yellow', tags: ['crafts', 'art', 'fashion'] },
  { value: 'crafting', label: 'Crafting', icon: '🧵', tone: 'yellow', tags: ['crafts', 'art', 'fashion'] },
  { value: 'music', label: 'Music', icon: '🎵', tone: 'blue', tags: ['music', 'movies'] },
  { value: 'instruments', label: 'Instruments', icon: '🎸', tone: 'blue', tags: ['music'] },
  { value: 'art', label: 'Art', icon: '🎨', tone: 'mint', tags: ['art', 'crafts', 'fashion'] },
  { value: 'painting', label: 'Painting', icon: '🖼️', tone: 'mint', tags: ['art', 'crafts'] },
  { value: 'travel', label: 'Travel', icon: '✈️', tone: 'blue', tags: ['travel', 'nature', 'food'] },
  { value: 'technology', label: 'Technology', icon: '💻', tone: 'lavender', tags: ['technology', 'science', 'gaming'] },
  { value: 'gardening', label: 'Gardening', icon: '🌱', tone: 'mint', tags: ['nature', 'food', 'fitness'] },
  { value: 'photography', label: 'Photography', icon: '📷', tone: 'peach', tags: ['photography', 'travel', 'art', 'nature'] },
  { value: 'running', label: 'Running', icon: '🏃', tone: 'yellow', tags: ['sports', 'fitness', 'nature'] },
  { value: 'hiking', label: 'Hiking', icon: '🥾', tone: 'mint', tags: ['nature', 'travel', 'fitness', 'sports'] },
  { value: 'cooking', label: 'Cooking', icon: '🍳', tone: 'peach', tags: ['food'] },
  { value: 'writing', label: 'Writing', icon: '✍️', tone: 'lavender', tags: ['writing', 'books', 'art'] },
  { value: 'dancing', label: 'Dancing', icon: '💃', tone: 'peach', tags: ['fitness', 'music', 'sports'] },
  { value: 'gaming', label: 'Gaming', icon: '🎮', tone: 'blue', tags: ['gaming', 'technology'] },
]

const catalogByValue = new Map(hobbyCatalog.map((entry) => [entry.value, entry]))

export function getHobbyMeta(hobby: string, index = 0): HobbyMeta {
  const entry = catalogByValue.get(hobby.toLowerCase())
  if (entry) return { icon: entry.icon, tone: entry.tone }
  return { icon: '✨', tone: fallbackTones[index % fallbackTones.length] }
}

export function getHobbyLabel(hobby: string): string {
  const entry = catalogByValue.get(hobby.toLowerCase())
  if (entry) return entry.label
  return hobby.charAt(0).toUpperCase() + hobby.slice(1)
}

export interface ContentItem {
  id: string
  title: string
  subtitle?: string
}

export interface HobbySection {
  title: string
  items: ContentItem[]
}

export interface ContinueSeed {
  title: string
  meta: string
  progress: number // 0-100 seed used until the user saves real progress
}

export interface HobbyContent {
  value: string
  label: string
  icon: string
  tone: HobbyTone
  tagline: string
  continueSeed: ContinueSeed
  sections: HobbySection[]
}

const contentByValue: Record<string, Omit<HobbyContent, 'value' | 'label' | 'icon' | 'tone'>> = {
  reading: {
    tagline: 'Your reading space',
    continueSeed: { title: 'The Night Circus', meta: 'Chapter 4 of 12', progress: 32 },
    sections: [
      {
        title: 'Recommended books',
        items: [
          { id: 'atomic-habits', title: 'Atomic Habits', subtitle: '62% • Self-improvement' },
          { id: 'light-in-attic', title: 'A Light in the Attic', subtitle: 'Poetry • Feel-good' },
          { id: 'midnight-library', title: 'The Midnight Library', subtitle: 'Fiction • Thoughtful' },
        ],
      },
      {
        title: 'Reading goal',
        items: [{ id: 'goal', title: '20 min / day', subtitle: 'You are on a 5-day streak 🔥' }],
      },
      {
        title: 'Saved books',
        items: [
          { id: 'saved-circus', title: 'The Night Circus', subtitle: 'Saved for later' },
          { id: 'saved-klara', title: 'Klara and the Sun', subtitle: 'Saved for later' },
        ],
      },
    ],
  },
  yoga: {
    tagline: 'Move with intention',
    continueSeed: { title: 'Morning Stretch Flow', meta: '15 min session', progress: 60 },
    sections: [
      {
        title: "Today's practice",
        items: [{ id: 'morning-flow', title: 'Morning Stretch Flow', subtitle: '15 min • Beginner friendly' }],
      },
      {
        title: 'Beginner routines',
        items: [
          { id: 'sun-salutation', title: 'Sun Salutation Basics', subtitle: '10 min • All levels' },
          { id: 'bedtime-yoga', title: 'Bedtime Wind-down', subtitle: '12 min • Relaxing' },
        ],
      },
      {
        title: 'Progress',
        items: [{ id: 'streak', title: '3 practices this week', subtitle: 'Keep it gentle 🌿' }],
      },
    ],
  },
  crochet: {
    tagline: 'Loop by loop',
    continueSeed: { title: 'Granny Square', meta: 'Step 4 of 8', progress: 50 },
    sections: [
      {
        title: "Today's project",
        items: [{ id: 'granny-square', title: 'Granny Square', subtitle: 'Beginner • 30 min' }],
      },
      {
        title: 'Patterns',
        items: [
          { id: 'dishcloth', title: 'Simple Dishcloth', subtitle: 'Beginner • 45 min' },
          { id: 'headband', title: 'Cozy Headband', subtitle: 'Easy • 20 min' },
        ],
      },
      {
        title: 'How-to resources',
        items: [{ id: 'howto-chain', title: 'How to chain stitch', subtitle: 'Video tutorial • 5 min' }],
      },
    ],
  },
  crafting: {
    tagline: 'Make something yours',
    continueSeed: { title: 'Paper Star Garland', meta: 'Step 2 of 5', progress: 40 },
    sections: [
      {
        title: "Today's project",
        items: [{ id: 'star-garland', title: 'Paper Star Garland', subtitle: 'Easy • 25 min' }],
      },
      {
        title: 'Ideas',
        items: [
          { id: 'card-making', title: 'Handmade cards', subtitle: 'Beginner • 15 min' },
          { id: 'friendship-bracelet', title: 'Friendship bracelets', subtitle: 'Beginner • 30 min' },
        ],
      },
    ],
  },
  music: {
    tagline: 'Your sound space',
    continueSeed: { title: 'Focus & Create playlist', meta: '45 min', progress: 25 },
    sections: [
      {
        title: 'For your mood',
        items: [
          { id: 'focus-playlist', title: 'Focus & Create playlist', subtitle: '45 min • Chill' },
          { id: 'morning-acoustic', title: 'Morning Acoustic', subtitle: '30 min • Bright' },
        ],
      },
    ],
  },
  art: {
    tagline: 'Create a little every day',
    continueSeed: { title: 'Watercolor Basics', meta: 'Exercise 3 of 10', progress: 40 },
    sections: [
      {
        title: 'Try today',
        items: [{ id: 'still-life', title: 'Sketch a 5-minute still life', subtitle: 'Exercise • Beginner' }],
      },
      {
        title: 'Exercises',
        items: [
          { id: 'color-study', title: 'Color study', subtitle: '20 min • Beginner' },
          { id: 'line-warmup', title: 'Line warm-up', subtitle: '10 min • All levels' },
        ],
      },
    ],
  },
  gardening: {
    tagline: 'Grow something',
    continueSeed: { title: 'Herb pot check-in', meta: 'Week 2', progress: 50 },
    sections: [
      {
        title: "This week's care",
        items: [{ id: 'water-herbs', title: 'Water your herb pots', subtitle: '2 min • Sunny spot' }],
      },
      {
        title: 'Ideas',
        items: [{ id: 'grow-basil', title: 'Grow basil from seed', subtitle: 'Easy • 7 days' }],
      },
    ],
  },
  cooking: {
    tagline: 'Cook something simple',
    continueSeed: { title: 'One-pan pasta', meta: 'Recipe • 20 min', progress: 10 },
    sections: [
      {
        title: 'Tonight for you',
        items: [{ id: 'one-pan-pasta', title: 'One-pan pasta', subtitle: 'Recipe • 20 min' }],
      },
      {
        title: 'Quick ideas',
        items: [
          { id: 'veggie-stir-fry', title: 'Veggie stir fry', subtitle: '15 min • Easy' },
          { id: 'pancake-stack', title: 'Fluffy pancakes', subtitle: '25 min • Weekend' },
        ],
      },
    ],
  },
}

export function getHobbyContent(hobby: string): HobbyContent {
  const value = hobby.toLowerCase()
  const entry = catalogByValue.get(value)
  const seed = contentByValue[value] ?? {
    tagline: `Your ${getHobbyLabel(hobby)} space`,
    continueSeed: { title: `${getHobbyLabel(hobby)} session`, meta: 'In progress', progress: 50 },
    sections: [
      {
        title: 'Getting started',
        items: [{ id: 'intro', title: `Intro to ${getHobbyLabel(hobby)}`, subtitle: 'Start here' }],
      },
    ],
  }
  return {
    value,
    label: entry?.label ?? getHobbyLabel(hobby),
    icon: entry?.icon ?? '✨',
    tone: entry?.tone ?? 'peach',
    ...seed,
  }
}

export interface ContinueItem {
  hobby: string
  label: string
  icon: string
  tone: HobbyTone
  title: string
  meta: string
  progress: number
}

// `savedProgress` comes from hobbyStorage — pass it in so this stays pure.
export function getContinueItems(
  hobbies: string[],
  savedProgress: Record<string, number> = {},
): ContinueItem[] {
  return hobbies.map((hobby, i) => {
    const content = getHobbyContent(hobby)
    const meta = getHobbyMeta(hobby, i)
    return {
      hobby,
      label: content.label,
      icon: meta.icon,
      tone: meta.tone,
      title: content.continueSeed.title,
      meta: content.continueSeed.meta,
      progress: savedProgress[hobby.toLowerCase()] ?? content.continueSeed.progress,
    }
  })
}

export interface ForYouItem {
  hobby: string
  label: string
  icon: string
  tone: HobbyTone
  title: string
  meta: string
  reason: string
}

const interestMatchReasons: Record<string, string> = {
  books: 'because you like books',
  music: 'because you like music',
  art: 'because you like art',
  crafts: 'because you enjoy crafts',
  travel: 'because you like to travel',
  food: 'because you enjoy food & cooking',
  nature: 'because you enjoy nature',
  fitness: 'because you care about fitness',
  health: 'because you care about your health',
  technology: 'because you are into technology',
  gaming: 'because you like gaming',
  photography: 'because you enjoy photography',
  writing: 'because you like to write',
  fashion: 'because you follow fashion',
  sports: 'because you like sports',
  science: 'because you like science',
  movies: 'inspired by what you watch',
}

// Deterministic, local recommendation logic for now.
// Later this is where Grace's AI layer can take over.
export function getForYouItems(
  hobbies: string[],
  interests: string[],
  likes: string[],
): ForYouItem[] {
  const signals = new Set([...interests, ...likes].map((s) => s.toLowerCase()))

  const scored = hobbyCatalog.map((entry) => {
    const matched = entry.tags.filter((tag) => signals.has(tag))
    const ownedBoost = hobbies.map((h) => h.toLowerCase()).includes(entry.value) ? 1 : 0
    return { entry, matched, score: matched.length * 2 + ownedBoost }
  })

  const picks = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)

  const list = picks.length > 0 ? picks : scored.slice(0, 2).map((s) => ({ ...s, score: 0 }))

  return list.map(({ entry, matched }) => {
    const content = getHobbyContent(entry.value)
    const first = content.sections[0]?.items[0]
    const reason =
      matched.length > 0
        ? interestMatchReasons[matched[0]] ?? `because you like ${matched[0]}`
        : 'a new pick from Grace'
    return {
      hobby: entry.value,
      label: entry.label,
      icon: entry.icon,
      tone: entry.tone,
      title: first?.title ?? content.continueSeed.title,
      meta: first?.subtitle ?? content.continueSeed.meta,
      reason,
    }
  })
}

export const exploreCategories = ['Reading', 'Yoga', 'Crochet', 'Art', 'Music']
