// src/components/Tour.tsx
import { useEffect, useState } from 'react'
import Joyride, { STATUS } from 'react-joyride'

const tourSteps = [
  {
    target: '#tour-card',
    content:
      'Clique em "Ver detalhes" para explorar mais sobre o veículo e acessar a avaliação inteligente.',
    disableBeacon: true,
  },
  {
    target: '#tour-analise-ia',
    content:
      'Este é o botão de "Avaliação inteligente". Ao clicar aqui, nossa IA vai analisar o veículo para você!',
    disableBeacon: true,
  },
  {
    target: '#tour-modal-analise',
    content:
      'Aqui você verá a análise completa da nossa IA, com informações sobre o estado do veículo e se vale a pena a compra.',
    disableBeacon: true,
  },
]

export function AppTour() {
  const [runTour, setRunTour] = useState(false)

  useEffect(() => {
    // Inicia o tour automaticamente quando o componente é montado.
    // Você pode adicionar uma condição, como verificar se o usuário já viu o tour.
    // const hasSeenTour = localStorage.getItem('hasSeenTour')
    // if (!hasSeenTour) {
    setRunTour(true)
    // }
  }, [])

  const handleJoyrideCallback = (data: any) => {
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRunTour(false)
      localStorage.setItem('hasSeenTour', 'true') // Marca que o tour já foi visto
    }
  }

  return (
    <Joyride
      steps={tourSteps}
      run={true}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      locale={{
        next: 'Próximo',
        back: 'Voltar',
        last: 'Finalizar',
        skip: 'Pular',
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  )
}
