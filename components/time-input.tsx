"use client";

import { useState, useEffect, useCallback } from "react";

interface TimeInputProps {
  onInput: (value: string) => void;
  onDecode: () => void;
}

export function TimeInput({ onInput, onDecode }: TimeInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onInput(newValue);
    },
    [onInput]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim()) {
        onDecode();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value, onDecode]);

  return (
    <div className="w-full max-w-[560px] mx-auto">
      {/* Dark styled textarea for hero section */}
      <textarea
        data-resolver-input
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Paste any time reference..."
        className="w-full min-h-[100px] resize-y font-mono text-[15px] leading-relaxed transition-all duration-150 ease-out focus:outline-none"
        style={{
          background: '#1a1a1a',
          border: isFocused ? '2px solid #c8922a' : '1px solid #3a3530',
          borderRadius: '8px',
          color: '#f5f0e8',
          padding: '16px 20px',
          boxShadow: isFocused ? '0 0 0 3px rgba(200,146,42,0.15)' : 'none',
        }}
        aria-label="Paste any time reference"
      />
      
      {/* Decode button with amber gradient */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={onDecode}
          disabled={!value.trim()}
          className="w-full sm:w-auto sm:min-w-[160px] min-h-[48px] px-8 py-3
            rounded-lg font-semibold text-[15px] text-white
            transition-transform duration-150 ease-out
            disabled:opacity-40 disabled:cursor-not-allowed
            active:translate-y-[1px]
            hover:enabled:-translate-y-[1px]"
          style={{
            background: 'linear-gradient(to bottom, #d4a040, #a87520)',
            boxShadow: '0 1px 0 rgba(212,160,64,0.4) inset, 0 3px 10px rgba(168,117,32,0.45), 0 1px 3px rgba(0,0,0,0.25)',
            border: '1px solid #9a6a10',
            borderTopColor: '#c8922a',
          }}
        >
          Decode
        </button>
      </div>
    </div>
  );
}
