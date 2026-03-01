"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { JsonLd, generateSoftwareApplicationSchema, generateBreadcrumbSchema } from "@/components/json-ld";
import AdSlot from "@/components/AdSlot";

interface Question {
  id: number;
  timeString: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}

const allQuestions: Question[] = [
  {
    id: 1,
    timeString: "10am BST next Friday",
    options: [
      { text: "British Summer Time — UTC+1", correct: false },
      { text: "Bangladesh Standard Time — UTC+6", correct: false },
      { text: "This is ambiguous — BST has two meanings", correct: true },
    ],
    explanation: "BST can mean British Summer Time (UTC+1) or Bangladesh Standard Time (UTC+6). Without context, this is a 5-hour ambiguity.",
  },
  {
    id: 2,
    timeString: "3pm IST on Monday",
    options: [
      { text: "India Standard Time — UTC+5:30", correct: false },
      { text: "Irish Standard Time — UTC+1", correct: false },
      { text: "This is ambiguous — IST refers to India, Ireland, and Israel", correct: true },
    ],
    explanation: "IST is used by India (UTC+5:30), Ireland (UTC+1), and Israel (UTC+2). The abbreviation alone has a 5.5-hour spread.",
  },
  {
    id: 3,
    timeString: "Meeting at 9am EST",
    options: [
      { text: "Eastern Standard Time — UTC-5", correct: false },
      { text: "Australian Eastern Standard Time — UTC+10", correct: false },
      { text: "This is ambiguous — EST in Australia is UTC+10, not UTC-5", correct: true },
    ],
    explanation: "EST is used in both the US (UTC-5) and Australia (UTC+10). The 15-hour difference causes daily confusion.",
  },
  {
    id: 4,
    timeString: "Call at 14:00 CET tomorrow",
    options: [
      { text: "Central European Time — always UTC+1", correct: false },
      { text: "UTC+1 in winter, UTC+2 in summer — depends on the date", correct: true },
      { text: "Central Eastern Time — UTC+2", correct: false },
    ],
    explanation: "CET is UTC+1, but most CET regions switch to CEST (UTC+2) in summer. Without the date, you don't know which applies.",
  },
  {
    id: 5,
    timeString: "9pm CST",
    options: [
      { text: "Central Standard Time — UTC-6", correct: false },
      { text: "China Standard Time — UTC+8", correct: false },
      { text: "This is ambiguous — CST has a 14-hour spread", correct: true },
    ],
    explanation: "CST is used for US Central Standard Time (UTC-6) and China Standard Time (UTC+8) — a 14-hour difference.",
  },
  {
    id: 6,
    timeString: "2026-03-10T14:30:00Z",
    options: [
      { text: "14:30 UTC on 10 March 2026 — unambiguous", correct: true },
      { text: "14:30 local time, timezone unknown", correct: false },
      { text: "This format is non-standard and unclear", correct: false },
    ],
    explanation: "The 'Z' suffix means Zulu time (UTC). ISO 8601 with explicit timezone is fully unambiguous.",
  },
  {
    id: 7,
    timeString: "Let's meet at noon GMT on Wednesday",
    options: [
      { text: "12:00 UTC — GMT is always UTC+0", correct: true },
      { text: "12:00 UK time — depends on DST", correct: false },
      { text: "This is ambiguous", correct: false },
    ],
    explanation: "GMT is always UTC+0 and does not observe DST. The UK switches to BST in summer, but GMT itself is stable.",
  },
  {
    id: 8,
    timeString: "Thursday 6am PST — good for London?",
    options: [
      { text: "London would be at 2pm — fine for working hours", correct: false },
      { text: "Depends on DST — US and UK switch on different dates", correct: true },
      { text: "London would be at 6am — same time", correct: false },
    ],
    explanation: "The US and UK switch DST on different dates. In transition weeks, the offset changes temporarily.",
  },
  {
    id: 9,
    timeString: "Midnight UTC",
    options: [
      { text: "00:00 UTC — fully unambiguous", correct: true },
      { text: "Midnight in the UK", correct: false },
      { text: "This is ambiguous — midnight of which day?", correct: false },
    ],
    explanation: "UTC with an explicit time is always unambiguous. It's the same moment everywhere on Earth.",
  },
  {
    id: 10,
    timeString: "4pm AEST next Tuesday",
    options: [
      { text: "UTC+10 — always", correct: false },
      { text: "Depends on state — some observe AEDT, some don't", correct: true },
      { text: "This is ambiguous — AEST has multiple meanings", correct: false },
    ],
    explanation: "AEST is UTC+10, but NSW and Victoria switch to AEDT (UTC+11) in summer. Queensland stays on AEST year-round.",
  },
];

type ResultTier = "confidently-wrong" | "dangerously-overconfident" | "cautiously-competent" | "timezone-aware";

function getResultTier(score: number): ResultTier {
  if (score <= 3) return "confidently-wrong";
  if (score <= 6) return "dangerously-overconfident";
  if (score <= 8) return "cautiously-competent";
  return "timezone-aware";
}

const tierContent: Record<ResultTier, { label: string; color: string; description: string }> = {
  "confidently-wrong": {
    label: "CONFIDENTLY WRONG",
    color: "#ef4444",
    description: "You answered confidently. Timezone abbreviations disagree with you. You've probably caused at least one missed meeting without knowing it.",
  },
  "dangerously-overconfident": {
    label: "DANGEROUSLY OVERCONFIDENT",
    color: "#c8922a",
    description: "You got some right, but the ones you got wrong are exactly the abbreviations that cause real damage in global teams.",
  },
  "cautiously-competent": {
    label: "CAUTIOUSLY COMPETENT",
    color: "#a08060",
    description: "You know more than most. You also know that 'most' isn't a high bar when it comes to timezones.",
  },
  "timezone-aware": {
    label: "TIMEZONE AWARE",
    color: "#4ade80",
    description: "You correctly identified the trick questions. You know that 'I don't know' is sometimes the most accurate answer.",
  },
};

type GameState = "ready" | "playing" | "between-rounds" | "finished";

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastAnswer, setLastAnswer] = useState<{ correct: boolean; explanation: string } | null>(null);

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleStart = () => {
    shuffleQuestions();
    setAnswers(Array(10).fill(null));
    setCurrentRound(0);
    setTimeLeft(60);
    setGameState("playing");
    setLastAnswer(null);
  };

  const handleAnswer = (optionIndex: number) => {
    if (gameState !== "playing") return;

    const newAnswers = [...answers];
    newAnswers[currentRound] = optionIndex;
    setAnswers(newAnswers);

    const question = questions[currentRound];
    const isCorrect = question.options[optionIndex].correct;

    setLastAnswer({
      correct: isCorrect,
      explanation: question.explanation,
    });
    setGameState("between-rounds");

    setTimeout(() => {
      if (currentRound < 9) {
        setCurrentRound((prev) => prev + 1);
        setLastAnswer(null);
        setGameState("playing");
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  const score = answers.reduce<number>((acc, answer, index) => {
    if (answer === null || !questions[index]) return acc;
    return questions[index].options[answer].correct ? acc + 1 : acc;
  }, 0);

  const tier = getResultTier(score);
  const tierInfo = tierContent[tier];

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Confidently Wrong — Timezone Quiz",
    description: "Ten questions. How many ambiguous time references can you correctly identify?",
    slug: "quiz"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "Tools", url: "https://timemeaning.com/tools" },
    { name: "Confidently Wrong Quiz", url: "https://timemeaning.com/tools/quiz" }
  ]);

  // Ready screen
  if (gameState === "ready") {
    return (
      <PageLayout>
        <JsonLd data={softwareSchema} />
        <JsonLd data={breadcrumbSchema} />
        <div className="max-w-lg mx-auto">
          <Link 
            href="/tools" 
            className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
          >
            ← Back to Tools
          </Link>

          <AdSlot slot="tool-mid" />

          <div className="bg-[#0f0f0d] border-2 border-primary rounded-md p-8 text-center">
            <div className="font-mono text-5xl text-primary mb-6">
              READY?
            </div>
            <p className="font-mono text-sm text-[#d4d0c8] leading-relaxed mb-8">
              10 questions. 60 seconds total. How many ambiguous time references can you correctly identify?
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#1a1a1a] border border-[#3a3530] rounded p-4">
                <div className="font-mono text-2xl text-primary">10</div>
                <div className="font-mono text-xs text-[#8a8278] mt-1">Questions</div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#3a3530] rounded p-4">
                <div className="font-mono text-2xl text-primary">60</div>
                <div className="font-mono text-xs text-[#8a8278] mt-1">Seconds</div>
              </div>
              <div className="bg-[#1a1a1a] border border-[#3a3530] rounded p-4">
                <div className="font-mono text-2xl text-primary">1</div>
                <div className="font-mono text-xs text-[#8a8278] mt-1">Score</div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-4 bg-primary text-[#0f0f0d] font-mono font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Finished screen
  if (gameState === "finished") {
    return (
      <PageLayout>
        <div className="max-w-lg mx-auto">
          <Link 
            href="/tools" 
            className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
          >
            ← Back to Tools
          </Link>

          <AdSlot slot="tool-mid" />

          <div className="bg-[#0f0f0d] border-2 border-primary rounded-md p-8 text-center mb-8">
            <div className="font-serif text-6xl text-primary mb-4">
              {score}/10
            </div>
            
            <div 
              className="inline-block font-mono text-sm px-4 py-2 rounded mb-4"
              style={{ backgroundColor: `${tierInfo.color}20`, color: tierInfo.color }}
            >
              {tierInfo.label}
            </div>
            
            <p className="font-sans text-sm text-[#d4d0c8] leading-relaxed mb-6">
              {tierInfo.description}
            </p>

            <ShareButtons 
              label="SHARE THIS RESULT" 
              shareText={`I scored ${score}/10 on the TimeMeaning Confidently Wrong quiz. ${tierInfo.label}. Try it:`}
            />
          </div>

          {/* Breakdown - simplified table on mobile */}
          <div className="mb-8">
            {/* Mobile: Two column table (question number and status) */}
            <div className="sm:hidden">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, i) => {
                  const userAnswer = answers[i];
                  const isCorrect = userAnswer !== null && q.options[userAnswer].correct;
                  return (
                    <div
                      key={q.id}
                      className="aspect-square flex items-center justify-center rounded text-lg font-mono"
                      style={{
                        backgroundColor: isCorrect ? '#4ade8020' : '#ef444420',
                        color: isCorrect ? '#4ade80' : '#ef4444'
                      }}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Desktop: Full breakdown cards */}
            <div className="hidden sm:block space-y-3">
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer !== null && q.options[userAnswer].correct;
                
                return (
                  <div 
                    key={q.id} 
                    className="bg-[#0f0f0d] border border-[#3a3530] rounded p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <code className="font-mono text-sm text-primary">
                        {q.timeString}
                      </code>
                      <span 
                        className="shrink-0 font-mono text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: isCorrect ? '#4ade8020' : '#ef444420',
                          color: isCorrect ? '#4ade80' : '#ef4444'
                        }}
                      >
                        {isCorrect ? "CORRECT" : "INCORRECT"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#8a8278] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-3 bg-[#1a1a1a] text-primary border border-primary font-mono rounded hover:bg-primary/10 transition-colors"
          >
            Play again →
          </button>
        </div>
      </PageLayout>
    );
  }

  // Playing/between-rounds screen
  const question = questions[currentRound];
  const isTimeLow = timeLeft < 10;

  return (
    <PageLayout>
      <div className="max-w-lg mx-auto">
        <Link 
          href="/tools" 
          className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
        >
          ← Back to Tools
        </Link>

        <AdSlot slot="tool-mid" />

        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-sm text-[#8a8278]">
            ROUND {currentRound + 1}/10
          </span>
          <span 
            className="font-mono text-xl"
            style={{ color: isTimeLow ? '#ef4444' : '#c8922a' }}
          >
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#3a3530] rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentRound + 1) / 10) * 100}%` }}
          />
        </div>

        {/* Question card */}
        {gameState === "between-rounds" && lastAnswer ? (
          <div 
            className="bg-[#0f0f0d] border-2 rounded-md p-8 mb-6 text-center min-h-[120px] flex flex-col items-center justify-center"
            style={{ borderColor: lastAnswer.correct ? '#4ade80' : '#c8922a' }}
          >
            <div 
              className="font-mono text-2xl mb-3"
              style={{ color: lastAnswer.correct ? '#4ade80' : '#c8922a' }}
            >
              {lastAnswer.correct ? "CORRECT" : "INCORRECT"}
            </div>
            <p className="font-sans text-sm text-[#8a8278] leading-relaxed">
              {lastAnswer.explanation}
            </p>
          </div>
        ) : (
          <div className="bg-[#0f0f0d] border-2 border-primary rounded-md p-8 mb-6 text-center min-h-[120px] flex items-center justify-center">
            <span className="font-mono text-2xl text-primary">
              {question?.timeString}
            </span>
          </div>
        )}

        {/* Options */}
        {gameState === "playing" && question && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 min-h-[56px] text-left bg-[#1a1a1a] border border-[#3a3530] rounded font-sans text-[#e8e0d0] text-sm leading-relaxed hover:bg-[#2a2520] hover:border-l-[3px] hover:border-l-primary transition-all"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-[#6a6460] text-center">
          No data entered here is stored or transmitted.
        </p>
      </div>
    </PageLayout>
  );
}
