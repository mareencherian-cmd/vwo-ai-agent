"use client"

import { useEffect, useState } from "react"

function formatStrategy(text: string) {
  const sections = text
    .split(/\n(?=\d+\. )/)
    .map((section) =>
      section
        .replace(/^\d+\.\s*/, "")
        .replace(/^=+\s*$/gm, "")
        .trim()
    )
    .filter((section) => section.length > 0)

  return sections
}

export default function Results() {
  const [result, setResult] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("strategyResult")
    if (stored) setResult(stored)
  }, [])

  return (
    <main className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">
        Your AI Experimentation Strategy
      </h1>

      {result && (
        <div className="space-y-8 mt-10">
          {formatStrategy(result).map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 border"
            >
              <div className="space-y-3">
                {section.split("\n").map((line, i) => {
                  const trimmed = line.trim()

                  if (!trimmed) return null

                  // First line becomes section heading
                  if (i === 0) {
                    return (
                      <h2 key={i} className="text-xl font-semibold">
                        {trimmed}
                      </h2>
                    )
                  }

                  // Styled labels
                  // Remove "Title:" completely from results
if (trimmed.startsWith("Title:")) {
    // Remove the word "Title:" from the line
  const cleanText = trimmed.replace(/^Title:\s*/i, "").trim()
  return (
    <h3 key={i} className="text-lg font-semibold">
      {cleanText}
    </h3>
  )
}

// Styled label lines (excluding Title now)
if (
  trimmed.match(
    /^(Why it matters|Expected impact|Effort|Priority Score):/
  )
) {
  const [label, ...rest] = trimmed.split(":")
  return (
    <p key={i} className="text-sm">
      <span className="font-medium">{label}:</span>
      {rest.join(":")}
    </p>
  )
}

                  return (
                    <p
                      key={i}
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      {trimmed}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {result && (
  <div className="mt-16 bg-gray-50 border rounded-2xl p-10 text-center">
    <h2 className="text-2xl font-semibold mb-4">
      Ready to Execute This Strategy?
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
      Get a personalized walkthrough of how VWO can help you implement
      this experimentation roadmap faster, with measurable impact.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="https://vwo.com/request-demo/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
      >
        Book a Strategy Call
      </a>

      <a
        href="/"
        className="border px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
      >
        Generate Another Strategy
      </a>
    </div>
  </div>
)}
    </main>
  )
}