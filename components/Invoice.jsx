"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

export default function Invoice({ id }) {
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`/api/invoice/${id}`);
        setInvoice(res.data);
        console.log("Invoice data:", res.data);
      } catch (err) {
        console.error("Failed to fetch invoice:", err);
      }
    };

    if (id) {
      fetchInvoice();
    }
  }, [id]);

  if (!invoice) return <p>Loading...</p>;



  const downloadPDF = () => {
  if (invoiceRef.current) {
    const opt = {
      margin: [5, 15], // top-bottom, left-right margins in mm
      filename: `Invoice_${invoice.orderId}.pdf`,
      
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(invoiceRef.current).save();
  }
};

  return (
    <div className="max-w-2xl pt-28 mx-auto p-6 bg-white shadow-lg rounded-lg border">
     
  <div ref={invoiceRef} className="space-y-6">

    {/* Header */}
    <h1 className="text-3xl font-bold text-center border-b pb-4">Tax Invoice</h1>

    {/* Invoice Info */}
    <div className="flex justify-between">
      <div>
        <p><strong>Invoice ID:</strong> {invoice.orderId}</p>
        <p><strong>Invoice Date:</strong> {invoice.invoiceDate}</p>
      </div>
      <div className="text-right">
        <p><strong>Issued By:</strong>Athlend Pvt Ltd</p>
        <p>Faridabad, Haryana 121010</p>
        <p>GSTIN: 06ABAxxxxxxx</p>
      </div>
    </div>

    {/* Issued To */}
    <div>
      <h2 className="font-semibold">Issued To: {invoice.email}</h2>
      {/* Add user address if available */}
    </div>

    {/* Venue Info */}
    <div className="mt-4">
      <p><strong>Venue Name:</strong> {invoice.groundName}</p>
      <p><strong>Venue Address:</strong> {invoice.address}</p>
      <p><strong>Facility:</strong> {invoice.sport}</p>
      
    </div>

    {/* Booking Table */}
    <table className="w-full mt-4 border text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border px-3 py-2">Start Time</th>
          <th className="border px-3 py-2">End Time</th>
          <th className="border px-3 py-2">Qty</th>
          <th className="border px-3 py-2">Price (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-3 py-2">{invoice.startTime}</td>
          <td className="border px-3 py-2">{invoice.endTime}</td>
          <td className="border px-3 py-2">1</td>
          <td className="border px-3 py-2">₹{invoice.gross}</td>
        </tr>
      </tbody>
    </table>

    {/* Amount Breakdown */}
    <div className="mt-6 space-y-1 text-sm">
      <p><strong>Gross Amount (₹):</strong> {invoice.gross}</p>
      <p><strong>Discount (₹):</strong> {invoice.discount}</p>
      <p><strong>Taxable Amount (₹):</strong> {invoice.taxable}</p>
      <p><strong>SGST @ 9% (₹):</strong> {invoice.sgst}</p>
      <p><strong>CGST @ 9% (₹):</strong> {invoice.cgst}</p>
      <p><strong>Round Off (₹):</strong> 0.00</p>
      <p className="text-lg font-bold"><strong>Final Amount (₹):</strong> {invoice.total}</p>
      <p><strong>Tax Under Reverse Charge:</strong> No</p>
    </div>

    {/* Footer */}
    <p className="mt-6 mb-1 text-gray-500 text-xs text-center">
      This is a computer generated invoice. No signature required. Pls contact support team for original copy.
    </p>
  
  <div className="mt-6 mb-1 pb-6 text-gray-500 text-xs text-center">support@athlend.com</div>
  
  </div>


    

 <button
        onClick={downloadPDF}
        className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      >
        Download PDF
      </button>


    </div>

  

  );
}
