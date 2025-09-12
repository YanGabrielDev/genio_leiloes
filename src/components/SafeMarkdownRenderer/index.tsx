import React from 'react'
import { MarkdownRenderer } from '../MarkdownRenderer'
import ErrorBoundary from '../ErrorBoundary'

interface SafeMarkdownRendererProps {
  content: string
}

export function SafeMarkdownRenderer({ content }: SafeMarkdownRendererProps) {
  // A UI de fallback que será exibida em caso de erro.
  const fallbackUI = (
    <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
      <pre className="mt-2 p-2 bg-gray-200 rounded text-sm whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  )

  return (
    <ErrorBoundary fallback={fallbackUI}>
      <MarkdownRenderer content={content} />
    </ErrorBoundary>
  )
}
