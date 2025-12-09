'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom heading styles
        h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
        h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
        
        // Custom paragraph
        p: ({ children }) => <p className="md-p">{children}</p>,
        
        // Custom lists
        ul: ({ children }) => <ul className="md-ul">{children}</ul>,
        ol: ({ children }) => <ol className="md-ol">{children}</ol>,
        li: ({ children }) => <li className="md-li">{children}</li>,
        
        // Custom blockquote
        blockquote: ({ children }) => (
          <blockquote className="md-blockquote">{children}</blockquote>
        ),
        
        // Custom table
        table: ({ children }) => (
          <div className="md-table-wrapper">
            <table className="md-table">{children}</table>
          </div>
        ),
        
        // Custom code
        code: ({ className, children }) => {
          const isInline = !className
          if (isInline) {
            return <code className="md-code-inline">{children}</code>
          }
          return <code className={`md-code-block ${className || ''}`}>{children}</code>
        },
        
        // Custom pre (code blocks)
        pre: ({ children }) => <pre className="md-pre">{children}</pre>,
        
        // Custom links
        a: ({ href, children }) => (
          <a href={href} className="md-link" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        ),
        
        // Custom strong/bold
        strong: ({ children }) => <strong className="md-strong">{children}</strong>,
        
        // Custom em/italic
        em: ({ children }) => <em className="md-em">{children}</em>,
        
        // Custom hr
        hr: () => <hr className="md-hr" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

