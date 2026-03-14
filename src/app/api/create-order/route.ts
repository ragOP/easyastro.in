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

import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const keyId     = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("[Order] ❌ Razorpay keys missing");
      return Response.json({ error: "Payment configuration error" }, { status: 500 });
    }

    const { amount, currency = "INR", receipt } = await req.json();

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount:   amount * 100, // ₹ to paise
      currency,
      receipt:  receipt || `receipt_${Date.now()}`,
    });

    console.log("[Order] ✅ Created:", order.id);

    // Only return order — NO Supabase here
    return Response.json({ id: order.id, amount: order.amount, currency: order.currency });

  } catch (err: any) {
    console.error("[Order] ❌ Error:", err);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}