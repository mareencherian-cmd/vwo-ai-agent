import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await fetch("https://script.google.com/macros/s/AKfycbxRxU1tLQvIEULIm4plqASt0x2sVjbcKkvK6s4eQJROhzdebuQ9VAPyMNR-IHvyPRtJ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("LEAD CAPTURE ERROR:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}