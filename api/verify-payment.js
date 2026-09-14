// Vercel serverless function — runs on Vercel's servers, never in the browser.
// This is the only place PAYSTACK_SECRET_KEY is ever used, which is exactly
// why it's safe: the secret key never gets sent to, or seen by, the customer.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ verified: false, error: "Method not allowed" });
  }

  const { reference } = req.body || {};
  if (!reference) {
    return res.status(400).json({ verified: false, error: "Missing reference" });
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await paystackRes.json();

    const success = Boolean(data && data.status && data.data && data.data.status === "success");

    if (success) {
      return res.status(200).json({
        verified: true,
        amount: data.data.amount / 100, // Paystack reports kobo; convert back to naira
        reference: data.data.reference,
      });
    }

    return res.status(200).json({ verified: false });
  } catch (err) {
    console.error("Paystack verification error:", err);
    return res.status(500).json({ verified: false, error: "Verification request failed" });
  }
}
