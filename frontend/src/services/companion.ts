export interface CompanionContext {
  name?: string
  mood?: string | null
  interests?: string[]
  hobbies?: string[]
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getGraceReply(message: string, context: CompanionContext): string {
  const text = message.toLowerCase()
  const name = context.name && context.name !== 'there' ? context.name : null
  const first = name ? `, ${name}` : ''

  if (text.includes('tired') || text.includes('exhausted') || text.includes('sleep')) {
    return `Sorry you're feeling drained${first}. ${context.mood === 'Tired' ? "I noticed you checked in as Tired today — that's okay, rest is productive too. " : ''}A short break, some water, or an early night might help. Want a calming activity?`
  }

  if (text.includes('happy') || text.includes('great') || text.includes('good') || text.includes('excited')) {
    return `That's wonderful to hear${first}! 😊 ${context.hobbies?.length ? `Want to channel that energy into ${context.hobbies[0].toLowerCase()}?` : 'Keep that momentum going!'}`
  }

  if (text.includes('sad') || text.includes('down') || text.includes('anxious') || text.includes('stressed')) {
    return `I'm sorry you're feeling that way${first}. I'm here with you. ${context.interests?.length ? `Sometimes something small like ${context.interests[0].toLowerCase()} helps.` : ''} Would you like to talk it through?`
  }

  if (text.includes('hobby') || text.includes('hobbies') || text.includes('interest')) {
    if (context.hobbies?.length || context.interests?.length) {
      const all = [...(context.interests ?? []), ...(context.hobbies ?? [])]
      return `Based on what you've told me, you're into ${all.slice(0, 3).join(', ')}. Which one would you like to explore today?`
    }
    return "Tell me a bit about what you enjoy — music, crafts, sports, anything — and I'll help you make the most of it."
  }

  if (text.includes('health') || text.includes('step') || text.includes('water') || text.includes('heart')) {
    return "I can help you keep track of your health. Check your Health page for today's steps, sleep, water, and heart rate — small daily check-ins add up."
  }

  if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
    return `Hey${first}! 👋 ${context.mood ? `I see you're feeling ${context.mood.toLowerCase()} today. ` : ''}How can I support you?`
  }

  if (text.includes('thank')) {
    return `Anytime${first}. That's what I'm here for 💚`
  }

  return pick([
    `That's interesting${first}. Tell me more — the more I know, the better I can support you.`,
    context.mood
      ? `Got it. Since you're feeling ${context.mood.toLowerCase()} today, I'll keep my suggestions gentle. What else is on your mind?`
      : "Tell me more about that. I'd love to understand what matters to you.",
    context.hobbies?.length
      ? `Noted! By the way, how is ${context.hobbies[0].toLowerCase()} going lately?`
      : 'Noted. What would you like to chat about next?',
  ])
}

export interface ChatMessage {
  id: number
  from: 'user' | 'grace'
  text: string
}
