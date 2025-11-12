import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  restTime: string
}

export function CountdownTimer({ restTime }: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null)

  useEffect(() => {
    if (!restTime) return

    const endTime = new Date(restTime).getTime()

    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const difference = endTime - now

      if (difference > 0) {
        setRemainingTime(difference)
      } else {
        setRemainingTime(0)
        clearInterval(intervalId)
      }
    }, 1000)

    // Set initial time
    const now = new Date().getTime()
    const difference = endTime - now
    setRemainingTime(difference > 0 ? difference : 0)

    return () => clearInterval(intervalId)
  }, [restTime])

  const formatCountdown = (milliseconds: number | null) => {
    if (milliseconds === null || milliseconds <= 0) {
      return '00:00:00'
    }

    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <p
      className={`text-lg font-semibold ${
        remainingTime !== null && remainingTime < 60000 ? 'text-red-500' : ''
      }`}
    >
      {formatCountdown(remainingTime)}
    </p>
  )
}
