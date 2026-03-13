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

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerId } =
      await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!keySecret) {
      console.error("[Verify] ❌ RAZORPAY_KEY_SECRET is missing");
      return Response.json({ error: "Payment configuration error" }, { status: 500 });
    }

    // 1. Check for missing fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json({ error: "Missing payment verification fields" }, { status: 400 });
    }

    // 2. Generate and verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    console.log("[Verify] Signature valid:", isValid);

    if (!isValid) {
      return Response.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 3. AGAR SIGNATURE VALID HAI, TOH DB UPDATE KAREIN
    if (supabaseUrl && supabaseServiceKey && customerId) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { error: updateError } = await supabase
        .from("customers")
        .update({
          payment_status: "completed",
          payment_id: razorpay_payment_id,
        })
        .eq("id", customerId);

      if (updateError) {
        console.error("[Supabase Update Error]:", updateError.message);
        // Payment toh verify ho gayi hai, isliye status 200 hi bhejenge
      } else {
        console.log("[Supabase] Payment status updated to completed for:", customerId);
      }
    }

    return Response.json({
      success: true,
      paymentId: razorpay_payment_id,
    });

  } catch (err: any) {
    console.error("[Verify] ❌ Verification error:", err);
    return Response.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
