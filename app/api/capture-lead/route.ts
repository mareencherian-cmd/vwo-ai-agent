import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {
      email,
      role,
      industry,
      platform,
      userJourney,
      goal,
    } = await req.json()

    const payload = {
      email,
      role,
      industry,
      platform,
      userJourney,
      goal,
      timestamp: new Date().toISOString(),
    }

    await fetch(
      "https://script.google.com/macros/s/AKfycbxRxU1tLQvIEULIm4plqASt0x2sVjbcKkvK6s4eQJROhzdebuQ9VAPyMNR-IHvyPRtJ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("LEAD CAPTURE ERROR:", error)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}