'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        fontFamily: 'monospace',
        fontSize: '48px',
        color: '#c8922a',
        marginBottom: '16px',
      }}>ERROR</div>
      <p style={{ fontSize: '18px', marginBottom: '24px', color: '#3a3530' }}>
        Something went wrong loading this page.
      </p>
      <button onClick={reset} style={{
        background: 'linear-gradient(to bottom, #d4a040, #a87520)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
      }}>
        Try again
      </button>
    </div>
  );
}
