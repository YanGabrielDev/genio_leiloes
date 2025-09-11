import React, { useState, useEffect } from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer'

interface SafeMarkdownRendererProps {
  content: string
}

export function SafeMarkdownRenderer({ content }: SafeMarkdownRendererProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [content])

  try {
    if (hasError) {
      return <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    }
    return <MarkdownRenderer content={content} />
  } catch (error) {
    console.error('Erro na renderização do Markdown:', error)
    setHasError(true)
    return <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
  }
}
