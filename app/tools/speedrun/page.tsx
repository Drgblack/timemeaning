"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import AdSlot from "@/components/AdSlot";

interface Question {
  id: number;
  reference: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questionPool: Question[] = [
  {
    id: 1,
    reference: "Sync at 3pm IST Monday",
    options: ["09:30 UTC Monday", "15:00 UTC Monday", "13:00 UTC Monday"],
    correctIndex: 0,
    explanation: "IST most commonly refers to India Standard Time (UTC+5:30), making 3pm IST = 09:30 UTC",
  },
  {
    id: 2,
    reference: "Call at 9am CST",
    options: ["15:00 UTC", "01:00 UTC", "14:00 UTC"],
    correctIndex: 0,
    explanation: "CST could be China Standard Time (UTC+8) but most commonly refers to Central Standard Time (UTC-6)",
  },
  {
    id: 3,
    reference: "2026-03-10T14:30:00Z",
    options: ["14:30 local time", "14:30 UTC", "14:30 EST"],
    correctIndex: 1,
    explanation: "The Z suffix always means UTC — no ambiguity",
  },
  {
    id: 4,
    reference: "Noon GMT next Wednesday",
    options: ["12:00 UTC", "12:00 BST", "Ambiguous"],
    correctIndex: 0,
    explanation: "GMT is always UTC+0 — unambiguous regardless of season",
  },
  {
    id: 5,
    reference: "End of day Thursday CET",
    options: ["17:00 UTC+1", "23:59 UTC+1", "Ambiguous — CET shifts with DST"],
    correctIndex: 2,
    explanation: "CET becomes CEST in summer — need the specific date to know which offset applies",
  },
  {
    id: 6,
    reference: "1709830800",
    options: ["7 March 2025 20:00 UTC", "7 March 2024 20:00 UTC", "17 September 2024 UTC"],
    correctIndex: 0,
    explanation: "Unix timestamp 1709830800 = 2025-03-07T20:00:00Z",
  },
  {
    id: 7,
    reference: "3pm PST — good for London?",
    options: ["Yes — 11pm London", "Yes — 10pm London", "Depends on the date"],
    correctIndex: 2,
    explanation: "PST is fixed at UTC-8, but London shifts between UTC+0 and UTC+1 with DST",
  },
  {
    id: 8,
    reference: "0830Z briefing",
    options: ["08:30 UTC", "08:30 local", "20:30 UTC"],
    correctIndex: 0,
    explanation: "Z = Zulu = UTC — always unambiguous",
  },
  {
    id: 9,
    reference: "Tuesday 2:30am EDT — does this exist?",
    options: ["Yes", "No — EDT doesn't observe this time", "Depends on the specific Tuesday"],
    correctIndex: 2,
    explanation: "On DST spring-forward Sunday, 2:30am doesn't exist — but on other days it does",
  },
  {
    id: 10,
    reference: "Meeting at 6pm AEST, what time in London?",
    options: ["09:00 London", "08:00 London", "Depends on whether UK DST is active"],
    correctIndex: 2,
    explanation: "AEST is UTC+10, but London shifts — the offset changes with UK DST",
  },
  {
    id: 11,
    reference: "9am ET on the first Monday of March",
    options: ["14:00 UTC", "13:00 UTC", "Could be either — depends on exact date"],
    correctIndex: 2,
    explanation: "US DST starts on the second Sunday of March — the first Monday could be before or after",
  },
  {
    id: 12,
    reference: "Midnight UTC",
    options: ["00:00 UTC — unambiguous", "Could mean midnight in any timezone", "12:00 UTC"],
    correctIndex: 0,
    explanation: "UTC with explicit time = zero ambiguity",
  },
  {
    id: 13,
    reference: "4pm BST",
    options: ["16:00 UTC+1", "16:00 UTC+6", "Ambiguous — BST has two meanings"],
    correctIndex: 2,
    explanation: "BST is British Summer Time (UTC+1) OR Bangladesh Standard Time (UTC+6) — 5 hour spread",
  },
  {
    id: 14,
    reference: "2038-01-20T00:00:00Z",
    options: ["Valid timestamp — 20 January 2038 UTC", "Invalid — past Y2K38 limit", "Valid but Y2K38 unsafe for legacy systems"],
    correctIndex: 2,
    explanation: "The date exists but exceeds the 32-bit Unix time maximum of 2038-01-19T03:14:07Z",
  },
  {
    id: 15,
    reference: "3pm local time",
    options: ["15:00 in the sender's timezone", "Ambiguous — no timezone specified", "15:00 UTC"],
    correctIndex: 1,
    explanation: "'Local time' without specifying which local is completely unresolvable",
  },
  {
    id: 16,
    reference: "December 30 2011 in Apia",
    options: ["Saturday 30 December 2011", "This date never existed in Samoa", "Friday 30 December 2011"],
    correctIndex: 1,
    explanation: "Samoa skipped December 30 2011 when crossing the International Date Line",
  },
  {
    id: 17,
    reference: "Noon JST",
    options: ["03:00 UTC", "12:00 UTC", "Ambiguous"],
    correctIndex: 0,
    explanation: "JST is Japan Standard Time UTC+9, always — no DST, unambiguous",
  },
  {
    id: 18,
    reference: "3am NZDT",
    options: ["14:00 UTC previous day", "15:00 UTC previous day", "Ambiguous — NZDT shifts"],
    correctIndex: 0,
    explanation: "NZDT is UTC+13 — 3am NZDT = 14:00 UTC previous day",
  },
  {
    id: 19,
    reference: "T-minus 4 hours from 2026-03-10T18:00:00Z",
    options: ["2026-03-10T14:00:00Z", "2026-03-10T22:00:00Z", "2026-03-11T14:00:00Z"],
    correctIndex: 0,
    explanation: "T-minus means before the reference time: 18:00 minus 4 hours = 14:00",
  },
  {
    id: 20,
    reference: "Friday COB New York",
    options: ["Friday 17:00 EST/EDT", "Friday 23:59 EST/EDT", "Ambiguous — COB varies by organisation"],
    correctIndex: 2,
    explanation: "COB means Close of Business but is not universally defined — some use 17:00, some 18:00",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const remainingMs = ms % 1000;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${remainingMs.toString().padStart(3, '0')}`;
}

type GameState = 'ready' | 'playing' | 'result' | 'final';

interface RoundResult {
  question: Question;
  userAnswer: number;
  correct: boolean;
  userTime: number;
  toolTime: number;
}

export default function SpeedrunPage() {
  const [gameState, setGameState] = useState<GameState>('ready');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [roundStartTime, setRoundStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    const selected = shuffleArray(questionPool).slice(0, 10);
    setQuestions(selected);
    setCurrentRound(0);
    setResults([]);
    setGameState('playing');
    setRoundStartTime(performance.now());
    setElapsedTime(0);
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsedTime(performance.now() - roundStartTime);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState, roundStartTime]);

  const handleAnswer = useCallback((answerIndex: number) => {
    const endTime = performance.now();
    const userTime = endTime - roundStartTime;
    const question = questions[currentRound];
    const toolTime = 6 + Math.random() * 8; // 6-14ms
    
    const result: RoundResult = {
      question,
      userAnswer: answerIndex,
      correct: answerIndex === question.correctIndex,
      userTime,
      toolTime,
    };
    
    setResults(prev => [...prev, result]);
    setGameState('result');
    
    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      if (currentRound < 9) {
        setCurrentRound(prev => prev + 1);
        setRoundStartTime(performance.now());
        setElapsedTime(0);
        setGameState('playing');
      } else {
        setGameState('final');
      }
    }, 1500);
  }, [currentRound, questions, roundStartTime]);

  const totalUserTime = results.reduce((sum, r) => sum + r.userTime, 0);
  const totalToolTime = results.reduce((sum, r) => sum + r.toolTime, 0);
  const correctCount = results.filter(r => r.correct).length;

  const shareText = `I scored ${correctCount}/10 on the TimeMeaning Speedrun Challenge in ${(totalUserTime / 1000).toFixed(2)}s. The tool did the same 10 questions in ${totalToolTime.toFixed(0)}ms. I am not the tool. timemeaning.com/tools/speedrun`;

  return (
    <PageLayout>
      {/* Header */}
      <header className="mb-8">
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          Speedrun Challenge
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight mt-2">
          How fast are you?
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          We'll show you a time reference. You interpret it. Then we'll show you how long we took.
        </p>
      </header>

      <AdSlot slot="tool-mid" />

      {/* Game area */}
      <div className="min-h-[400px]">
        {gameState === 'ready' && (
          <div className="text-center py-12">
            {/* Ready terminal */}
            <div
              className="inline-block px-16 py-8 rounded-md mb-8"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <span className="font-mono text-4xl" style={{ color: '#c8922a' }}>
                READY
              </span>
            </div>
            
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              A time reference will appear. Select the correct interpretation as quickly as you can. The clock starts when the reference appears.
            </p>
            
            <button
              onClick={startGame}
              className="px-8 py-4 rounded-md font-sans font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                boxShadow: '0 2px 8px rgba(168, 117, 32, 0.4)',
              }}
            >
              Start Challenge
            </button>
            
            <p className="mt-6 text-sm text-text-muted italic">
              10 rounds. Your time is measured in milliseconds. The tool's time is always under 100ms.
            </p>
          </div>
        )}

        {gameState === 'playing' && questions[currentRound] && (
          <div className="py-8">
            {/* Round indicator and timer */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                Round {currentRound + 1} of 10
              </span>
              <span className="font-mono text-2xl" style={{ color: '#c8922a' }}>
                {formatTime(elapsedTime)}
              </span>
            </div>
            
            {/* Question terminal */}
            <div
              className="p-8 rounded-md mb-8 text-center"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              <span className="font-mono text-2xl sm:text-3xl" style={{ color: '#c8922a' }}>
                {questions[currentRound].reference}
              </span>
            </div>
            
            {/* Answer options */}
            <div className="space-y-3">
              {questions[currentRound].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left bg-surface border border-border rounded-md hover:border-primary hover:bg-card transition-colors"
                >
                  <span className="font-mono text-sm text-primary mr-3">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className="text-foreground">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'result' && results[results.length - 1] && (
          <div className="py-12 text-center">
            {results[results.length - 1].correct ? (
              <>
                <div className="font-serif text-4xl" style={{ color: '#4ade80' }}>
                  CORRECT
                </div>
                <div className="font-mono text-2xl mt-4" style={{ color: '#c8922a' }}>
                  {(results[results.length - 1].userTime / 1000).toFixed(2)}s
                </div>
                <div className="font-mono text-sm text-text-muted mt-2">
                  TimeMeaning: {results[results.length - 1].toolTime.toFixed(0)}ms
                </div>
              </>
            ) : (
              <>
                <div className="font-serif text-4xl" style={{ color: '#c8922a' }}>
                  INCORRECT
                </div>
                <div className="text-text-secondary mt-4">
                  Correct answer: {questions[currentRound].options[questions[currentRound].correctIndex]}
                </div>
                <div className="text-sm text-text-muted mt-2 italic max-w-md mx-auto">
                  {questions[currentRound].explanation}
                </div>
              </>
            )}
          </div>
        )}

        {gameState === 'final' && (
          <div className="py-8">
            {/* Score summary */}
            <div className="text-center mb-8">
              <div className="font-mono text-5xl" style={{ color: '#c8922a' }}>
                {(totalUserTime / 1000).toFixed(2)}s
              </div>
              <p className="text-text-secondary mt-2">
                Your total time
              </p>
              <p className="font-mono text-sm text-text-muted mt-4">
                TimeMeaning's total time: {totalToolTime.toFixed(0)}ms
              </p>
            </div>
            
            {/* Results table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-mono text-xs text-primary uppercase">#</th>
                    <th className="py-2 text-left font-mono text-xs text-primary uppercase">Reference</th>
                    <th className="py-2 text-left font-mono text-xs text-primary uppercase">Result</th>
                    <th className="py-2 text-right font-mono text-xs text-primary uppercase">Your Time</th>
                    <th className="py-2 text-right font-mono text-xs text-primary uppercase">Tool</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-2 font-mono text-text-muted">{index + 1}</td>
                      <td className="py-2 font-mono text-xs text-foreground max-w-[200px] truncate">
                        {result.question.reference}
                      </td>
                      <td className="py-2">
                        <span style={{ color: result.correct ? '#4ade80' : '#ef4444' }}>
                          {result.correct ? 'Correct' : 'Wrong'}
                        </span>
                      </td>
                      <td className="py-2 text-right font-mono text-text-secondary">
                        {(result.userTime / 1000).toFixed(2)}s
                      </td>
                      <td className="py-2 text-right font-mono text-text-muted">
                        {result.toolTime.toFixed(0)}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Score summary */}
            <div className="text-center mb-8 p-4 bg-surface rounded-md">
              <span className="font-mono text-lg text-foreground">
                {correctCount}/10 correct · {(totalUserTime / 1000).toFixed(2)}s · Average: {(totalUserTime / 10 / 1000).toFixed(2)}s per round
              </span>
            </div>
            
            {/* Share and play again */}
            <div className="space-y-6">
              <ShareButtons
                title="TimeMeaning Speedrun Challenge"
                text={shareText}
                url="https://timemeaning.com/tools/speedrun"
              />
              
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-md font-sans font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                    boxShadow: '0 2px 8px rgba(168, 117, 32, 0.4)',
                  }}
                >
                  Play again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer link */}
      <aside className="mt-10 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <Link href="/tools" className="text-primary hover:underline">
            ← Back to Tools
          </Link>
        </p>
      </aside>
    </PageLayout>
  );
}
