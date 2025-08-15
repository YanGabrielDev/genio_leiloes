import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Car,
  ShieldAlert,
  Coins,
  Scale,
  TrendingUp,
  MessageCircle,
} from 'lucide-react'

interface MarkdownRendererProps {
  content: string
}

const iconMap: Record<string, React.ReactNode> = {
  '🚗 Estado Geral': <Car className="h-6 w-6 text-indigo-500" />,
  '⚠️ Problemas Crônicos': <ShieldAlert className="h-6 w-6 text-red-500" />,
  '💰 Custos de Manutenção': <Coins className="h-6 w-6 text-yellow-500" />,
  '📊 Comparação com FIPE': <Scale className="h-6 w-6 text-green-500" />,
  '🔮 Potencial de Revenda': <TrendingUp className="h-6 w-6 text-blue-500" />,
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // className="prose prose-sm max-w-none dark:prose-invert"
      components={{
        h3: ({ node, children, ...props }) => {
          const headingText = String(children).trim()
          const icon = iconMap[headingText]

          return (
            <div className="flex items-center gap-2 mb-4 mt-6">
              {icon && icon}
              <h3 className="text-xl font-bold text-gray-800" {...props}>
                {children}
              </h3>
            </div>
          )
        },
        ul: ({ children }) => (
          <ul className="list-none pl-0 space-y-2">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-gray-700">
            <span className="mt-1 block h-1.5 w-1.5 min-w-[6px] rounded-full bg-indigo-400" />
            <span>{children}</span>
          </li>
        ),
        p: ({ children }) => {
          // Detectar o bloco de 'Comentário Final' e estilizar
          if (
            (children as React.ReactNode[]).some(
              (child) =>
                typeof child === 'string' &&
                child.startsWith('Comentário Final:')
            )
          ) {
            return (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mt-6">
                <div className="flex items-center gap-2 mb-2 text-blue-800">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-semibold">Comentário Final</span>
                </div>
                <p className="text-blue-800">{children}</p>
              </div>
            )
          }
          return <p className="text-gray-700">{children}</p>
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
