import { type NextRequest, NextResponse } from "next/server"
import { sendConsultationConfirmation } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, selectedSlot, assessmentData, leadScore, message } = body

    // Validate required fields
    if (!name || !email || !selectedSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send confirmation email
    const emailSent = await sendConsultationConfirmation({
      name,
      email,
      phone,
      selectedSlot,
      assessmentData,
      leadScore,
      message,
    })

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "Confirmation email sent successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 })
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
