import express from "express";
import promptpay from "promptpay-qr";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/qrcode", async (req, res) => {
  try {
    const mobile = req.query.mobile ;
    const amount = parseFloat(req.query.amount) || null;

    // สร้าง payload PromptPay
    const payload = promptpay(mobile, { amount });
    console.log("Payload:", payload); // <-- ตรวจสอบ payload ที่นี่

    const qrDataUrl = await QRCode.toDataURL(payload);

    res.json({ status: "success", payload, qrCode: qrDataUrl });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
