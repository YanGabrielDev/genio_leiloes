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
  'Estado Geral': <Car className="h-6 w-6 text-indigo-500" />,
  'Problemas Crônicos': <ShieldAlert className="h-6 w-6 text-red-500" />,
  'Custos de Manutenção': <Coins className="h-6 w-6 text-yellow-500" />,
  'Comparação com FIPE': <Scale className="h-6 w-6 text-green-500" />,
  'Potencial de Revenda': <TrendingUp className="h-6 w-6 text-blue-500" />,
}

// Função segura para extrair texto de nodes
const extractText = (children: any): string => {
  if (!children) return ''
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children
      .map((c) =>
        typeof c === 'string'
          ? c
          : c?.props?.children
            ? extractText(c.props.children)
            : ''
      )
      .join('')
  }
  if (children?.props?.children) {
    return extractText(children.props.children)
  }
  return ''
}

// Sanitização simples só para segurança
const sanitizeMarkdown = (markdownString: string) => {
  if (!markdownString) return ''
  let sanitizedContent = markdownString.trim()
  if (sanitizedContent.endsWith('**'))
    sanitizedContent = sanitizedContent.slice(0, -2).trim()
  if (sanitizedContent.endsWith('*'))
    sanitizedContent = sanitizedContent.slice(0, -1).trim()
  if (sanitizedContent.endsWith('_'))
    sanitizedContent = sanitizedContent.slice(0, -1).trim()
  return sanitizedContent
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const sanitizedContent = sanitizeMarkdown(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h3: ({ node, children, ...props }) => {
          const headingText = extractText(children).trim()
          const icon = iconMap[headingText]

          return (
            <div className="flex items-center gap-2 mb-4 mt-6">
              {icon}
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
          const raw = extractText(children)

          if (raw.startsWith('Comentário Final:')) {
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
      {sanitizedContent}
    </ReactMarkdown>
  )
}
