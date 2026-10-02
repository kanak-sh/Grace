import girlAvatar from '../assets/Girl_anime (3).png'
import boyAvatar from '../assets/Boy_anime.png'
import companionGirl from '../assets/Companion_girl.png'
import companionBoy from '../assets/Companion_boy.png'

/**
 * Pick the user/companion imagery based on the character preference
 * stored in the profile during onboarding. Anything other than
 * 'male' falls back to the female imagery.
 */
export function getUserAvatar(characterPreference?: string): string {
  return characterPreference === 'male' ? boyAvatar : girlAvatar
}

export function getCompanionImage(characterPreference?: string): string {
  return characterPreference === 'male' ? companionBoy : companionGirl
}
