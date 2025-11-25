import { useState, useEffect } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CountdownTimerProps {
  targetDate: string
  isFinished: boolean
}

export function CountdownTimer({ targetDate, isFinished }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate)
    const now = new Date()

    if (isFinished) {
      return { finished: true, timeSince: formatDistanceToNow(target, { addSuffix: true, locale: ptBR }) }
    }

    const days = differenceInDays(target, now)
    const hours = differenceInHours(target, now) % 24
    const minutes = differenceInMinutes(target, now) % 60

    if (days < 0 || hours < 0 || minutes < 0) {
      return { finished: true, timeSince: formatDistanceToNow(target, { addSuffix: true, locale: ptBR }) }
    }

    return {
      days,
      hours,
      minutes,
      finished: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, isFinished])

  if (timeLeft.finished) {
    return (
      <div className="text-sm text-red-600">
        <span>Encerrado {timeLeft.timeSince}</span>
      </div>
    )
  }

  return (
    <div className="text-sm text-gray-600">
      <span>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}</span>
    </div>
  )
}
