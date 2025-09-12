import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import React from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const features = [
  {
    icon: '🔮',
    title: 'Análises com Inteligência Artificial',
    description:
      'Receba avaliações automáticas de veículos, com base em dados reais do mercado, histórico e estado do carro.',
  },
  {
    icon: '⏰',
    title: 'Criação de Alertas',
    description:
      'Cadastre seus critérios (modelo, ano, preço, local) e receba alertas sempre que um carro com o seu perfil entrar em leilão.',
  },
  {
    icon: '👨‍💼',
    title: 'Consultoria Especializada',
    description:
      'Conte com o apoio de especialistas para entender os riscos, custos extras e estratégias para dar o lance certo.',
  },
  {
    icon: '🎯',
    title: 'Filtros Personalizados',
    description:
      'Encontre veículos que realmente fazem sentido para você, sem perder tempo em catálogos confusos.',
  },
  {
    icon: '🚗',
    title: 'Veículos do Detran',
    description:
      'Aproveite a vantagem de arrematar veículos do Detran — com processos mais simples, transparentes e fáceis de regularizar.',
  },
]

const benefits = [
  'Economiza horas pesquisando editais e catálogos',
  'Evita comprar carros-problema que viram prejuízo',
  'Aumenta suas chances de lucro com dados confiáveis',
  'Tem confiança para dar o lance certo na hora certa',
]

const testimonials = [
  {
    quote:
      'Com os alertas, consegui arrematar um carro em menos de 2 semanas. Antes eu nem sabia por onde começar.',
    author: 'Marcos, SP',
  },
  {
    quote:
      'A análise com IA me poupou tempo e evitou um prejuízo. O carro parecia barato, mas descobri que não valia a pena. Valeu cada centavo!',
    author: 'Patrícia, RJ',
  },
  {
    quote:
      'A consultoria foi essencial. Com a ajuda dos especialistas, dei meu primeiro lance com confiança e economizei mais de 30%.',
    author: 'Rafael, MG',
  },
]

export function LandingPage() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const vehicleList = document.getElementById('vehicle-list')
    if (vehicleList) {
      vehicleList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="-mx-4 -mt-6 mb-12 bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-blue-50/50 to-white dark:from-purple-900/10 dark:via-blue-900/5 dark:to-gray-950 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
              Gênio Leilões: tecnologia e inteligência para você arrematar no{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                preço certo
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8">
              Análises com IA, alertas personalizados e consultoria
              especializada para transformar leilões em oportunidades reais.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-white shadow-lg text-lg px-8 py-6"
                onClick={handleScroll}
              >
                <span className="mr-2">👉</span> Quero experimentar agora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Why use */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Arrematar em leilões pode ser fácil... mas também arriscado.
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              O Gênio Leilões foi criado para reduzir riscos, economizar tempo e
              aumentar suas chances de sucesso com ferramentas exclusivas:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Features */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Benefits */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
              Com o Gênio Leilões você:
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.1 }}
                className="flex items-start"
              >
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-lg text-gray-700 dark:text-gray-200">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Quem já usou o Gênio Leilões aprovou
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.15 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col"
              >
                <div className="text-yellow-400 mb-4 text-xl">
                  {'⭐️'.repeat(5)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">
                  “{testimonial.quote}”
                </p>
                <p className="font-semibold text-gray-800 dark:text-white text-right">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
