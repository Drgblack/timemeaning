"use client";
import { useState, useCallback } from "react";
import { TimeInput } from "@/components/time-input";
import { TimeResult, TimeInterpretation } from "@/components/time-result";
import { resolveTimeInput } from "@/lib/resolve-client";

export function ResolverClient() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<TimeInterpretation | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInput = useCallback((value: string) => {
    setInputValue(value);
    if (!value.trim()) {
      setResult(null);
      setIsResultVisible(false);
      setError(null);
    }
  }, []);

  const handleDecode = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsResultVisible(false);

    try {
      const interpretation = await resolveTimeInput(inputValue);
      setResult(interpretation);
      setIsResultVisible(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  return (
    <>
      <TimeInput
        onInput={handleInput}
        onDecode={handleDecode}
        isLoading={isLoading}
      />

      {/* Loading state */}
      {isLoading && (
        <div
          style={{
            marginTop: '24px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#c8922a',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ animation: 'pulse 1.5s infinite' }}>|</span>
          Interpreting...
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div
          style={{
            marginTop: '24px',
            padding: '12px 16px',
            background: 'rgba(200, 80, 60, 0.1)',
            border: '1px solid rgba(200, 80, 60, 0.3)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#c85040',
            fontFamily: 'monospace',
          }}
        >
          {error}
        </div>
      )}

      {/* Result */}
      {result && !isLoading && (
        <div className="mt-8">
          <TimeResult result={result} isVisible={isResultVisible} />
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
