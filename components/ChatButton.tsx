'use client';
import { useState, useEffect } from 'react';
import ChatPanel from './ChatPanel';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener('timemeaning:open-chat', handler);
    return () => document.removeEventListener('timemeaning:open-chat', handler);
  }, []);

  return (
    <>
      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close assistant' : 'Open TimeMeaning assistant'}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isOpen
            ? '#2a2520'
            : 'linear-gradient(to bottom, #d4a040, #a87520)',
          border: `1px solid ${isOpen ? '#3a3530' : '#9a6a10'}`,
          boxShadow: isOpen
            ? '0 2px 8px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(168,117,32,0.5), 0 2px 4px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9997,
          transition: 'all 200ms ease',
          color: isOpen ? '#6a6460' : '#ffffff',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? '×' : '?'}
      </button>
    </>
  );
}
