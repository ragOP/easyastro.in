// app/api/verify-payment/route.ts
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error("[Verify] ❌ RAZORPAY_KEY_SECRET is missing");
      return Response.json(
        { error: "Payment configuration error" },
        { status: 500 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("[Verify] ❌ Missing payment fields", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      return Response.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    // Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    console.log("[Verify] Signature valid:", isValid);

    if (!isValid) {
      return Response.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      paymentId: razorpay_payment_id,
    });

  } catch (err) {
    console.error("[Verify] ❌ Verification error:", err);
    return Response.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}