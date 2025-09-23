import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Joyride, {
  CallBackProps,
  STATUS,
  Step,
  EVENTS,
  ACTIONS,
} from 'react-joyride'

interface AppTourProps {
  firstVehicleId?: number
}

export function AppTour({ firstVehicleId }: AppTourProps) {
  const [run, setRun] = useState(false)
  const navigate = useNavigate()
  const { userProfile } = useUserStore()

  useEffect(() => {
    if (!localStorage.getItem('hasSeenTour')) {
      const timer = setTimeout(() => setRun(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRun(false)
      localStorage.setItem('hasSeenTour', 'true')
      return
    }

    const isNext = type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT
    const isPrev = type === EVENTS.STEP_BEFORE && action === ACTIONS.PREV

    if (isNext) {
      // O índice do card do veículo muda se o usuário estiver logado
      const cardStepIndex = userProfile ? 1 : 0

      if (index === cardStepIndex && firstVehicleId) {
        navigate({
          to: '/details/$vehicleId',
          params: { vehicleId: firstVehicleId.toString() },
        })
      }
    }

    if (isPrev) {
      // O índice do primeiro passo na página de detalhes muda se o usuário estiver logado
      const detailsStepIndex = userProfile ? 2 : 1
      if (index + 1 === detailsStepIndex) {
        navigate({ to: '/' })
      }
    }
  }

  const tourSteps: Step[] = [
    {
      target: '#tour-card',
      content: 'Clique em "Ver detalhes" do veículo para ver mais informações.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-analise-ia',
      content:
        'Use suas moedas para fazer uma Análise com IA e descubra se o lance vale a pena.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-consultancy',
      content: 'Precisa de ajuda? Fale com um de nossos especialistas.',
      disableBeacon: true,
      placement: 'top',
    },
    {
      target: '#tour-go-to-auction',
      content: 'Acesse o site oficial do leilão para dar seu lance.',
      disableBeacon: true,
      placement: 'top',
    },
  ]

  if (userProfile) {
    tourSteps.unshift({
      target: '#tour-coins',
      content:
        'Aqui você pode ver suas moedas. Use-as para obter análises de IA sobre os veículos!',
      disableBeacon: true,
      placement: 'bottom',
    })
  }

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      floaterProps={{
        disableFlip: true,
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      locale={{
        next: 'Próximo',
        back: 'Voltar',
        skip: 'Pular',
        last: 'Finalizar',
      }}
    />
  )
}
