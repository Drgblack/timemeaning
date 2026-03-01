"use client";
import { useState, useCallback } from "react";
import { TimeInput } from "@/components/time-input";
import { TimeResult, TimeInterpretation } from "@/components/time-result";
import { parseTimeInput } from "@/lib/time-parser";

export function ResolverClient() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<TimeInterpretation | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handleInput = useCallback((value: string) => {
    setInputValue(value);
    if (!value.trim()) {
      setResult(null);
      setIsResultVisible(false);
    }
  }, []);

  const handleDecode = useCallback(() => {
    if (!inputValue.trim()) return;
    const interpretation = parseTimeInput(inputValue);
    setResult(interpretation);
    setIsResultVisible(true);
  }, [inputValue]);

  return (
    <>
      <TimeInput onInput={handleInput} onDecode={handleDecode} />
      {result && (
        <div className="mt-8">
          <TimeResult result={result} isVisible={isResultVisible} />
        </div>
      )}
    </>
  );
}
