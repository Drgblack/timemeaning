export default function Loading() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: 'monospace',
        color: '#c8922a',
        fontSize: '13px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        Loading...
      </div>
    </div>
  );
}
