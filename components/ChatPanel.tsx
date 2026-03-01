'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { CHAT_CONFIG } from '@/lib/chatConfig';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: 'claude' | 'fallback' | 'static';
  timestamp: number;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SESSION_LIMIT = CHAT_CONFIG.maxMessagesPerSession;

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Ask me about timezones, DST transitions, ambiguous abbreviations, ISO 8601, or Unix timestamps. I\'ll give you a precise answer with reasoning shown.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*',
  model: 'claude',
  timestamp: Date.now(),
};

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || sessionCount >= SESSION_LIMIT) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setSessionCount(prev => prev + 1);

    const conversationMessages = [...messages, userMessage]
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationMessages,
          pageContext: pathname,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (errData.code === 'SESSION_LIMIT') {
          setError('Session limit reached. Refresh the page to start a new session.');
        } else {
          setError(errData.error || 'Something went wrong. Try again.');
        }
        return;
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        model: data.model,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Connection error. Check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sessionCount, messages, pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const modelLabel = (model?: string) => {
    if (!model || model === 'claude') return null;
    if (model === 'fallback') return (
      <span style={{ fontSize: '10px', color: '#6a6460', fontFamily: 'monospace', marginLeft: '6px' }}>
        via GPT-4o mini
      </span>
    );
    if (model === 'static') return (
      <span style={{ fontSize: '10px', color: '#6a6460', fontFamily: 'monospace', marginLeft: '6px' }}>
        offline response
      </span>
    );
    return null;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 9998,
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="TimeMeaning assistant"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: '560px',
          background: '#1a1a18',
          border: '1px solid #3a3530',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #3a3530',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0ece6', fontFamily: 'var(--font-sans)' }}>
              TimeMeaning Assistant
            </div>
            <div style={{ fontSize: '11px', color: '#6a6460', fontFamily: 'monospace', marginTop: '2px' }}>
              {sessionCount}/{SESSION_LIMIT} questions this session
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            style={{
              background: 'none',
              border: 'none',
              color: '#6a6460',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {messages.map((message, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: message.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: message.role === 'user' ? '#2a2218' : '#252320',
                border: `1px solid ${message.role === 'user' ? '#4a3a20' : '#3a3530'}`,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#e8e4de',
                fontFamily: 'var(--font-sans)',
                whiteSpace: message.role === 'user' ? 'pre-wrap' : 'normal',
              }}>
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      p: ({ node: _node, ...props }) => <p style={{ margin: 0 }} {...props} />,
                      ul: ({ node: _node, ...props }) => <ul style={{ margin: '0.5em 0', paddingLeft: '1.2em' }} {...props} />,
                      ol: ({ node: _node, ...props }) => <ol style={{ margin: '0.5em 0', paddingLeft: '1.2em' }} {...props} />,
                      li: ({ node: _node, ...props }) => <li style={{ margin: '0.2em 0' }} {...props} />,
                      code: ({ node: _node, ...props }) => (
                        <code
                          style={{
                            background: '#1a1a18',
                            border: '1px solid #3a3530',
                            borderRadius: '4px',
                            padding: '0.1em 0.3em',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                          }}
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              {message.role === 'assistant' && modelLabel(message.model)}
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6a6460',
              fontSize: '13px',
            }}>
              <div style={{
                fontFamily: 'monospace',
                color: '#c8922a',
                animation: 'pulse 1.5s infinite',
              }}>
                ▊
              </div>
              Resolving...
            </div>
          )}

          {error && (
            <div style={{
              padding: '10px 14px',
              background: '#2a1a1a',
              border: '1px solid #5a3030',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#c87060',
            }}>
              {error}
            </div>
          )}

          {sessionCount >= SESSION_LIMIT && (
            <div style={{
              padding: '10px 14px',
              background: '#1a1a2a',
              border: '1px solid #3a3550',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#8a8ab0',
            }}>
              Session limit reached. Refresh the page to start a new session.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #3a3530',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about timezones, DST, or time formats..."
              disabled={isLoading || sessionCount >= SESSION_LIMIT}
              rows={1}
              style={{
                flex: 1,
                background: '#252320',
                border: '1px solid #3a3530',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#f0ece6',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5',
                maxHeight: '120px',
                overflowY: 'auto',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || sessionCount >= SESSION_LIMIT}
              aria-label="Send message"
              style={{
                background: input.trim() && !isLoading
                  ? 'linear-gradient(to bottom, #d4a040, #a87520)'
                  : '#2a2520',
                border: '1px solid #3a3530',
                borderRadius: '8px',
                padding: '10px 14px',
                color: input.trim() && !isLoading ? '#ffffff' : '#5a5550',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                flexShrink: 0,
                transition: 'all 150ms',
              }}
            >
              →
            </button>
          </div>

          {messages.length <= 1 && (
            <div style={{
              marginTop: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {['Why is IST ambiguous?', 'What is the March gap?', 'How does Zulu time work?', 'What is Y2K38?'].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  style={{
                    background: '#252320',
                    border: '1px solid #3a3530',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    color: '#c8922a',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amber bottom border */}
        <div style={{ height: '3px', background: '#c8922a', flexShrink: 0 }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
