import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const QUESTION_MAP: Record<string, string> = {
  gender:     "What's your gender?",
  birthdate:  "When were you born?",
  status:     "What's your current relationship status?",
  attraction: "What attracts you most in a partner?",
  craving:    "What do you crave most right now?",
  feeling:    "When you imagine your soulmate, you feel…",
};

export async function POST(req: Request) {
  try {
    const { email, name, phone, amount, quizResponses, sessionId } = await req.json();

    const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return Response.json({ success: false }, { status: 500 });
    }

    if (!email) {
      return Response.json({ success: false, error: "Email required" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ── Always INSERT a new row — never upsert ────────────────────────
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        email,
        name:           name  || null,
        phone:          phone || null,
        amount:         amount ?? 449,
        payment_status: "pending",
        session_id:     sessionId, // links this row to payment later
      })
      .select()
      .single();

    if (customerError) {
      console.error("[SaveLead] ❌ Error:", customerError.message);
      return Response.json({ success: false }, { status: 500 });
    }

    console.log("[SaveLead] ✅ New lead inserted:", customer.id);

    // ── Save quiz responses ───────────────────────────────────────────
    if (quizResponses && Object.keys(quizResponses).length > 0) {
      const responses = Object.entries(quizResponses).map(([qId, answer]) => ({
        customer_id:   customer.id,
        question_id:   qId,
        question_text: QUESTION_MAP[qId] ?? qId,
        answer:        String(answer),
      }));

      const { error: quizError } = await supabase
        .from("quiz_responses")
        .insert(responses);

      if (quizError) {
        console.error("[SaveLead] ❌ Quiz error:", quizError.message);
      }
    }

    return Response.json({ success: true, customerId: customer.id });

  } catch (err: any) {
    console.error("[SaveLead] ❌ Error:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}