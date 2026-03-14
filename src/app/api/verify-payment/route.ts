// // app/api/verify-payment/route.ts
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       await req.json();

//     const keySecret = process.env.RAZORPAY_KEY_SECRET;

//     if (!keySecret) {
//       console.error("[Verify] ❌ RAZORPAY_KEY_SECRET is missing");
//       return Response.json(
//         { error: "Payment configuration error" },
//         { status: 500 }
//       );
//     }

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       console.error("[Verify] ❌ Missing payment fields", {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
//       return Response.json(
//         { error: "Missing payment verification fields" },
//         { status: 400 }
//       );
//     }

//     // Generate expected signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", keySecret)
//       .update(body)
//       .digest("hex");

//     const isValid = expectedSignature === razorpay_signature;
//     console.log("[Verify] Signature valid:", isValid);

//     if (!isValid) {
//       return Response.json(
//         { error: "Invalid payment signature" },
//         { status: 400 }
//       );
//     }

//     return Response.json({
//       success: true,
//       paymentId: razorpay_payment_id,
//     });

//   } catch (err) {
//     console.error("[Verify] ❌ Verification error:", err);
//     return Response.json(
//       { error: "Payment verification failed" },
//       { status: 500 }
//     );
//   }
// }


import crypto from "crypto";
import { createClient } from '@supabase/supabase-js';

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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      name,
      phone,
      amount,
      quizResponses,
      customerId,       // ← specific row to update
    } = await req.json();

    const keySecret          = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!keySecret) {
      return Response.json({ error: "Payment configuration error" }, { status: 500 });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json({ error: "Missing payment fields" }, { status: 400 });
    }

    // ── 1. Verify signature ───────────────────────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ── 2. Update ONLY this specific row ──────────────────────────────
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      if (customerId) {
        // Update the exact row created by save-lead
        const { error: updateError } = await supabase
          .from("customers")
          .update({
            payment_status: "completed",
            payment_id:     razorpay_payment_id,
            order_id:       razorpay_order_id,
          })
          .eq("id", customerId);  // ← only this specific row

        if (updateError) {
          console.error("[Verify] ❌ Update error:", updateError.message);
        } else {
          console.log("[Verify] ✅ Row updated to completed:", customerId);
        }

      } else {
        // Fallback — no customerId, insert fresh completed row
        const { data: customer, error: insertError } = await supabase
          .from("customers")
          .insert({
            email,
            name,
            phone:          phone || null,
            amount:         amount ?? 449,
            payment_status: "completed",
            payment_id:     razorpay_payment_id,
            order_id:       razorpay_order_id,
          })
          .select()
          .single();

        if (insertError) {
          console.error("[Verify] ❌ Insert error:", insertError.message);
        } else if (customer && quizResponses) {
          // Save quiz responses for fallback row
          const responses = Object.entries(quizResponses).map(([qId, answer]) => ({
            customer_id:   customer.id,
            question_id:   qId,
            question_text: QUESTION_MAP[qId] ?? qId,
            answer:        String(answer),
          }));
          await supabase.from("quiz_responses").insert(responses);
        }
      }
    }

    return Response.json({ success: true, paymentId: razorpay_payment_id });

  } catch (err: any) {
    console.error("[Verify] ❌ Error:", err);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}