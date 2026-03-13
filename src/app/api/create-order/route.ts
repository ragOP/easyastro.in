// // app/api/create-order/route.ts
// // eslint-disable-next-line @typescript-eslint/no-require-imports
// const Razorpay = require("razorpay");

// export async function POST(req: Request) {
//   try {
//     const keyId = process.env.RAZORPAY_KEY_ID;
//     const keySecret = process.env.RAZORPAY_KEY_SECRET;

//     if (!keyId || !keySecret) {
//       console.error("[Razorpay] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env.local");
//       return Response.json(
//         { error: "Payment configuration error" },
//         { status: 500 }
//       );
//     }

//     const { amount, currency = "INR", receipt } = await req.json();

//     const razorpay = new Razorpay({
//       key_id: keyId,
//       key_secret: keySecret,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // paise
//       currency,
//       receipt: receipt ?? `receipt_${Date.now()}`,
//     });

//     return Response.json(order); // returns { id: "order_XXXX", ... }
//   } catch (err) {
//     console.error("[Razorpay] Order creation failed:", err);
//     return Response.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   }
// }

import { createClient } from '@supabase/supabase-js';
const Razorpay = require("razorpay");

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!keyId || !keySecret) {
      console.error("[Razorpay] Keys missing");
      return Response.json({ error: "Payment configuration error" }, { status: 500 });
    }

    const { amount, email, name, phone, quizResponses, currency = "INR" } = await req.json();

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // 1. Razorpay Order Create karein
    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    // 2. Supabase mein data save karein
    // Type define karein taaki TypeScript error na de
    let customerId: string | null = null; 

    if (supabaseUrl && supabaseServiceKey && email) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Step A: Customers table mein entry
      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .insert({
          email,
          name,
          phone,
          order_id: order.id,
          amount: amount,
          payment_status: "pending",
        })
        .select('id')
        .single();

      if (customerError) {
        console.error("[Supabase] Customer Error:", customerError.message);
      } else if (customer && (customer as any).id) {
        // 'as any' use karne se property access error hat jayega
        customerId = (customer as any).id;

        // Step B: Quiz Responses save karein
        if (quizResponses && customerId) {
          const quizData = Object.entries(quizResponses).map(([qId, ans]) => ({
            customer_id: customerId,
            question_id: qId,
            answer: String(ans),
          }));

          const { error: quizError } = await supabase.from("quiz_responses").insert(quizData);
          if (quizError) console.error("[Supabase] Quiz Error:", quizError.message);
        }
      }
    }

    // Response return karein
    return Response.json({
      ...order,
      customerId: customerId 
    });

  } catch (err: any) {
    console.error("[Order Creation Error]:", err);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}