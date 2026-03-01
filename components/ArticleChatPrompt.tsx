'use client';

export default function ArticleChatPrompt() {
  return (
    <div style={{
      marginTop: '40px',
      padding: '16px 20px',
      background: '#f5f0e8',
      borderRadius: '8px',
      borderLeft: '3px solid #c8922a',
      fontSize: '14px',
      color: '#3a3530',
    }}>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#c8922a',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        display: 'block',
        marginBottom: '6px',
      }}>
        HAVE A QUESTION ABOUT THIS ARTICLE?
      </span>
      Ask the TimeMeaning assistant — it knows the content of this article and can answer specific questions.{` `}
      <button
        onClick={() => document.dispatchEvent(new CustomEvent('timemeaning:open-chat'))}
        style={{
          background: 'none',
          border: 'none',
          color: '#c8922a',
          cursor: 'pointer',
          padding: 0,
          fontSize: '14px',
          textDecoration: 'underline',
        }}
      >
        Ask a question →
      </button>
    </div>
  );
}
