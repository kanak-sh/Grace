import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import { profileStorage, type ProfileData } from '../services/profileStorage'

export type { ProfileData }

export interface OnboardingData extends ProfileData {}

type OnboardingAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_AGE_RANGE'; payload: string }
  | { type: 'SET_CHARACTER_PREFERENCE'; payload: string }
  | { type: 'TOGGLE_INTEREST'; payload: string }
  | { type: 'TOGGLE_HOBBY'; payload: string }
  | { type: 'ADD_LIKE'; payload: string }
  | { type: 'REMOVE_LIKE'; payload: string }
  | { type: 'ADD_DISLIKE'; payload: string }
  | { type: 'REMOVE_DISLIKE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'auto' }
  | { type: 'SET_CHARACTER'; payload: string }
  | { type: 'COMPLETE' }
  | { type: 'RESET' }

const initialState: OnboardingData = {
  name: '',
  ageRange: '',
  characterPreference: '',
  interests: [],
  hobbies: [],
  likes: [],
  dislikes: [],
  theme: 'auto',
  character: '',
  onboardingCompleted: false,
}

function onboardingReducer(
  state: OnboardingData,
  action: OnboardingAction,
): OnboardingData {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_AGE_RANGE':
      return { ...state, ageRange: action.payload }
    case 'SET_CHARACTER_PREFERENCE':
      return { ...state, characterPreference: action.payload }
    case 'TOGGLE_INTEREST':
      return {
        ...state,
        interests: state.interests.includes(action.payload)
          ? state.interests.filter((i) => i !== action.payload)
          : [...state.interests, action.payload],
      }
    case 'TOGGLE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.includes(action.payload)
          ? state.hobbies.filter((h) => h !== action.payload)
          : [...state.hobbies, action.payload],
      }
    case 'ADD_LIKE':
      if (state.likes.includes(action.payload)) return state
      return { ...state, likes: [...state.likes, action.payload] }
    case 'REMOVE_LIKE':
      return { ...state, likes: state.likes.filter((l) => l !== action.payload) }
    case 'ADD_DISLIKE':
      if (state.dislikes.includes(action.payload)) return state
      return { ...state, dislikes: [...state.dislikes, action.payload] }
    case 'REMOVE_DISLIKE':
      return {
        ...state,
        dislikes: state.dislikes.filter((d) => d !== action.payload),
      }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_CHARACTER':
      return { ...state, character: action.payload }
    case 'COMPLETE':
      return { ...state, onboardingCompleted: true }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface OnboardingContextValue {
  data: OnboardingData
  dispatch: React.Dispatch<OnboardingAction>
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function loadInitialState(): OnboardingData {
  const stored = profileStorage.load()
  if (stored) return stored
  return initialState
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(onboardingReducer, undefined, loadInitialState)

  useEffect(() => {
    profileStorage.save(data)
  }, [data])

  return (
    <OnboardingContext.Provider value={{ data, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
