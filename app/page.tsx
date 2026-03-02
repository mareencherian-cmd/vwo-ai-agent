"use client"

import { useState } from "react"

export default function Home() {
  const totalSteps = 7
const [email, setEmail] = useState("")
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    role: "",
    industry: "",
    trafficRange: "",
    goal: "",
    maturity: "",
    usesHeatmaps: false,
    usesFunnels: false,
    usesPersonalization: false,
    monthlyTraffic: "",
    conversionRate: "",
    aov: "",
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    nextStep()
  }

  const progressPercent = (step / totalSteps) * 100

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center px-6">
      {/* Progress Bar */}
      {step > 0 && (
        <div className="w-full fixed top-0 left-0 h-1 bg-gray-200">
          <div
            className="h-1 bg-black transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="max-w-2xl w-full mt-24 mb-16">

        {/* STEP 0 — LANDING */}
        {step === 0 && (
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Get Your AI-Powered Experimentation Strategy
            </h1>

            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Answer a few quick questions about your company and goals.
              We’ll generate a tailored testing, personalization, and insights roadmap.
            </p>

            <p className="text-sm text-gray-500">
              Built for teams serious about experimentation.
            </p>
                  <input
      type="email"
      placeholder="Work Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full border rounded-lg px-4 py-3"
    />
            <button
              onClick={nextStep}
              className="mt-6 bg-black text-white px-8 py-4 rounded-md text-lg font-medium hover:opacity-90 transition"
            >
              Start My Strategy
            </button>
          </div>
        )}

        {/* STEP 1 — ROLE */}
        {step === 1 && (
          <QuestionBlock
            title="What best describes your role?"
            options={[
              "Product Manager",
              "Growth Marketer",
              "CRO Manager",
              "Head of Digital",
              "Founder"
            ]}
            onSelect={(value) => handleSelect("role", value)}
          />
        )}

        {/* STEP 2 — INDUSTRY */}
        {step === 2 && (
          <QuestionBlock
            title="What industry are you in?"
            options={[
              "Ecommerce",
              "SaaS",
              "Fintech",
              "EdTech",
              "Media",
              "B2B Services"
            ]}
            onSelect={(value) => handleSelect("industry", value)}
          />
        )}

        {/* STEP 3 — TRAFFIC RANGE */}
        {step === 3 && (
          <QuestionBlock
            title="What’s your approximate monthly website traffic?"
            options={[
              "Less than 25,000",
              "25,000 – 100,000",
              "100,000 – 500,000",
              "500,000+"
            ]}
            onSelect={(value) => handleSelect("trafficRange", value)}
          />
        )}

        {/* STEP 4 — GOAL */}
        {step === 4 && (
          <QuestionBlock
            title="What are you most focused on improving right now?"
            options={[
              "Overall conversion rate",
              "Revenue per visitor",
              "Lead generation",
              "Activation / onboarding",
              "Retention",
              "Feature adoption"
            ]}
            onSelect={(value) => handleSelect("goal", value)}
          />
        )}

        {/* STEP 5 — MATURITY */}
        {step === 5 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-center">
              How would you describe your experimentation program today?
            </h2>

            <div className="space-y-4">
              {[
                "We rarely run A/B tests",
                "We run occasional tests",
                "We test regularly but without deep segmentation",
                "We run a structured experimentation program"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, maturity: option })}
                  className="w-full border border-gray-300 rounded-md p-4 text-left hover:border-black transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <Toggle
                label="We use heatmaps or session recordings"
                value={formData.usesHeatmaps}
                onChange={() =>
                  setFormData({ ...formData, usesHeatmaps: !formData.usesHeatmaps })
                }
              />

              <Toggle
                label="We analyze funnels and drop-offs"
                value={formData.usesFunnels}
                onChange={() =>
                  setFormData({ ...formData, usesFunnels: !formData.usesFunnels })
                }
              />

              <Toggle
                label="We personalize experiences by audience"
                value={formData.usesPersonalization}
                onChange={() =>
                  setFormData({
                    ...formData,
                    usesPersonalization: !formData.usesPersonalization
                  })
                }
              />
            </div>

            <button
              onClick={nextStep}
              className="bg-black text-white px-6 py-3 rounded-md mt-6"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 6 — OPTIONAL REVENUE INPUT */}
        {step === 6 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              Want a directional revenue impact estimate?
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Monthly traffic"
                className="w-full border p-3 rounded-md"
                onChange={(e) =>
                  setFormData({ ...formData, monthlyTraffic: e.target.value })
                }
              />
              <input
                placeholder="Conversion rate (%)"
                className="w-full border p-3 rounded-md"
                onChange={(e) =>
                  setFormData({ ...formData, conversionRate: e.target.value })
                }
              />
              <input
                placeholder="Average order value / ACV"
                className="w-full border p-3 rounded-md"
                onChange={(e) =>
                  setFormData({ ...formData, aov: e.target.value })
                }
              />
            </div>

            <button
  onClick={async () => {
      if (!email || !email.includes("@")) {
      alert("Please enter a valid work email")
      return
    }
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("API Error:", text)
        alert("API error. Check terminal.")
        return
      }

      const data = await res.json()

      // Capture lead silently
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role: formData.role,
          industry: formData.industry,
          goal: formData.goal,
        }),
      })

      localStorage.setItem("strategyResult", data.result)
      window.location.href = "/results"

    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    }
  }}
  className="bg-black text-white px-6 py-3 rounded-md mt-6"
>
  Generate My Strategy
</button>
          </div>
        )}

        {/* Back Button */}
        {step > 0 && step < totalSteps && (
          <button
            onClick={prevStep}
            className="mt-8 text-sm text-gray-500 hover:text-black"
          >
            Back
          </button>
        )}

      </div>
    </main>
  )
}

function QuestionBlock({ title, options, onSelect }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {title}
      </h2>

      <div className="space-y-4">
        {options.map((option: string) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full border border-gray-300 rounded-md p-4 text-left hover:border-black transition"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div
      onClick={onChange}
      className={`border rounded-md p-4 cursor-pointer transition ${
        value ? "border-black bg-gray-50" : "border-gray-300"
      }`}
    >
      {label}
    </div>
  )
}