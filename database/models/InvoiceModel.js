import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    bookingId: { type: String , required: true },
    userId: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
