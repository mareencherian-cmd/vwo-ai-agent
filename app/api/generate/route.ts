export const runtime = "nodejs"

import OpenAI from "openai"
import { calculateMaturity } from "@/lib/maturity"
import { getRoleFocus } from "@/lib/roleLogic"
import { getIndustryUseCases } from "@/lib/industryLogic"

export async function POST(req: Request) {
  try {
    const { role, industry, companySize, answers } = await req.json()

    const maturityScore = calculateMaturity({ maturity: answers })
    const maturityLevel =
      maturityScore <= 3
        ? "Beginner"
        : maturityScore <= 7
        ? "Intermediate"
        : "Advanced"

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    })

    const prompt = `
You are a senior experimentation consultant creating a strategy document.

Here is the client profile:

Role: ${role}
Industry: ${industry}
Company Size: ${companySize}
Experimentation Maturity Score: ${maturityScore}/10
Maturity Level: ${maturityLevel}

Create a comprehensive, executive-ready experimentation strategy.

Do NOT ask follow-up questions.
Do NOT request more information.
Use the inputs above and make reasonable assumptions.

Your output must follow this structure:

==============================

1. Executive Summary
Clear strategic overview tailored to their role and maturity.

2. Top 5 Prioritized Use Cases
For each include:
- Title
- Why it matters
- Expected impact (High/Medium/Low)
- Effort (High/Medium/Low)
- Priority Score (1–100)

Sort by Priority Score descending.

3. Quick Wins (Next 30 Days)
3 experiments.
Include:
- Hypothesis
- KPI
- Expected insight

4. Strategic Plays (60–90 Days)
3 initiatives.
Include:
- Strategic objective
- Experiment type
- KPI impact

5. 90-Day Roadmap
Month 1:
Month 2:
Month 3:

Be specific, practical, and business-focused.
No fluff.
No generic AI disclaimers.
`

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      messages: [
        { role: "system", content: "You are precise, strategic, and business-focused." },
        { role: "user", content: prompt },
      ],
    })

    return Response.json({
      result: response.choices[0].message.content,
    })
  } catch (error: any) {
    console.error("API CRASH:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500 }
    )
  }
}