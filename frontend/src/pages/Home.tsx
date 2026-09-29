import { useState } from 'react'
import { Link } from 'react-router'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/grace/SectionHeader'
import AIInsightCard from '../components/grace/AIInsightCard'
import StatCard from '../components/grace/StatCard'
import FeatureCard from '../components/grace/FeatureCard'
import MoodChip from '../components/grace/MoodChip'
import EmptyState from '../components/grace/EmptyState'
import './Home.css'

const moods = [
  { label: 'Happy', icon: '☀', color: 'gold' as const },
  { label: 'Calm', icon: '☁', color: 'lavender' as const },
  { label: 'Energetic', icon: '⚡', color: 'accent' as const },
  { label: 'Focused', icon: '◎', color: 'lavender' as const },
  { label: 'Grateful', icon: '♡', color: 'primary' as const },
  { label: 'Tired', icon: '☾', color: 'lavender' as const },
]

const features = [
  {
    icon: '♡',
    title: 'Health',
    description: 'Track your daily activity, sleep, and wellness habits.',
    color: 'primary' as const,
    path: '/health',
  },
  {
    icon: '✿',
    title: 'Hobbies',
    description: 'Discover and explore new passions tailored to you.',
    color: 'lavender' as const,
    path: '/hobbies',
  },
  {
    icon: '▤',
    title: 'Notes',
    description: 'Capture thoughts, ideas, and moments that matter.',
    color: 'lavender' as const,
    path: '/notes',
  },
  {
    icon: '✦',
    title: 'Create',
    description: 'Your creative space for projects and inspiration.',
    color: 'accent' as const,
    path: '/create',
  },
  {
    icon: '♪',
    title: 'Music',
    description: 'Curated playlists that match your mood and moments.',
    color: 'gold' as const,
    path: '/music',
  },
  {
    icon: '✦',
    title: 'Grace AI',
    description: 'Your personal companion, always here to listen.',
    color: 'primary' as const,
    path: '/companion',
  },
]

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="home-page">
      {/* Greeting */}
      <div className="home-greeting">
        <Avatar name="Grace User" size="lg" status="online" />
        <div className="home-greeting-text">
          <p className="home-greeting-time">{getGreeting()}</p>
          <h1 className="home-greeting-name">Ready for today?</h1>
        </div>
      </div>

      {/* AI Insight */}
      <AIInsightCard
        icon="✦"
        title="Your daily insight"
        mood="positive"
        action={
          <Button variant="ghost" size="sm">
            View all insights
          </Button>
        }
      >
        You've been consistently active this week — your sleep score improved
        by 12%. Keep up the momentum with a short walk today.
      </AIInsightCard>

      {/* Stats */}
      <section className="home-section">
        <SectionHeader
          title="Today at a glance"
          action={
            <Badge variant="lavender" dot>
              On track
            </Badge>
          }
        />
        <div className="home-stats">
          <StatCard
            icon="♡"
            label="Heart rate"
            value="72 bpm"
            trend="Resting"
            trendDirection="neutral"
            color="primary"
          />
          <StatCard
            icon="👟"
            label="Steps"
            value="6,842"
            trend="+12% from yesterday"
            trendDirection="up"
            color="lavender"
          />
          <StatCard
            icon="☾"
            label="Sleep"
            value="7h 24m"
            trend="Good quality"
            trendDirection="up"
            color="gold"
          />
          <StatCard
            icon="💧"
            label="Water"
            value="5 / 8"
            trend="2 glasses to go"
            trendDirection="neutral"
            color="accent"
          />
        </div>
      </section>

      {/* Mood check-in */}
      <section className="home-section">
        <SectionHeader
          title="How are you feeling?"
          subtitle="This helps Grace personalize your experience"
        />
        <div className="home-moods">
          {moods.map((mood) => (
            <MoodChip
              key={mood.label}
              label={mood.label}
              icon={mood.icon}
              color={mood.color}
              selected={selectedMood === mood.label}
              onClick={() =>
                setSelectedMood(selectedMood === mood.label ? null : mood.label)
              }
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="home-section">
        <SectionHeader
          title="Explore Grace"
          subtitle="Everything you need, in one personal space"
        />
        <div className="home-features">
          {features.map((feature) => (
            <Link to={feature.path} key={feature.path} className="home-feature-link">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Empty state demo */}
      <section className="home-section">
        <SectionHeader title="Recent notes" />
        <EmptyState
          icon="▤"
          title="No notes yet"
          description="Start capturing your thoughts and ideas — they'll appear here."
          action={
            <Button variant="primary" size="sm">
              Create your first note
            </Button>
          }
        />
      </section>
    </div>
  )
}
