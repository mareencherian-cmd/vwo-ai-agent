"use client"

import { useState } from "react"

type FormData = {
  role: string
  industry: string
  platform: string
  userJourney: string
  goal: string
  maturity: string
  usesHeatmaps: boolean
  usesFunnels: boolean
  usesPersonalization: boolean
  monthlyTraffic: string
  conversionRate: string
  aov: string
}

const journeyOptionsByIndustry: Record<string, string[]> = {
  Ecommerce: [
    "Homepage → Product Discovery",
    "Product Page → Add to Cart",
    "Cart → Checkout",
    "Checkout → Payment Completion",
    "Repeat Purchase / Loyalty"
  ],
  SaaS: [
    "Homepage → Signup",
    "Signup → Activation",
    "User Onboarding",
    "Feature Adoption",
    "Upgrade to Paid"
  ],
  Fintech: [
    "Landing Page → Account Signup",
    "KYC Completion",
    "First Transaction",
    "Product Adoption",
    "Retention / Engagement"
  ],
  EdTech: [
    "Landing Page → Course Discovery",
    "Course Page → Enrollment",
    "User Onboarding",
    "Lesson Completion",
    "Subscription Renewal"
  ],
  Media: [
    "Homepage → Content Discovery",
    "Article → Deeper Engagement",
    "Content → Newsletter Signup",
    "Ad Engagement",
    "Returning Visitors"
  ],
  "B2B Services": [
    "Landing Page → Lead Capture",
    "Content → Demo Request",
    "Pricing Page → Contact Sales",
    "Lead Qualification",
    "Demo → Opportunity"
  ]
}

export default function Home() {
  const totalSteps = 7

  const [email, setEmail] = useState("")
  const [step, setStep] = useState(0)

  const [formData, setFormData] = useState<FormData>({
    role: "",
    industry: "",
    platform: "",
    userJourney: "",
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

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    nextStep()
  }

  const progressPercent = (step / totalSteps) * 100

  const journeyOptions =
    journeyOptionsByIndustry[formData.industry] || [
      "Homepage → Signup",
      "User Onboarding",
      "Conversion Optimization"
    ]

  const handleGenerateStrategy = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid work email")
      return
    }

    const maturityScore = mapMaturityToScore(formData.maturity)

    const payload = {
      ...formData,
      email,
      maturityScore,
      monthlyTraffic: Number(formData.monthlyTraffic) || 0,
      conversionRate: Number(formData.conversionRate) || 0,
      aov: Number(formData.aov) || 0,
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()

      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: formData.role,
          industry: formData.industry,
          platform: formData.platform,
          userJourney: formData.userJourney,
          goal: formData.goal,
        }),
      })

      localStorage.setItem("strategyResult", data.result)
      window.location.href = "/results"

    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    }
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center px-6">

      {step > 0 && (
        <div className="w-full fixed top-0 left-0 h-1 bg-gray-200">
          <div
            className="h-1 bg-black transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <div className="max-w-2xl w-full mt-24 mb-16">

        {/* STEP 0 */}
        {step === 0 && (
          <div className="text-center space-y-8">

            <h1 className="text-4xl font-semibold">
              Get Your AI-Powered Experimentation Strategy
            </h1>

            <p className="text-gray-600">
              Answer a few quick questions and we’ll generate a tailored testing roadmap.
            </p>

            <input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              onClick={nextStep}
              className="bg-black text-white px-8 py-4 rounded-md"
            >
              Start My Strategy
            </button>

          </div>
        )}

        {/* STEP 1 */}
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
            onSelect={(value: string) => handleSelect("role", value)}
          />
        )}

        {/* STEP 2 */}
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
            onSelect={(value: string) => handleSelect("industry", value)}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <QuestionBlock
            title="Which platform are you optimizing?"
            options={["Web", "Mobile App", "Both"]}
            onSelect={(value: string) => handleSelect("platform", value)}
          />
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <QuestionBlock
            title="Which user journey do you want to improve?"
            options={journeyOptions}
            onSelect={(value: string) => handleSelect("userJourney", value)}
          />
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <QuestionBlock
            title="What are you most focused on improving?"
            options={[
              "Overall conversion rate",
              "Revenue per visitor",
              "Lead generation",
              "Activation",
              "Retention",
              "Feature adoption"
            ]}
            onSelect={(value: string) => handleSelect("goal", value)}
          />
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <div className="space-y-8">

            <h2 className="text-2xl font-semibold text-center">
              How mature is your experimentation program?
            </h2>

            {[
              "We rarely run A/B tests",
              "We run occasional tests",
              "We test regularly",
              "We run a structured experimentation program"
            ].map((option) => (
              <button
                key={option}
                onClick={() => handleSelect("maturity", option)}
                className="w-full border p-4 text-left rounded-md"
              >
                {option}
              </button>
            ))}

          </div>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <div className="space-y-4">

            <h2 className="text-xl font-semibold text-center">
              Optional: estimate revenue impact
            </h2>

            <input
              placeholder="Monthly traffic"
              type="number"
              className="w-full border p-3 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, monthlyTraffic: e.target.value })
              }
            />

            <input
              placeholder="Conversion rate (%)"
              type="number"
              className="w-full border p-3 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, conversionRate: e.target.value })
              }
            />

            <input
              placeholder="Average order value"
              type="number"
              className="w-full border p-3 rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, aov: e.target.value })
              }
            />

            <button
              onClick={handleGenerateStrategy}
              className="bg-black text-white px-6 py-3 rounded-md mt-6"
            >
              Generate Strategy
            </button>

          </div>
        )}

        {step > 0 && step < totalSteps && (
          <button
            onClick={prevStep}
            className="mt-8 text-sm text-gray-500"
          >
            Back
          </button>
        )}

      </div>
    </main>
  )
}

function mapMaturityToScore(maturity: string): number {
  switch (maturity) {
    case "We rarely run A/B tests": return 1
    case "We run occasional tests": return 3
    case "We test regularly": return 5
    case "We run a structured experimentation program": return 8
    default: return 0
  }
}

function QuestionBlock({
  title,
  options,
  onSelect,
}: {
  title: string
  options: string[]
  onSelect: (value: string) => void
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>

      <div className="space-y-4">
        {options.map((option) => (
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