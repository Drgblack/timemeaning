'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'leaderboard';
  style?: React.CSSProperties;
}

export default function AdSlot({ slot, format = 'auto', style }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!publisherId || publisherId === 'ca-pub-your-id-here') return;
    try {
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
    } catch {
      // AdSense not loaded
    }
  }, [publisherId]);

  // Show placeholder if publisher ID not set
  if (!publisherId || publisherId === 'ca-pub-your-id-here') {
    return (
      <div style={{
        background: '#f5f0e8',
        border: '1px dashed #c8c0b0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8a8278',
        fontFamily: 'monospace',
        fontSize: '11px',
        letterSpacing: '0.08em',
        margin: '32px 0',
        minHeight: '90px',
        ...style,
      }}>
        AD SLOT — {slot}
      </div>
    );
  }

  return (
    <div style={{ margin: '32px 0', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
